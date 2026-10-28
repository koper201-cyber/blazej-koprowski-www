import fs from "node:fs";
import {
  filesIn,
  securityHeaders,
  checkBudgets,
  checkHeroBudget,
} from "../src/lib/artifacts";
const documents = filesIn("dist")
  .filter((f) => f.endsWith(".html"))
  .map((f) => fs.readFileSync(f, "utf8"));
fs.writeFileSync(
  "dist/_headers",
  securityHeaders(documents) +
    (process.env.CF_PAGES_BRANCH &&
    process.env.CF_PAGES_BRANCH !== (process.env.PRODUCTION_BRANCH || "main")
      ? "  X-Robots-Tag: noindex\n"
      : ""),
);
const errors = [...checkBudgets("dist"), ...checkHeroBudget("dist")];
for (const error of errors) console.error(`✖ ${error}`);
if (errors.length) process.exitCode = 1;
else console.log("✔ Nagłówki CSP wygenerowane; budżety JS/CSS spełnione.");
