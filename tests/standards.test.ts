import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse } from "parse5";
import { readContent } from "../src/lib/content";
import { siteSchema } from "../src/lib/site-schema";
import { renderSafeMarkdown, serializeJsonLd } from "../src/lib/safe-html";
import { buildViewModel } from "../src/lib/view-model";
import { eventStart } from "../src/lib/dates";
import {
  todayInPoland,
  upcomingWorkshops,
  previewUrl,
} from "../src/lib/load-site";
import {
  checkLinks,
  elements,
  attribute,
  securityHeaders,
  checkBudgets,
} from "../src/lib/artifacts";

const source = fs.readFileSync("examples/demo/site.md", "utf8");
const fixture = () => siteSchema.parse(readContent(source).data);

test("opcjonalna oferta sprzedażowa zachowuje stare warianty i odrzuca puste etapy", () => {
  assert.equal(fixture().sales, undefined);
  const data = {
    ...fixture(),
    sales: {
      eyebrow: "Aplikacje",
      offer_heading: "Problemy",
      about_heading: "Osoba",
      contact_heading: "Rozmowa",
      contact_text: "Opisz projekt",
      mobile_contact: true,
      process: {
        heading: "Proces",
        steps: [{ title: "Ustalenia", text: "Poznajemy cel" }],
      },
    },
  };
  assert.equal(siteSchema.safeParse(data).success, true);
  assert.equal(
    siteSchema.safeParse({
      ...data,
      sales: { ...data.sales, process: { heading: "Proces", steps: [] } },
    }).success,
    false,
  );
  assert.equal(
    siteSchema.safeParse({ ...data, sales: undefined }).success,
    true,
  );
  assert.equal(
    siteSchema.safeParse({
      ...data,
      sales: {
        ...data.sales,
        process: undefined,
        expertise: undefined,
        mobile_contact: false,
      },
    }).success,
    true,
  );
});

test("parser zachowuje niecytowane daty; schemat odrzuca nieistniejący dzień", () => {
  const raw = readContent(source.replace("2027-02-14", "2027-02-30"));
  assert.equal(
    (raw.data.workshops as { date: string }[])[0]?.date,
    "2027-02-30",
  );
  assert.equal(siteSchema.safeParse(raw.data).success, false);
  assert.equal(
    siteSchema.safeParse(
      readContent(source.replace("2027-02-14", "2028-02-29")).data,
    ).success,
    true,
  );
  assert.equal(
    siteSchema.safeParse(
      readContent(source.replace("2027-02-14", "2027-02-29")).data,
    ).success,
    false,
  );
});
test("kontrakt odrzuca nieznane pola, brak e-maila i niewłaściwe ceny", () => {
  assert.equal(
    siteSchema.safeParse({ ...fixture(), typo: true }).success,
    false,
  );
  const data = fixture();
  assert.equal(siteSchema.safeParse({ ...data, contact: {} }).success, false);
  for (const price of [-1, Infinity, NaN, "300 zł"])
    assert.equal(
      siteSchema.safeParse({
        ...data,
        products: [{ ...data.products[0], price }],
      }).success,
      false,
    );
});
test("linki odrzucają niebezpieczne schematy i protokoły względne", () => {
  const data = fixture();
  for (const cta_link of [
    "javascript:alert(1)",
    "//evil.test",
    "/\\evil.test",
    "https://",
    "https://user:pass@example.com",
    "https://x.test/\u0000",
  ]) {
    assert.equal(
      siteSchema.safeParse({ ...data, hero: { ...data.hero, cta_link } })
        .success,
      false,
      cta_link,
    );
  }
  assert.equal(
    siteSchema.safeParse({
      ...data,
      contact: { ...data.contact, linkedin: "mailto:x@y.pl" },
    }).success,
    false,
  );
});
test("Markdown usuwa XSS, zachowując semantyczne formatowanie", () => {
  const html = renderSafeMarkdown(
    '## Nagłówek\n\n**Tekst** [dobry](https://example.com)\n\n<script>window.__xss=1</script><img src=x onerror=alert(1)><iframe src=x></iframe><a href="javascript:alert(1)" onclick="x()">zły</a><a href="//evil.test">zły</a>',
  );
  assert.match(html, /<strong>Tekst<\/strong>/);
  assert.match(html, /href="https:\/\/example.com"/);
  assert.doesNotMatch(
    html,
    /<script|onerror|onclick|<img|<iframe|javascript:|href="\/\//i,
  );
});
test("JSON-LD nie może zamknąć znacznika script w wynikowym HTML", () => {
  const value = { text: "</script><script>window.__xss=1</script>ą" };
  const serialized = serializeJsonLd(value);
  assert.deepEqual(JSON.parse(serialized), value);
  const scripts = elements(
    parse(`<script type="application/ld+json">${serialized}</script>`),
  ).filter((n) => n.tagName === "script");
  assert.equal(scripts.length, 1);
  assert.equal(attribute(scripts[0]!, "type"), "application/ld+json");
});
test("czas Warszawy, DST i granica dnia są jawne", () => {
  assert.equal(todayInPoland(new Date("2026-10-26T23:30:00Z")), "2026-10-27");
  assert.equal(eventStart("2027-01-14", "18:00"), "2027-01-14T18:00:00+01:00");
  assert.equal(eventStart("2027-07-14", "18:00"), "2027-07-14T18:00:00+02:00");
  assert.throws(() => eventStart("2027-03-28", "02:30"), /nie istnieje/);
  assert.equal(eventStart("2027-10-31", "02:30"), "2027-10-31T02:30:00+02:00");
  assert.equal(eventStart("2027-01-14"), "2027-01-14");
});
test("wczoraj znika, dziś zostaje; sortowanie nie mutuje danych", () => {
  const data = fixture();
  const before = JSON.stringify(data);
  assert.equal(upcomingWorkshops(data, "2027-02-14").length, 2);
  assert.equal(upcomingWorkshops(data, "2027-02-15").length, 1);
  assert.equal(JSON.stringify(data), before);
});
test("wszystkie kombinacje flag mają spójne menu, CTA i warsztaty", () => {
  for (let mask = 0; mask < 64; mask++) {
    const data = fixture();
    const keys = Object.keys(data.features) as (keyof typeof data.features)[];
    keys.forEach((key, index) => {
      data.features[key] = Boolean(mask & (1 << index));
    });
    data.hero.cta_link = "#kontakt";
    const view = buildViewModel(data, { "O mnie": "tekst" }, "2027-02-14");
    assert.equal(
      view.nav.some((n) => n.href === "/#kontakt"),
      data.features.contact,
    );
    assert.equal(Boolean(view.ctaLink), data.features.contact);
    assert.equal(view.workshops.length, data.features.workshops ? 2 : 0);
  }
  assert.equal(
    previewUrl("codex/Test branch", "projekt"),
    "https://codex-test-branch.projekt.pages.dev",
  );
});
test("kontrola linków obejmuje ścieżki względne, kotwice i HTML entities", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "site-links-"));
  try {
    fs.mkdirSync(path.join(dir, "nested"));
    fs.writeFileSync(
      path.join(dir, "index.html"),
      '<h1 id="żółć">Start</h1><a href="nested/?a=1&amp;b=2#cel">link</a>',
    );
    fs.writeFileSync(
      path.join(dir, "nested/index.html"),
      '<h1 id="cel">Cel</h1><a href="../#żółć">Powrót</a>',
    );
    assert.deepEqual(checkLinks(dir), []);
    fs.appendFileSync(
      path.join(dir, "nested/index.html"),
      '<a href="missing.html">błąd</a><a href="#brak">błąd</a>',
    );
    assert.equal(checkLinks(dir).length, 2);
    assert.deepEqual(checkBudgets(dir), []);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test("CSP generuje hashe i nie dopuszcza unsafe-inline", () => {
  const headers = securityHeaders([
    "<style>body{color:red}</style><script>console.log(1)</script>",
  ]);
  assert.match(headers, /script-src 'self' 'sha256-/);
  assert.match(headers, /frame-ancestors 'none'/);
  assert.doesNotMatch(headers, /unsafe-inline|nonce-/);
});

test("walidator CLI sprawdza rzeczywiste obrazy, brak pliku i limit 15 MB", async () => {
  const { default: sharp } = await import("sharp");
  const { dump } = await import("js-yaml");
  const { spawnSync } = await import("node:child_process");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "site-images-"));
  try {
    fs.mkdirSync(path.join(dir, "zdjecia"));
    const data = fixture();
    data.hero.image = undefined;
    data.products = [
      {
        name: "Test",
        price: 10,
        status: "dostępna",
        image: "tiny.jpg",
        alt: "Obraz testowy",
      },
    ];
    data.workshops = [];
    const file = path.join(dir, "site.md");
    fs.writeFileSync(
      file,
      `---\n${dump(data)}---\n# O mnie\nTekst\n# Polityka prywatności\nTekst\n`,
    );
    const run = () =>
      spawnSync(
        process.execPath,
        ["--import", "tsx", "scripts/validate-site.ts"],
        { encoding: "utf8", env: { ...process.env, SITE_FILE: file } },
      );
    assert.equal(run().status, 1, "brak zdjęcia");
    await sharp({
      create: { width: 8, height: 8, channels: 3, background: "red" },
    })
      .jpeg()
      .toFile(path.join(dir, "zdjecia/tiny.jpg"));
    assert.equal(run().status, 0, "prawidłowy mały JPG");
    fs.writeFileSync(path.join(dir, "zdjecia/tiny.jpg"), "to nie obraz");
    assert.equal(run().status, 1, "uszkodzony JPG");
    fs.writeFileSync(
      path.join(dir, "zdjecia/tiny.jpg"),
      Buffer.alloc(16 * 1024 * 1024),
    );
    assert.equal(run().status, 1, "przekroczony limit");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
