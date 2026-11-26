/**
 * Wersje językowe strony. Polska treść: site.md. Angielska: site.en.md obok
 * (tylko teksty). Brak site.en.md = strona wyłącznie po polsku.
 * Bez importów z Astro — używane też przez walidator.
 */
import fs from "node:fs";
import { z } from "zod";
import type { $ZodIssue as ZodIssue } from "zod/v4/core";
import { loadSite, readRawSite, siteFilePath, type Site } from "./load-site";
import { renderSafeMarkdown } from "./safe-html";
import { SECTION_ABOUT, SECTION_PRIVACY, type SiteData } from "./site-schema";

export const LOCALES = ["pl", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** site.md -> site.en.md (examples/demo/site.md -> examples/demo/site.en.md). */
export function translationFilePath(siteFile = siteFilePath()): string {
  return siteFile.replace(/(\.md)?$/i, ".en.md");
}

export function englishAvailable(siteFile = siteFilePath()): boolean {
  return fs.existsSync(translationFilePath(siteFile));
}

/** Nagłówki sekcji w site.en.md -> klucze sekcji używane przez stronę. */
export const EN_SECTION_ABOUT = "About me";
export const EN_SECTION_PRIVACY = "Privacy policy";
const EN_SECTIONS: Record<string, string> = {
  [EN_SECTION_ABOUT]: SECTION_ABOUT,
  [EN_SECTION_PRIVACY]: SECTION_PRIVACY,
};

const text = z
  .string({ error: "brak wartości" })
  .trim()
  .min(1, "pole jest puste");
const optional = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  text.optional(),
);

/** Co wolno tłumaczyć. Kontakt, zdjęcia i ustawienia są wspólne z site.md. */
export const translationSchema = z
  .object({
    seo: z.object({ title: text, description: text }).strict(),
    hero: z
      .object({
        heading: text,
        text: optional,
        cta_label: optional,
        alt: optional,
      })
      .strict(),
    about_photo: z
      .object({
        alt: text,
        caption: optional,
      })
      .strict()
      .optional(),
    offer: z
      .array(
        z.object({ title: text, text: optional, price: optional }).strict(),
      )
      .default([]),
    testimonials: z
      .array(z.object({ author: text, text: text }).strict())
      .default([]),
  })
  .strict();
export type Translation = z.infer<typeof translationSchema>;

/** Teksty z site.en.md nałożone na wspólne dane z site.md. */
export function mergeTranslation(base: SiteData, t: Translation): SiteData {
  const merged: SiteData = {
    ...base,
    site: { ...base.site, language: "en" },
    seo: { ...base.seo, ...t.seo },
    hero: { ...base.hero, ...t.hero },
    offer: t.offer,
    testimonials: t.testimonials,
  };
  if (base.about_photo) {
    const photo: NonNullable<SiteData["about_photo"]> = {
      image: base.about_photo.image,
      alt: t.about_photo?.alt ?? base.about_photo.alt,
    };
    if (t.about_photo?.caption) photo.caption = t.about_photo.caption;
    merged.about_photo = photo;
  }
  return merged;
}

export interface TranslationCheck {
  errors: string[];
  warnings: string[];
}

/** Czy angielska wersja ma wszystko, co pokazuje polska. */
export function checkTranslation(
  base: SiteData,
  t: Translation,
  sections: Record<string, string>,
): TranslationCheck {
  const errors: string[] = [];
  const warnings: string[] = [];
  const need = (present: unknown, translated: unknown, label: string) => {
    if (present && !translated)
      errors.push(`brak tłumaczenia pola ${label} (jest w site.md).`);
  };
  need(base.hero.text, t.hero.text, "hero.text");
  need(base.hero.cta_label, t.hero.cta_label, "hero.cta_label");
  need(base.hero.alt, t.hero.alt, "hero.alt");
  need(base.about_photo, t.about_photo, "about_photo.alt");
  if (base.about_photo?.caption && !t.about_photo?.caption)
    warnings.push(
      "brak tłumaczenia podpisu zdjęcia (about_photo.caption) — po angielsku podpis nie będzie pokazany.",
    );
  if (t.about_photo?.caption && !base.about_photo?.caption)
    warnings.push(
      "site.en.md ma podpis zdjęcia (about_photo.caption), którego nie ma w site.md.",
    );
  if (t.offer.length !== base.offer.length)
    errors.push(
      `oferta ma ${t.offer.length} pozycji, a w site.md jest ${base.offer.length} — przetłumacz każdą pozycję w tej samej kolejności.`,
    );
  if (t.testimonials.length !== base.testimonials.length)
    errors.push(
      `opinii jest ${t.testimonials.length}, a w site.md ${base.testimonials.length} — przetłumacz każdą w tej samej kolejności.`,
    );
  if (base.features.about && !sections[SECTION_ABOUT])
    errors.push(`brak sekcji „# ${EN_SECTION_ABOUT}”.`);
  if (!sections[SECTION_PRIVACY])
    errors.push(`brak sekcji „# ${EN_SECTION_PRIVACY}”.`);
  return { errors, warnings };
}

function describeIssue(issue: ZodIssue): string {
  const where = issue.path.map(String).join(".") || "plik";
  if (issue.code === "unrecognized_keys")
    return `${where}: nieznane pole ${issue.keys.map((k) => `«${k}»`).join(", ")} — site.en.md zawiera tylko teksty (seo, hero, about_photo, offer, testimonials).`;
  return `${where}: ${issue.message}.`;
}

export type TranslationResult =
  | {
      ok: true;
      data: SiteData;
      sections: Record<string, string>;
      warnings: string[];
    }
  | { ok: false; errors: string[]; warnings: string[] };

/** Wczytuje i sprawdza site.en.md względem poprawnych danych z site.md. */
export function parseTranslation(
  base: SiteData,
  siteFile = siteFilePath(),
): TranslationResult {
  const raw = readRawSite(translationFilePath(siteFile));
  const warnings: string[] = [];
  if (raw.preamble)
    warnings.push(
      `tekst nad pierwszym nagłówkiem „# …” nie zostanie pokazany. Przenieś go pod „# ${EN_SECTION_ABOUT}”.`,
    );
  const sectionsMd: Record<string, string> = {};
  for (const [heading, md] of Object.entries(raw.sectionsMd)) {
    const key = EN_SECTIONS[heading];
    if (key) sectionsMd[key] = md;
    else
      warnings.push(
        `sekcja „# ${heading}” nie jest używana. Dozwolone: „# ${EN_SECTION_ABOUT}”, „# ${EN_SECTION_PRIVACY}”.`,
      );
  }
  const parsed = translationSchema.safeParse(raw.frontmatter);
  if (!parsed.success)
    return {
      ok: false,
      errors: parsed.error.issues.map(describeIssue),
      warnings,
    };
  const check = checkTranslation(base, parsed.data, sectionsMd);
  warnings.push(...check.warnings);
  if (check.errors.length) return { ok: false, errors: check.errors, warnings };
  const sections: Record<string, string> = {};
  for (const [key, md] of Object.entries(sectionsMd))
    sections[key] = renderSafeMarkdown(md);
  return {
    ok: true,
    data: mergeTranslation(base, parsed.data),
    sections,
    warnings,
  };
}

export interface LocalizedSite extends Site {
  locale: Locale;
  /** Dane z site.md (np. polskie tytuły oferty do doboru ikon). */
  base: SiteData;
}

/** Dla strony: treść w danym języku; błąd buildu, jeśli tłumaczenie jest niepoprawne. */
export function loadLocalizedSite(
  locale: Locale,
  siteFile = siteFilePath(),
): LocalizedSite {
  const site = loadSite(siteFile);
  if (locale === "pl") return { ...site, locale, base: site.data };
  const res = parseTranslation(site.data, siteFile);
  if (!res.ok)
    throw new Error(
      `Plik ${translationFilePath(siteFile)} zawiera błędy. Uruchom „npm run site:validate”, aby zobaczyć szczegóły po polsku.`,
    );
  return {
    data: res.data,
    sections: res.sections,
    file: siteFile,
    imagesDir: site.imagesDir,
    locale,
    base: site.data,
  };
}

/** Adresy stron w każdym języku. */
export const PATHS = {
  home: { pl: "/", en: "/en/" },
  privacy: { pl: "/polityka-prywatnosci/", en: "/en/privacy-policy/" },
  thanks: { pl: "/dziekuje/", en: "/en/thank-you/" },
} as const satisfies Record<string, Record<Locale, string>>;
export type PageKey = keyof typeof PATHS;

/** Teksty interfejsu (poza treścią z site.md). */
export const UI = {
  pl: {
    languageName: "Polski",
    switchTo: "Polska wersja strony",
    languageMenu: "Wybór języka",
    skip: "Przejdź do treści",
    mainMenu: "Menu główne",
    nav: {
      about: "O mnie",
      offer: "Oferta",
      products: "Produkty",
      workshops: "Warsztaty",
      testimonials: "Opinie",
      contact: "Kontakt",
    },
    eyebrow: "Dane · Chmura · AI",
    seeOffer: "Zobacz ofertę",
    previewLabel: "PODGLĄD",
    previewText: "ta wersja nie jest jeszcze opublikowana",
    previewChange: "zmiana",
    privacy: "Polityka prywatności",
    designCredit: "Projekt na bazie",
    adaptation: "adaptacja",
    contactNote: "Najszybciej odpowiem na e-mail.",
    writeEmail: "Napisz e-mail",
    website: "Strona",
    formName: "Imię",
    formEmail: "E-mail",
    formMessage: "Wiadomość",
    formSubmit: "Wyślij wiadomość",
    formSubject: "Wiadomość ze strony",
    formConsent:
      "Wysyłając wiadomość, zgadzasz się na jej przetworzenie w celu odpowiedzi.",
    buyQuestion: "Chcesz kupić lub zamówić?",
    writeToMe: "Napisz do mnie",
    signUp: "Zapisz się",
    timePrefix: "godz.",
    noEvents: "Brak nadchodzących terminów. Zajrzyj wkrótce.",
    noEventsContact: "Napisz, żeby dostać informację o kolejnych.",
    thanksTitle: "Dziękuję za wiadomość",
    thanksText: "Wiadomość dotarła. Odpowiem najszybciej, jak to możliwe.",
    backHome: "Wróć na stronę główną",
    intl: "pl-PL",
    ogLocale: "pl_PL",
  },
  en: {
    languageName: "English",
    switchTo: "English version of the site",
    languageMenu: "Language",
    skip: "Skip to content",
    mainMenu: "Main menu",
    nav: {
      about: "About me",
      offer: "Services",
      products: "Products",
      workshops: "Workshops",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    eyebrow: "Data · Cloud · AI",
    seeOffer: "See services",
    previewLabel: "PREVIEW",
    previewText: "this version is not published yet",
    previewChange: "change",
    privacy: "Privacy policy",
    designCredit: "Design based on",
    adaptation: "adaptation",
    contactNote: "Email is the fastest way to reach me.",
    writeEmail: "Send an email",
    website: "Website",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send message",
    formSubject: "Message from the website",
    formConsent:
      "By sending a message, you agree to it being processed so that I can reply.",
    buyQuestion: "Would you like to buy or order?",
    writeToMe: "Write to me",
    signUp: "Sign up",
    timePrefix: "at",
    noEvents: "No upcoming dates. Check back soon.",
    noEventsContact: "Write to me to hear about the next ones.",
    thanksTitle: "Thank you for your message",
    thanksText: "Your message has arrived. I will reply as soon as I can.",
    backHome: "Back to the home page",
    intl: "en-GB",
    ogLocale: "en_GB",
  },
} as const;
export type UiText = (typeof UI)[Locale];
