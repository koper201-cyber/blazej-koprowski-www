/**
 * Po buildzie: sprawdza linki wewnętrzne (/…, #…) i zasoby w dist/.
 * Linki zewnętrzne pomijamy (nie wymagają internetu w CI/u agenta).
 */
import fs from "node:fs";
import path from "node:path";

const DIST = "dist";
const errors: string[] = [];

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

if (!fs.existsSync(DIST)) {
  console.error("✖ Brak folderu dist/ — najpierw uruchom „npm run build”.");
  process.exit(1);
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));
const idsByFile = new Map<string, Set<string>>();
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  idsByFile.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

function targetFile(urlPath: string): string | undefined {
  const clean = decodeURI(urlPath.split(/[?#]/)[0]);
  const candidates = [
    path.join(DIST, clean),
    path.join(DIST, clean, "index.html"),
    path.join(DIST, `${clean.replace(/\/$/, "")}.html`),
  ];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/\s(?:href|src|srcset)="([^"]+)"/g)) {
    for (const raw of m[1].split(",").map((s) => s.trim().split(/\s+/)[0])) {
      if (!raw || /^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
      const rel = path.relative(DIST, f);
      if (raw.startsWith("#")) {
        const id = raw.slice(1);
        if (id && !idsByFile.get(f)?.has(id)) errors.push(`${rel}: kotwica ${raw} nie istnieje na tej stronie.`);
        continue;
      }
      if (!raw.startsWith("/")) continue;
      const target = targetFile(raw);
      if (!target) {
        errors.push(`${rel}: link ${raw} prowadzi donikąd.`);
        continue;
      }
      const hash = raw.split("#")[1];
      if (hash && target.endsWith(".html") && !idsByFile.get(target)?.has(hash)) {
        errors.push(`${rel}: kotwica ${raw} nie istnieje.`);
      }
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  console.error(`\nZepsute linki wewnętrzne: ${errors.length}.`);
  process.exit(1);
}
console.log(`✔ Linki wewnętrzne w ${htmlFiles.length} plikach HTML są poprawne.`);
