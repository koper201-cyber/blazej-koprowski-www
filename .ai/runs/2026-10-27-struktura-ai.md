# Struktura dokumentacji AI

- Data rozpoczęcia: 2026-10-27 (Europe/Warsaw).
- Stan: zakończony.
- Cel: dodać brakującą strukturę `.ai/` i obowiązkowe instrukcje jej używania, zachowując istniejące pliki i zasady.
- Specyfikacja: nie dotyczy — zmiana dokumentacyjna.

## Zmiany

- Uzupełniono istniejące `AGENTS.md` i `CLAUDE.md`.
- Utworzono `.ai/specs/`, `implemented/`, `archive/`, `.ai/runs/`, `.ai/lessons.md` oraz `.ai/lessons/`.
- Puste katalogi zachowano w Git przez `.gitkeep`.
- Określono nazwy plików, cykl życia specyfikacji, zawartość logów i zasady zapisywania wniosków.

## Weryfikacja

- Kontrola struktury: wszystkie wymagane katalogi i pliki istnieją.
- `git diff --check`: bez błędów.
- `npm run site:validate`: poprawny wynik; istniejące ostrzeżenie o miejscach do uzupełnienia w `site.md`.
- `npm run build`: poprawny wynik, w tym kontrola linków w 4 plikach HTML.
- Polecenia npm wykonano z `ASTRO_TELEMETRY_DISABLED=1`.

## Wnioski i następne kroki

Brak nowych wniosków technicznych wymagających osobnej notatki. Zmiana nie obejmuje kodu strony ani treści `site.md`.
