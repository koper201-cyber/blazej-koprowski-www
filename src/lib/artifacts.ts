import fs from "node:fs";
import path from "node:path";
import { parse, serialize, type DefaultTreeAdapterMap } from "parse5";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";

type Node = DefaultTreeAdapterMap["node"];
type Element = DefaultTreeAdapterMap["element"];
export function elements(node: Node): Element[] {
  const children =
    "childNodes" in node ? node.childNodes.flatMap(elements) : [];
  return "tagName" in node ? [node, ...children] : children;
}
export function attribute(node: Element, name: string): string | undefined {
  return node.attrs.find((a) => a.name === name)?.value;
}
export function filesIn(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}
export function checkLinks(dist: string): string[] {
  const documents = new Map(
    filesIn(dist)
      .filter((f) => f.endsWith(".html"))
      .map((file) => [
        path.resolve(file),
        elements(parse(fs.readFileSync(file, "utf8"))),
      ]),
  );
  const errors: string[] = [];
  for (const [file, nodes] of documents) {
    const relative = path
      .relative(path.resolve(dist), file)
      .split(path.sep)
      .join("/");
    const pathname =
      relative === "index.html"
        ? "/"
        : "/" + relative.replace(/index\.html$/, "");
    const base = new URL(pathname, "https://artifact.invalid");
    for (const node of nodes) {
      const refs = [
        attribute(node, "href"),
        attribute(node, "src"),
        attribute(node, "poster"),
      ];
      const srcset = attribute(node, "srcset");
      if (srcset && !srcset.startsWith("data:"))
        refs.push(
          ...srcset.split(",").map((item) => item.trim().split(/\s+/)[0]),
        );
      for (const ref of refs) {
        if (!ref || /^(https?:|mailto:|tel:|data:|\/\/)/i.test(ref)) continue;
        let url: URL;
        try {
          url = new URL(ref, base);
        } catch {
          errors.push(`${relative}: niepoprawny link ${ref}`);
          continue;
        }
        if (url.origin !== base.origin) {
          errors.push(`${relative}: niedozwolony link ${ref}`);
          continue;
        }
        let decoded: string;
        try {
          decoded = decodeURIComponent(url.pathname);
        } catch {
          errors.push(`${relative}: niepoprawne kodowanie ${ref}`);
          continue;
        }
        const location = path.resolve(dist, "." + decoded);
        if (
          !location.startsWith(path.resolve(dist) + path.sep) &&
          location !== path.resolve(dist)
        ) {
          errors.push(`${relative}: link poza stronę ${ref}`);
          continue;
        }
        const target = [
          location,
          path.join(location, "index.html"),
          `${location}.html`,
        ].find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
        if (!target) {
          errors.push(`${relative}: link ${ref} prowadzi donikąd.`);
          continue;
        }
        if (url.hash && target.endsWith(".html")) {
          let id: string;
          try {
            id = decodeURIComponent(url.hash.slice(1));
          } catch {
            errors.push(`${relative}: niepoprawna kotwica ${ref}`);
            continue;
          }
          if (!documents.get(target)?.some((n) => attribute(n, "id") === id))
            errors.push(`${relative}: kotwica ${ref} nie istnieje.`);
        }
      }
    }
  }
  return errors;
}

/** Hashe dotyczą dokładnych bajtów inline, bez stałych nonce ani unsafe-inline. */
export function securityHeaders(html: string[]): string {
  const scripts = new Set<string>();
  const styles = new Set<string>();
  for (const content of html)
    for (const node of elements(parse(content))) {
      if (node.tagName === "script" && !attribute(node, "src"))
        scripts.add(hash(serialize(node)));
      if (node.tagName === "style") styles.add(hash(serialize(node)));
    }
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...scripts].join(" ")}`,
    `style-src 'self' ${[...styles].join(" ")}`,
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self' https://api.web3forms.com",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ];
  return `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Content-Security-Policy: ${csp.join("; ")}\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n`;
}
function hash(text: string): string {
  return `'sha256-${createHash("sha256").update(text).digest("base64")}'`;
}

export function checkBudgets(dist: string): string[] {
  const files = filesIn(dist);
  const errors: string[] = [];
  for (const [extension, budget] of [
    [".js", 20 * 1024],
    [".css", 30 * 1024],
  ] as const) {
    // Konserwatywnie sumujemy wszystkie zasoby, także ładowane później.
    const bytes = files
      .filter((f) => f.endsWith(extension))
      .reduce((sum, f) => sum + gzipSync(fs.readFileSync(f)).length, 0);
    if (bytes > budget)
      errors.push(`Budżet ${extension}: ${bytes} B gzip > ${budget} B.`);
  }
  return errors;
}

/** Budżet obrazu hero: wariant fallback o szerokości najbliższej 480px. */
export function checkHeroBudget(dist: string): string[] {
  const errors: string[] = [];
  for (const file of filesIn(dist).filter((f) => f.endsWith(".html"))) {
    for (const image of elements(parse(fs.readFileSync(file, "utf8"))).filter(
      (n) => n.tagName === "img" && attribute(n, "fetchpriority") === "high",
    )) {
      const variants = (attribute(image, "srcset") ?? "")
        .split(",")
        .map((entry) => {
          const [url, width] = entry.trim().split(/\s+/);
          return { url, width: Number(width?.replace(/w$/, "")) };
        })
        .filter((v) => v.url && Number.isFinite(v.width))
        .sort((a, b) => a.width - b.width);
      const candidate = variants.find((v) => v.width >= 480) ?? variants.at(-1);
      const url = candidate?.url ?? attribute(image, "src");
      if (url?.startsWith("/")) {
        const imageFile = path.resolve(dist, "." + url);
        if (
          fs.existsSync(imageFile) &&
          fs.statSync(imageFile).size > 200 * 1024
        )
          errors.push(
            `${path.relative(dist, file)}: obraz hero przekracza 200 KiB dla telefonu.`,
          );
      }
    }
  }
  return errors;
}
