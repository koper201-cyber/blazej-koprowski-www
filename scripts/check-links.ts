import { checkLinks } from "../src/lib/artifacts";
const errors = checkLinks("dist");
for (const error of errors) console.error(`✖ ${error}`);
if (errors.length) process.exitCode = 1;
else console.log("✔ Linki i kotwice (także względne) są poprawne.");
