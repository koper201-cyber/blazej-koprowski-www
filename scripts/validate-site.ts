/**
 * npm run site:validate
 * Sprawdza site.md i folder zdjecia/. Błędy po polsku, z numerem pozycji.
 * Kod wyjścia 1 = są błędy (PR dostanie czerwony check).
 * Ostrzeżenia nie blokują publikacji.
 */
import fs from "node:fs";
import sharp from "sharp";
import { eventStart } from "../src/lib/dates";
import path from "node:path";
import type { $ZodIssue as ZodIssue } from "zod/v4/core";
import {
  parseSite,
  siteFilePath,
  imagesDir,
  todayInPoland,
} from "../src/lib/load-site";
import {
  FIELD_LABELS,
  KNOWN_SECTIONS,
  SECTION_ABOUT,
  SECTION_PRIVACY,
  type SiteData,
} from "../src/lib/site-schema";
import { generatedPathFor } from "./prepare-images";

const MAX_IMAGE_MB = 15;
const errors: string[] = [];
const warnings: string[] = [];

const file = siteFilePath();
if (!fs.existsSync(file)) {
  console.error(`✖ Nie znaleziono pliku ${file}.`);
  process.exit(1);
}

let res;
try {
  res = parseSite(file);
} catch (e) {
  console.error(
    `✖ Nie da się odczytać ${file} — prawdopodobnie błąd w składni YAML (wcięcia, cudzysłowy, dwukropki).`,
  );
  console.error(
    `  Szczegóły: ${(e instanceof Error ? e.message : String(e)).split("\n").slice(0, 4).join("\n  ")}`,
  );
  process.exit(1);
}

const fm = res.raw.frontmatter;

/** Opis miejsca błędu, np. „Produkt nr 2 («Mandala Spokój»), pole «cena»”. */
function where(p: PropertyKey[]): string {
  const [top, idx, field, ...rest] = p;
  const topLabel = FIELD_LABELS[String(top)] ?? String(top);
  if (typeof idx === "number") {
    const list = fm[String(top)];
    const item: unknown = Array.isArray(list) ? list[idx] : undefined;
    const record =
      item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const name = record.name ?? record.title ?? record.author;
    const nameTxt = name ? ` («${name}»)` : "";
    const fieldTxt =
      field !== undefined
        ? `, pole «${FIELD_LABELS[String(field)] ?? String(field)}»`
        : "";
    return `${topLabel} nr ${idx + 1}${nameTxt}${fieldTxt}${rest.length ? "." + rest.join(".") : ""}`;
  }
  if (idx !== undefined) {
    const label = FIELD_LABELS[String(idx)] ?? String(idx);
    return `${topLabel}, pole «${label}» (${String(top)}.${String(idx)})`;
  }
  return topLabel;
}

function translate(issue: ZodIssue): string {
  const w = where(issue.path);
  switch (issue.code) {
    case "invalid_type":
      if (issue.message.startsWith("brak"))
        return `${w}: brak wartości (pole jest wymagane).`;
      if (issue.expected === "number")
        return `${w}: musi być samą liczbą, np. 300 (bez „zł”, „PLN”, cudzysłowów).`;
      if (issue.expected === "boolean")
        return `${w}: wpisz true (włączone) albo false (wyłączone).`;
      if (issue.expected === "array")
        return `${w}: oczekiwano listy pozycji zaczynających się od „- ”.`;
      return `${w}: zły typ wartości (oczekiwano ${issue.expected}).`;
    case "invalid_union":
      return `${w}: zły format wartości — dla daty użyj RRRR-MM-DD.`;
    case "unrecognized_keys":
      return `${w}: nieznane pole ${issue.keys.map((k) => `«${k}»`).join(", ")} — sprawdź literówkę albo usuń.`;
    case "invalid_value":
      return `${w}: dozwolone wartości to ${issue.values.map((o) => `«${String(o)}»`).join(", ")}.`;
    default:
      return `${w}: ${issue.message}.`;
  }
}

if (!res.ok) {
  for (const issue of res.issues) errors.push(translate(issue));
} else {
  await checkSite(res.data);
}

// Sekcje Markdown
const sections = res.raw.sectionsMd;
if (res.raw.preamble) {
  warnings.push(
    `Tekst nad pierwszym nagłówkiem „# …” nie zostanie pokazany na stronie. Przenieś go pod „# ${SECTION_ABOUT}”.`,
  );
}
for (const h of Object.keys(sections)) {
  if (!(KNOWN_SECTIONS as readonly string[]).includes(h)) {
    warnings.push(
      `Sekcja „# ${h}” nie jest używana przez stronę. Dozwolone: ${KNOWN_SECTIONS.map((s) => `„# ${s}”`).join(", ")}.`,
    );
  }
}
if (!sections[SECTION_PRIVACY])
  errors.push(`Brak sekcji „# ${SECTION_PRIVACY}” — jest wymagana.`);
if (res.ok && res.data.features.about && !sections[SECTION_ABOUT]) {
  errors.push(
    `Sekcja „O mnie” jest włączona (features.about: true), ale brak tekstu pod nagłówkiem „# ${SECTION_ABOUT}”.`,
  );
}

// Niedokończone miejsca
const fullText = fs.readFileSync(file, "utf8");
const todo = fullText
  .split("\n")
  .filter((l) => /UZUPEŁNIJ|example\.(com|pl)/i.test(l)).length;
if (todo)
  warnings.push(
    `W pliku jest ${todo} miejsc do uzupełnienia (UZUPEŁNIJ / example.com).`,
  );

async function checkSite(d: SiteData): Promise<void> {
  const dir = imagesDir(file);
  const available = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const name of available.filter((f) =>
    /\.(jpe?g|png|webp|avif|heic|heif)$/i.test(f),
  )) {
    const file = path.join(dir, name);
    const stat = fs.lstatSync(file);
    if (
      !stat.isFile() ||
      stat.isSymbolicLink() ||
      stat.size > MAX_IMAGE_MB * 1024 * 1024
    ) {
      errors.push(
        `Zdjęcie ${name}: wymagany zwykły plik do ${MAX_IMAGE_MB} MB.`,
      );
      continue;
    }
    const input = /\.(heic|heif)$/i.test(name)
      ? generatedPathFor(dir, name)
      : file;
    try {
      await sharp(input, { limitInputPixels: 40000000 }).stats();
    } catch {
      errors.push(
        `Zdjęcie ${name}: nie można poprawnie odczytać obrazu. Uruchom prepare-images dla HEIC.`,
      );
    }
  }
  for (const workshop of d.workshops) {
    try {
      eventStart(workshop.date, workshop.time);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  const checkImage = (
    name: string | undefined,
    label: string,
    alt?: string,
  ) => {
    if (!name) return;
    const full = path.join(dir, name);
    if (!fs.existsSync(full)) {
      const similar = available.find((f) => normalize(f) === normalize(name));
      errors.push(
        `${label}: brak pliku ${path.join(dir, name)}.` +
          (similar
            ? ` Czy chodziło o «${similar}»?`
            : " Wgraj zdjęcie do folderu zdjecia/."),
      );
      return;
    }
    const mb = fs.statSync(full).size / 1024 / 1024;
    if (mb > MAX_IMAGE_MB)
      errors.push(
        `${label}: plik ${name} ma ${mb.toFixed(1)} MB — maksimum to ${MAX_IMAGE_MB} MB.`,
      );
    if (
      /\.(heic|heif)$/i.test(name) &&
      !fs.existsSync(generatedPathFor(dir, name))
    ) {
      errors.push(
        `${label}: zdjęcie ${name} nie zostało przekonwertowane. Uruchom „npm run prepare-images”.`,
      );
    }
    if (/[^a-z0-9._-]/i.test(name)) {
      warnings.push(
        `${label}: nazwa pliku «${name}» ma spacje lub polskie znaki. Lepiej: «${safeName(name)}».`,
      );
    }
    if (alt === undefined)
      warnings.push(
        `${label}: brak opisu zdjęcia (alt) — przydaje się osobom niewidomym i w Google.`,
      );
  };

  checkImage(d.hero.image, "Nagłówek strony (hero)", d.hero.alt);
  checkImage(d.seo.image, "SEO, zdjęcie do udostępnień", "");
  checkImage(d.site.logo, "Logo", "");
  d.products.forEach((p, i) =>
    checkImage(p.image, `Produkt nr ${i + 1} («${p.name}»)`, p.alt),
  );
  d.workshops.forEach((w, i) =>
    checkImage(w.image, `Warsztat nr ${i + 1} («${w.title}»)`, w.alt),
  );

  // Kontrast: biały tekst na przyciskach w kolorze głównym
  const ratio = contrast(d.site.primary_color, "#ffffff");
  if (ratio < 4.5) {
    errors.push(
      `Kolor główny ${d.site.primary_color} jest za jasny — biały tekst na przyciskach będzie nieczytelny (kontrast ${ratio.toFixed(1)}:1, potrzeba min. 4.5:1). Wybierz ciemniejszy odcień.`,
    );
  }

  // Sekcje włączone, ale puste
  if (d.features.products && d.products.length === 0)
    warnings.push(
      "Sekcja produktów jest włączona, ale lista products jest pusta.",
    );
  if (d.features.offer && d.offer.length === 0)
    warnings.push("Sekcja oferty jest włączona, ale lista offer jest pusta.");
  if (d.features.testimonials && d.testimonials.length === 0)
    warnings.push(
      "Sekcja opinii jest włączona, ale lista testimonials jest pusta.",
    );
  if (!d.features.products && d.products.length)
    warnings.push(
      "Są produkty, ale sekcja jest wyłączona (features.products: false) — nie będą widoczne.",
    );
  if (!d.features.workshops && d.workshops.length)
    warnings.push(
      "Są warsztaty, ale sekcja jest wyłączona (features.workshops: false) — nie będą widoczne.",
    );

  const today = todayInPoland();
  d.workshops.forEach((w, i) => {
    if (w.date < today)
      warnings.push(
        `Warsztat nr ${i + 1} («${w.title}», ${w.date}) już się odbył — jest ukryty na stronie.`,
      );
  });
  if (
    d.features.workshops &&
    d.workshops.length &&
    d.workshops.every((w) => w.date < today)
  ) {
    warnings.push(
      "Wszystkie warsztaty są w przeszłości — strona pokaże „Brak nadchodzących terminów”.",
    );
  }

  if (d.seo.description.length > 160)
    warnings.push(
      `Opis SEO ma ${d.seo.description.length} znaków — Google pokaże ok. 155–160.`,
    );
  if (!d.site.domain && !d.site.pages_project)
    warnings.push(
      "Brak domeny i nazwy projektu Cloudflare (site.domain / site.pages_project) — adresy w sitemap będą tymczasowe.",
    );

  const names = new Map<string, number>();
  d.products.forEach((p, i) => {
    const k = p.name.toLowerCase();
    if (names.has(k))
      warnings.push(
        `Produkt nr ${i + 1} ma taką samą nazwę jak produkt nr ${names.get(k)! + 1} («${p.name}»).`,
      );
    names.set(k, i);
  });
}

function normalize(s: string) {
  return safeName(s).toLowerCase();
}
function safeName(s: string) {
  const map: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };
  return s
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => map[c] ?? c)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
}
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}
function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((l1 ?? 0) + 0.05) / ((l2 ?? 0) + 0.05);
}

// Wynik
console.log(`Sprawdzam ${file}…`);
for (const w of warnings) console.log(`⚠️  ${w}`);
for (const e of errors) console.log(`✖  ${e}`);
if (errors.length) {
  console.log(
    `\nZnaleziono błędy: ${errors.length}. Popraw je w ${file} i uruchom ponownie.`,
  );
  process.exit(1);
}
console.log(
  `✔ ${file} jest poprawny${warnings.length ? ` (ostrzeżenia: ${warnings.length})` : ""}.`,
);
