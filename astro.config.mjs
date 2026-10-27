// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import matter from "gray-matter";

// Adres strony bierzemy z site.md (site.domain), a gdy go brak — z projektu Cloudflare.
const siteFile = process.env.SITE_FILE || "site.md";
const { data } = matter(fs.readFileSync(siteFile, "utf8"));
const domain = data?.site?.domain;
const project = data?.site?.pages_project;
const siteUrl = domain ? `https://${domain}` : project ? `https://${project}.pages.dev` : "https://example.com";

export default defineConfig({
  site: siteUrl,
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [sitemap({ filter: (page) => !page.includes("/dziekuje") })],
  vite: {
    // Zmiana site.md / zdjęć w trybie dev przeładowuje stronę.
    server: { watch: { ignored: ["**/generated-images/**"] } },
  },
});
