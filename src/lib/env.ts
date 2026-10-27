/** Informacje o środowisku buildu (Cloudflare Pages ustawia CF_PAGES_BRANCH). */
const branch = process.env.CF_PAGES_BRANCH;
const productionBranch = process.env.PRODUCTION_BRANCH || "main";

/** true = to podgląd (gałąź inna niż main) — pokazujemy baner i blokujemy indeksowanie. */
export const isPreview = Boolean(branch) && branch !== productionBranch;
export const previewBranch = branch;
