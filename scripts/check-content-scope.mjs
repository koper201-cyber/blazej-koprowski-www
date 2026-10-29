// Uruchamiany tylko z zaufanej bazy. Nigdy nie checkoutuje ani nie wykonuje kodu PR.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { checkContentScope } from "./content-scope.mjs";

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const pr = event.pull_request;
const number = pr?.number ?? event.number;
const sha = pr?.head?.sha;
const base = pr?.base?.sha;
if (
  !Number.isSafeInteger(number) ||
  !/^[a-f0-9]{40,64}$/.test(sha ?? "") ||
  !/^[a-f0-9]{40,64}$/.test(base ?? "")
) {
  throw new Error("Brak zaufanych danych PR");
}
const repo = process.env.GITHUB_REPOSITORY;
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? ""))
  throw new Error("Niepoprawne repozytorium");
if (pr.base.ref !== "main" || pr.base.repo?.full_name !== repo)
  throw new Error("Kontrola obsługuje tylko main bieżącego repozytorium");
async function status(state, description) {
  const result = await fetch(
    `https://api.github.com/repos/${repo}/statuses/${sha}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        state,
        context: "Zakres edycji treści",
        description,
        target_url: `https://github.com/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}`,
      }),
    },
  );
  if (!result.ok) throw new Error(`Zapis statusu: HTTP ${result.status}`);
}
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
try {
  await status("pending", "Sprawdzanie zakresu zmian.");
  git("fetch", "--no-tags", "origin", `refs/pull/${number}/head`);
  if (git("rev-parse", "FETCH_HEAD").trim() !== sha)
    throw new Error("Wersja PR zmieniła się podczas kontroli");
  const rows = git(
    "diff",
    "--raw",
    "--no-abbrev",
    "--no-renames",
    "-z",
    base,
    sha,
  ).split("\0");
  const changes = [];
  for (let index = 0; index < rows.length && rows[index]; index += 2) {
    const metadata = rows[index].split(" ");
    if (metadata.length !== 5 || !rows[index + 1])
      throw new Error("Niepełna lista zmian");
    changes.push({
      path: rows[index + 1],
      previousMode:
        metadata[0].slice(1) === "000000" ? undefined : metadata[0].slice(1),
      mode: metadata[1] === "000000" ? undefined : metadata[1],
    });
  }
  const getSite = (ref) => {
    try {
      return git("show", `${ref}:site.md`);
    } catch {
      return undefined;
    }
  };
  const policy = JSON.parse(
    readFileSync(".github/content-edit-policy.json", "utf8"),
  );
  const result = checkContentScope({
    changes,
    baseSite: getSite(base),
    headSite: getSite(sha),
    actor: process.env.GITHUB_ACTOR,
    author: pr.user?.login,
    administrators: policy.administrators,
  });
  console.log(result.reason); // Nigdy nie wypisuj YAML, różnic ani tokenów.
  await status(
    result.allowed ? "success" : "failure",
    result.allowed
      ? "Zakres zmian dozwolony."
      : "Zmiana techniczna wymaga administratora.",
  );
  if (!result.allowed) process.exitCode = 1;
} catch {
  await status(
    "failure",
    "Nie udało się sprawdzić zakresu. Publikacja zablokowana.",
  );
  throw new Error(
    "Kontrola zakresu nie została ukończona; sprawdź uprawnienia i wersję PR.",
  );
}
