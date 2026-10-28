/**
 * Przygotowanie zdjęć przed buildem.
 * Zdjęcia HEIC/HEIF (iPhone) konwertuje do JPG w folderze generated-images/
 * (ignorowany przez git). Oryginał zostaje w zdjecia/ bez zmian.
 * Pozostałe formaty (JPG, PNG, WebP, AVIF) Astro optymalizuje samo.
 */
import fs from "node:fs";
import path from "node:path";
import convert from "heic-convert";
import { imagesDir, siteFilePath } from "../src/lib/load-site";

export const GENERATED_ROOT = "generated-images";

export function generatedPathFor(srcDir: string, fileName: string): string {
  const base = fileName.replace(/\.(heic|heif)$/i, "");
  return path.join(GENERATED_ROOT, srcDir, `${base}.jpg`);
}

export async function prepareImages(
  dir = imagesDir(siteFilePath()),
): Promise<void> {
  if (!fs.existsSync(dir)) {
    console.log(`Brak folderu ${dir} — pomijam przygotowanie zdjęć.`);
    return;
  }
  const heics = fs.readdirSync(dir).filter((f) => /\.(heic|heif)$/i.test(f));
  let converted = 0;
  for (const f of heics) {
    const src = path.join(dir, f);
    const out = generatedPathFor(dir, f);
    const stat = fs.lstatSync(src);
    if (
      !stat.isFile() ||
      stat.isSymbolicLink() ||
      stat.size > 15 * 1024 * 1024
    ) {
      throw new Error(`Zdjęcie ${f}: wymagany zwykły plik do 15 MB.`);
    }
    if (
      fs.existsSync(out) &&
      fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs
    )
      continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    try {
      const jpg = await convert({
        buffer: fs.readFileSync(src),
        format: "JPEG",
        quality: 0.9,
      });
      fs.writeFileSync(out, Buffer.from(jpg));
      converted++;
    } catch (e) {
      console.error(
        `✖ Nie udało się przekonwertować ${src}: ${(e as Error).message}`,
      );
      process.exitCode = 1;
    }
  }
  console.log(
    heics.length
      ? `Zdjęcia HEIC: ${heics.length}, przekonwertowano teraz: ${converted}.`
      : "Brak zdjęć HEIC do konwersji.",
  );
}

// Uruchom tylko, gdy wywołano skrypt bezpośrednio (nie przy imporcie).
if (
  process.argv[1] &&
  path
    .resolve(process.argv[1])
    .endsWith(path.join("scripts", "prepare-images.ts"))
) {
  await prepareImages();
}
