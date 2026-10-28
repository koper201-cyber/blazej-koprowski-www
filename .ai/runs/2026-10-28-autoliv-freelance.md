# Autoliv — freelance

- Stan: w toku.
- Cel: dopisać freelance przy stanowisku Senior Data Engineer w Autoliv, bez zmiany pozostałej treści.
- Prosta zmiana treści; bez osobnej specyfikacji.
- Plan: issue, edycja site.md, walidacja i build, PR i sprawdzenie podglądu konkretnego SHA.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/14.
- Zmiana: „Senior Data Engineer — Autoliv, freelance (od 2022)”.
- Node 24.22.1; npm ci zakończone powodzeniem.
- npm run site:validate: kod 0, jedno istniejące ostrzeżenie o dwóch miejscach do uzupełnienia.
- npm run build: kod 0; 4 strony, linki i kotwice poprawne, budżety JS/CSS spełnione.
- Przegląd różnic: tylko żądana treść i ten log. Zmiana tekstu bez zmian wyglądu lub interakcji; brak testu na fizycznym telefonie.
- Podgląd oraz pełny SHA zostaną zapisane w opisie PR po wdrożeniu Cloudflare. Publikacja nie jest autoryzowana.
- Przed aktualizacją main zachowano wcześniejszy lokalny lockfile w /workspace/user-files-backup/package-lock-before-main-20261028.json. Main zawiera już śledzony lockfile.
