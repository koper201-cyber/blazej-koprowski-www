import type { APIRoute } from "astro";
import { isPreview } from "../lib/env";

// Podglądy (gałęzie inne niż main) nie powinny trafić do Google.
export const GET: APIRoute = ({ site }) => {
  const body = isPreview
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
