/**
 * Wczytuje site.md: YAML (dane) + sekcje Markdown (długie teksty).
 * Używane i przez stronę (Astro), i przez walidator. Bez importów z Astro.
 */
import fs from "node:fs";
import path from "node:path";
import { readContent } from "./content";
import { renderSafeMarkdown } from "./safe-html";
import { siteSchema, type SiteData, type Workshop } from "./site-schema";
import type { $ZodIssue as ZodIssue } from "zod/v4/core";

/** Plik z treścią. Domyślnie site.md; demo: SITE_FILE=examples/demo/site.md */
export function siteFilePath(): string {
  return process.env.SITE_FILE || "site.md";
}

/** Folder ze zdjęciami leży zawsze obok site.md. */
export function imagesDir(siteFile = siteFilePath()): string {
  return path.join(path.dirname(siteFile), "zdjecia");
}

export interface RawSite {
  file: string;
  frontmatter: Record<string, unknown>;
  /** nagłówek "# X" -> surowy Markdown */
  sectionsMd: Record<string, string>;
  /** Markdown przed pierwszym nagłówkiem (powinien być pusty) */
  preamble: string;
}

export function readRawSite(file = siteFilePath()): RawSite {
  const source = fs.readFileSync(file, "utf8");
  const parsed = readContent(source);
  const sectionsMd: Record<string, string> = {};
  const parts = parsed.content.split(/^#\s+(.+?)\s*$/m);
  const preamble = (parts[0] ?? "").trim();
  for (let i = 1; i < parts.length; i += 2) {
    const heading = (parts[i] ?? "").trim();
    sectionsMd[heading] = (parts[i + 1] ?? "").trim();
  }
  return {
    file,
    frontmatter: (parsed.data ?? {}) as Record<string, unknown>,
    sectionsMd,
    preamble,
  };
}

export type ParseResult =
  | { ok: true; raw: RawSite; data: SiteData }
  | { ok: false; raw: RawSite; issues: ZodIssue[] };

export function parseSite(file = siteFilePath()): ParseResult {
  const raw = readRawSite(file);
  const result = siteSchema.safeParse(raw.frontmatter);
  if (!result.success) return { ok: false, raw, issues: result.error.issues };
  return { ok: true, raw, data: result.data };
}

export interface Site {
  data: SiteData;
  /** nagłówek -> HTML */
  sections: Record<string, string>;
  file: string;
  imagesDir: string;
}

/** Dla strony: wczytaj i przerwij build czytelnym błędem, jeśli coś jest nie tak. */
export function loadSite(file = siteFilePath()): Site {
  const res = parseSite(file);
  if (!res.ok) {
    throw new Error(
      `Plik ${file} zawiera błędy. Uruchom „npm run site:validate”, aby zobaczyć szczegóły po polsku.`,
    );
  }
  const sections: Record<string, string> = {};
  for (const [heading, md] of Object.entries(res.raw.sectionsMd)) {
    sections[heading] = renderSafeMarkdown(md);
  }
  return { data: res.data, sections, file, imagesDir: imagesDir(file) };
}

/** Dzisiejsza data w Polsce jako RRRR-MM-DD. */
export function todayInPoland(now = new Date()): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(
    now,
  );
}

/** Nadchodzące warsztaty (dziś i później), posortowane od najbliższego. */
export function upcomingWorkshops(
  data: SiteData,
  today = todayInPoland(),
): Workshop[] {
  return data.workshops
    .filter((w) => w.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Adres podglądu Cloudflare Pages dla gałęzi (taki sam algorytm jak Cloudflare). */
export function previewUrl(branch: string, project: string): string {
  const alias = branch
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 28)
    .replace(/-$/, "");
  return `https://${alias}.${project}.pages.dev`;
}
