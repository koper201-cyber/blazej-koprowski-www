# Wersja angielska z przełącznikiem flag

- Stan: w toku.
- Data: 2026-11-26, Europe/Warsaw.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/52
- Specyfikacja: [wersja angielska](../specs/2026-11-26-wersja-angielska.md)

## Plan

1. `src/lib/i18n.ts`: słownik, ścieżki, wczytanie i scalenie `site.en.md`, kontrola spójności.
2. Strona główna jako komponent z parametrem języka; trasy `/en/`.
3. Base/Contact/stopka/404 z tłumaczeniami, hreflang, przełącznik flag + CSS.
4. Walidator, testy jednostkowe i przeglądarkowe, dokumentacja (AGENTS.md, OWNER_GUIDE.md, README.md).
5. `site.en.md` — tłumaczenie obecnej treści.

## Ograniczenia

- Lokalnie brak dostępu do rejestru npm — format, lint, typy, testy i build wykonuje CI; podgląd z Cloudflare.
