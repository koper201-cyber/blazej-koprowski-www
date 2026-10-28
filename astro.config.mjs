// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import { readContent } from "./src/lib/content.ts";

// Adres strony bierzemy z site.md (site.domain), a gdy go brak — z projektu Cloudflare.
const siteFile = process.env.SITE_FILE || "site.md";
const { data } = readContent(fs.readFileSync(siteFile, "utf8"));
const settings = /** @type {{ domain?: string; pages_project?: string }} */ (
  data.site
);
const domain = settings?.domain;
const project = settings?.pages_project;
const siteUrl = domain
  ? `https://${domain}`
  : project
    ? `https://${project}.pages.dev`
    : "https://example.com";

export default defineConfig({
  site: siteUrl,
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [
    sitemap({
      filter: (page) =>
        ![/\/dziekuje(?:\/|$)/, /\/404(?:\.html|\/|$)/].some((pattern) =>
          pattern.test(page),
        ),
    }),
  ],
  vite: {
    // Zmiana site.md / zdjęć w trybie dev przeładowuje stronę.
    server: { watch: { ignored: ["**/generated-images/**"] } },
  },
});
