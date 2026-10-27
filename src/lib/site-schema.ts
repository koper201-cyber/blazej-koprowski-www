/**
 * Schemat pliku site.md (część YAML między liniami ---).
 * To jest jedyne źródło prawdy o tym, jakie pola są dozwolone.
 * Komunikaty błędów tłumaczy na polski scripts/validate-site.ts.
 */
import { z } from "zod";

/** Puste napisy "" traktujemy jak brak wartości. */
const optionalText = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().optional(),
);

const requiredText = z.string({ required_error: "brak wartości" }).trim().min(1, "pole jest puste");

/** Link http(s), mailto: lub kotwica (#sekcja) albo ścieżka (/strona/). */
const linkPattern = /^(https?:\/\/\S+|mailto:\S+|tel:\S+|#\S*|\/\S*)$/;
const optionalLink = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().regex(linkPattern, "niepoprawny link — użyj https://…, mailto:… albo #sekcja").optional(),
);
const requiredLink = z
  .string({ required_error: "brak linku" })
  .trim()
  .regex(linkPattern, "niepoprawny link — użyj https://…, mailto:… albo #sekcja");

/** Nazwa pliku z folderu zdjecia/ (bez ścieżki). */
const imageName = z
  .string()
  .trim()
  .regex(/^[^/\\]+\.(jpe?g|png|webp|avif|heic|heif)$/i, "to nie wygląda na nazwę pliku zdjęcia (np. mandala.jpg)");
const optionalImage = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  imageName.optional(),
);

/** Data RRRR-MM-DD. YAML zamienia ją na obiekt Date — wtedy też akceptujemy. */
const isoDate = z
  .union([z.date(), z.string()])
  .transform((v, ctx) => {
    if (v instanceof Date) {
      if (Number.isNaN(v.getTime())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "zła data — użyj formatu RRRR-MM-DD, np. 2027-02-14" });
        return z.NEVER;
      }
      return v.toISOString().slice(0, 10);
    }
    const s = v.trim();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    const d = m ? new Date(`${s}T00:00:00Z`) : null;
    if (!m || !d || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `zła data «${s}» — użyj formatu RRRR-MM-DD, np. 2027-02-14`,
      });
      return z.NEVER;
    }
    return s;
  });

const price = z
  .number({ invalid_type_error: "cena musi być samą liczbą (np. 300), bez „zł” i „PLN”", required_error: "brak ceny" })
  .nonnegative("cena nie może być ujemna");

export const productStatuses = ["dostępna", "sprzedana", "na zamówienie"] as const;

export const siteSchema = z
  .object({
    site: z
      .object({
        name: requiredText,
        type: z.enum(["Person", "LocalBusiness"]).default("Person"),
        domain: optionalText.refine(
          (v) => v === undefined || /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(v),
          "podaj samą domenę, np. example.pl (bez https://)",
        ),
        pages_project: optionalText.refine(
          (v) => v === undefined || /^[a-z0-9-]+$/.test(v),
          "nazwa projektu Cloudflare: małe litery, cyfry i myślniki",
        ),
        language: z.string().default("pl"),
        theme: z.enum(["natural-warm"]).default("natural-warm"),
        primary_color: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/, "kolor w formacie #RRGGBB, np. #8A6C63")
          .default("#8A6C63"),
        city: optionalText,
        logo: optionalImage,
      })
      .strict(),
    seo: z
      .object({
        title: requiredText,
        description: requiredText,
        image: optionalImage,
      })
      .strict(),
    contact: z
      .object({
        email: z.string({ required_error: "brak adresu e-mail" }).trim().email("niepoprawny adres e-mail"),
        phone: optionalText,
        address: optionalText,
        form_key: optionalText,
        instagram: optionalLink,
        facebook: optionalLink,
        linkedin: optionalLink,
        github: optionalLink,
        website: optionalLink,
      })
      .strict(),
    hero: z
      .object({
        heading: requiredText,
        text: optionalText,
        cta_label: optionalText,
        cta_link: optionalLink,
        image: optionalImage,
        alt: optionalText,
      })
      .strict(),
    features: z
      .object({
        about: z.boolean().default(true),
        offer: z.boolean().default(true),
        products: z.boolean().default(false),
        workshops: z.boolean().default(false),
        testimonials: z.boolean().default(false),
        contact: z.boolean().default(true),
      })
      .strict()
      .default({}),
    offer: z
      .array(
        z
          .object({
            title: requiredText,
            text: optionalText,
            price: optionalText,
          })
          .strict(),
      )
      .default([]),
    products: z
      .array(
        z
          .object({
            name: requiredText,
            price,
            image: imageName,
            alt: optionalText,
            status: z.enum(productStatuses, {
              errorMap: () => ({ message: `status musi być jednym z: ${productStatuses.join(", ")}` }),
            }),
            description: optionalText,
          })
          .strict(),
      )
      .default([]),
    workshops: z
      .array(
        z
          .object({
            title: requiredText,
            date: isoDate,
            time: optionalText.refine(
              (v) => v === undefined || /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
              "godzina w formacie GG:MM, np. 18:00",
            ),
            place: requiredText,
            price: price.optional(),
            signup: requiredLink,
            image: optionalImage,
            alt: optionalText,
            description: optionalText,
          })
          .strict(),
      )
      .default([]),
    testimonials: z
      .array(
        z
          .object({
            author: requiredText,
            text: requiredText,
          })
          .strict(),
      )
      .default([]),
  })
  .strict();

export type SiteData = z.infer<typeof siteSchema>;
export type Product = SiteData["products"][number];
export type Workshop = SiteData["workshops"][number];

/** Stałe nagłówki sekcji Markdown (pod YAML-em). */
export const SECTION_ABOUT = "O mnie";
export const SECTION_PRIVACY = "Polityka prywatności";
export const KNOWN_SECTIONS = [SECTION_ABOUT, SECTION_PRIVACY] as const;

/** Polskie nazwy pól — do czytelnych komunikatów błędów. */
export const FIELD_LABELS: Record<string, string> = {
  site: "Ustawienia strony (site)",
  seo: "SEO (seo)",
  contact: "Kontakt (contact)",
  hero: "Nagłówek strony (hero)",
  features: "Włączone sekcje (features)",
  offer: "Oferta",
  products: "Produkt",
  workshops: "Warsztat",
  testimonials: "Opinia",
  name: "nazwa",
  title: "tytuł",
  price: "cena",
  image: "zdjęcie",
  date: "data",
  time: "godzina",
  place: "miejsce",
  signup: "link do zapisów",
  status: "status",
  email: "e-mail",
  heading: "nagłówek",
  description: "opis",
  text: "tekst",
  author: "autor",
  primary_color: "kolor główny",
  domain: "domena",
  cta_link: "link przycisku",
};
