/**
 * Zamienia nazwę pliku z site.md (np. "mandala.jpg") na obraz do optymalizacji przez Astro.
 * Szuka w folderze zdjecia/ obok site.md oraz w generated-images/ (zdjęcia HEIC po konwersji).
 */
import type { ImageMetadata } from "astro";
import path from "node:path";

const all = import.meta.glob<{ default: ImageMetadata }>(
  [
    "/zdjecia/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    "/examples/*/zdjecia/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
    "/generated-images/**/*.jpg",
  ],
  { eager: true },
);

export function resolveImage(
  imagesDir: string,
  name: string | undefined,
): ImageMetadata | undefined {
  if (!name) return undefined;
  const dir =
    "/" +
    imagesDir
      .split(path.sep)
      .join("/")
      .replace(/^\.?\//, "");
  let key = `${dir}/${name}`;
  if (/\.(heic|heif)$/i.test(name)) {
    key = `/generated-images${dir}/${name.replace(/\.(heic|heif)$/i, "")}.jpg`;
  }
  const mod = all[key];
  if (!mod) {
    throw new Error(
      `Nie znaleziono zdjęcia „${name}” (${key}). Uruchom „npm run site:validate”.`,
    );
  }
  return mod.default;
}
