# Wersja angielska z przełącznikiem flag

- Stan: zakończony.
- Data: 2026-11-26, Europe/Warsaw.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/52
- Specyfikacja: [wersja angielska](../specs/implemented/2026-11-26-wersja-angielska.md)

## Plan

1. `src/lib/i18n.ts`: słownik, ścieżki, wczytanie i scalenie `site.en.md`, kontrola spójności.
2. Strona główna jako komponent z parametrem języka; trasy `/en/`.
3. Base/Contact/stopka/404 z tłumaczeniami, hreflang, przełącznik flag + CSS.
4. Walidator, testy jednostkowe i przeglądarkowe, dokumentacja (AGENTS.md, OWNER_GUIDE.md, README.md).
5. `site.en.md` — tłumaczenie obecnej treści.

## Ograniczenia

- Lokalnie brak dostępu do rejestru npm — format, lint, typy, testy i build wykonuje CI; podgląd z Cloudflare.

## Wynik

- PR #53, wersja `a80982e583d0fc847be564a1a05814a7542410e0`; podgląd https://f4b87256.blazej-koprowski.pages.dev (oraz `/en/`).
- Lokalnie: kontrola składni TS i frontmatter Astro, zgodność struktury `site.en.md` z `site.md` (5 pozycji oferty, sekcje About me / Privacy policy), `git diff --check`.
- CI dla tego SHA: Sprawdzenie strony (format, lint, typy, testy, walidacja, build), 4× Przeglądarka (w tym nowy test flag z axe i reflow 320 px) i Cloudflare Pages — wszystkie zielone.
- Przegląd podglądu w przeglądarce: 1280 px, 390 px, 320 px; flagi w prawym górnym rogu, brak przewijania w bok; przełączanie PL ↔ EN na stronie głównej i polityce prywatności; `lang`, `hreflang`, menu i CTA w obrębie języka.
- Właściciel: „Zatwierdzam zmiany”. Scalono z kontrolą SHA → `2f33996844afc57cc2ef13b01c84f35991963ac2`.
