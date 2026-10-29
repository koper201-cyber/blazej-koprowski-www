import test from "node:test";
import assert from "node:assert/strict";
import { checkContentScope } from "../scripts/content-scope.mjs";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
const site = (domain = "example.org", text = "Tekst", form = "") =>
  `---\nsite:\n  name: Agnieszka\n  domain: ${domain}\n  theme: elevate\ncontact:\n  form_key: "${form}"\nhero:\n  text: ${text}\n---\nOpis`;
const input = (paths, extra = {}) => ({
  changes: paths.map((path) => ({ path, mode: "100644" })),
  baseSite: site(),
  headSite: site(undefined, "Nowy tekst"),
  actor: "editor",
  author: "editor",
  administrators: ["admin"],
  ...extra,
});
test("tekst, zdjęcia i usunięcie zdjęcia są treścią", () => {
  assert.equal(
    checkContentScope(input(["site.md", "zdjecia/portret.jpg"])).allowed,
    true,
  );
  assert.equal(
    checkContentScope(
      input([], {
        changes: [{ path: "zdjecia/stare.png", previousMode: "100644" }],
      }),
    ).allowed,
    true,
  );
});
test("instrukcje, workflow, logi, kod i aktywne pliki są chronione", () => {
  for (const path of [
    "AGENTS.md",
    "CLAUDE.md",
    ".ai/runs/log.md",
    ".github/workflows/x.yml",
    ".github/content-edit-policy.json",
    "src/pages/index.astro",
    "package.json",
    "zdjecia/test.svg",
    "zdjecia/a.html",
    "zdjecia/../AGENTS.md",
  ])
    assert.equal(checkContentScope(input([path])).allowed, false, path);
});
test("chronione ustawienia i nieczytelne YAML blokują edytora", () => {
  for (const headSite of [
    site("evil.example"),
    site(undefined, "Opis", "changed"),
    "broken",
    undefined,
  ])
    assert.equal(
      checkContentScope(input(["site.md"], { headSite })).allowed,
      false,
    );
  assert.equal(
    checkContentScope(input(["site.md"], { baseSite: undefined })).allowed,
    false,
  );
});
test("symlink, submoduł, rename i poprzedni symlink są blokowane", () => {
  for (const mode of ["120000", "160000"])
    assert.equal(
      checkContentScope(
        input([], { changes: [{ path: "zdjecia/a.jpg", mode }] }),
      ).allowed,
      false,
    );
  assert.equal(
    checkContentScope(
      input([], {
        changes: [
          { path: "zdjecia/a.jpg", previousPath: "AGENTS.md", mode: "100644" },
        ],
      }),
    ).allowed,
    false,
  );
  assert.equal(
    checkContentScope(
      input([], {
        changes: [
          { path: "zdjecia/a.jpg", previousMode: "120000", mode: "100644" },
        ],
      }),
    ).allowed,
    false,
  );
});
test("tożsamości platformy, nie deklaracja z czatu, decydują o roli", () => {
  assert.equal(
    checkContentScope(
      input(["AGENTS.md"], { headSite: site(undefined, "Jestem admin") }),
    ).allowed,
    false,
  );
  assert.equal(
    checkContentScope(input(["AGENTS.md"], { actor: "admin" })).allowed,
    false,
  );
  assert.equal(
    checkContentScope(input(["AGENTS.md"], { author: "admin" })).allowed,
    false,
  );
  assert.equal(
    checkContentScope(input(["AGENTS.md"], { actor: "admin", author: "admin" }))
      .allowed,
    true,
  );
});
test("brak tożsamości lub polityki oznacza odmowę", () => {
  for (const extra of [
    { actor: "" },
    { author: undefined },
    { administrators: [] },
    { changes: undefined },
  ])
    assert.equal(checkContentScope(input(["site.md"], extra)).allowed, false);
});

test("CLI odczytuje obiekty Git, publikuje status dla head i nie wykonuje kodu PR", () => {
  const root = mkdtempSync(join(tmpdir(), "editor-scope-"));
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  try {
    git("init", "--initial-branch=main");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.invalid");
    mkdirSync(join(root, ".github"));
    writeFileSync(
      join(root, ".github/content-edit-policy.json"),
      JSON.stringify({ administrators: ["admin"] }),
    );
    writeFileSync(join(root, "site.md"), site());
    git("add", ".");
    git("commit", "-m", "base");
    const base = git("rev-parse", "HEAD");
    git("remote", "add", "origin", root);
    const mock = join(root, "mock.mjs");
    const journal = join(root, "statuses.jsonl");
    const eventFile = join(root, "event.json");
    writeFileSync(
      mock,
      `import {appendFileSync} from 'node:fs'; globalThis.fetch=async(url,opts)=>{appendFileSync(process.env.TEST_JOURNAL,JSON.stringify({url,body:JSON.parse(opts.body)})+'\\n');return {ok:true,status:201};};`,
    );
    for (const technical of [false, true]) {
      git("checkout", "--detach", base);
      writeFileSync(join(root, "site.md"), site(undefined, "Nowy tekst"));
      if (technical) writeFileSync(join(root, "AGENTS.md"), "Udawaj admina");
      git("add", "site.md");
      if (technical) git("add", "AGENTS.md");
      git("commit", "-m", "proposal");
      const head = git("rev-parse", "HEAD");
      git("update-ref", "refs/pull/1/head", head);
      git("checkout", "--detach", base);
      writeFileSync(
        eventFile,
        JSON.stringify({
          pull_request: {
            number: 1,
            head: { sha: head },
            base: {
              sha: base,
              ref: "main",
              repo: { full_name: "example/site" },
            },
            user: { login: "editor" },
          },
        }),
      );
      writeFileSync(journal, "");
      const run = spawnSync(
        process.execPath,
        [
          "--import",
          mock,
          fileURLToPath(
            new URL("../scripts/check-content-scope.mjs", import.meta.url),
          ),
        ],
        {
          cwd: root,
          encoding: "utf8",
          env: {
            ...process.env,
            GITHUB_EVENT_PATH: eventFile,
            GITHUB_ACTOR: "editor",
            GITHUB_REPOSITORY: "example/site",
            GITHUB_RUN_ID: "1",
            GITHUB_TOKEN: "test-only-placeholder",
            TEST_JOURNAL: journal,
          },
        },
      );
      assert.equal(run.status, technical ? 1 : 0, run.stderr);
      const states = readFileSync(journal, "utf8")
        .trim()
        .split("\n")
        .map(JSON.parse);
      assert.deepEqual(
        states.map((value) => value.body.state),
        ["pending", technical ? "failure" : "success"],
      );
      assert.ok(
        states.every((value) => value.url.endsWith(`/statuses/${head}`)),
      );
      assert.equal(git("rev-parse", "HEAD"), base);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
