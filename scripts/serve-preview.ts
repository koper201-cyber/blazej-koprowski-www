import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("dist");
const headers = Object.fromEntries(
  fs
    .readFileSync(path.join(root, "_headers"), "utf8")
    .split("\n")
    .filter((line) => line.startsWith("  "))
    .map((line) => {
      const split = line.indexOf(":");
      return [line.slice(0, split).trim(), line.slice(split + 1).trim()];
    }),
);
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
createServer((req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    const file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403).end();
      return;
    }
    const target = [file, path.join(file, "index.html"), `${file}.html`].find(
      (p) => fs.existsSync(p) && fs.statSync(p).isFile(),
    );
    if (!target || target.endsWith("_headers")) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      ...headers,
      "Content-Type": types[path.extname(target)] ?? "application/octet-stream",
    });
    if (req.method === "HEAD") res.end();
    else res.end(fs.readFileSync(target));
  } catch {
    res.writeHead(400).end();
  }
}).listen(4321, "127.0.0.1", () =>
  console.log("Preview http://127.0.0.1:4321"),
);
