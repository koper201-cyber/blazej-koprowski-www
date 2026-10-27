# Wskazówki Borisa Cherny’ego w zasadach projektu

- Data rozpoczęcia: 2026-10-27 (Europe/Warsaw).
- Stan: zakończony.
- Cel: zwięźle uzupełnić zasady planowania, weryfikacji i uczenia się po poprawkach, bez powielania istniejących instrukcji.
- Źródło: https://ykdojo.github.io/claude-code-tips/content/boris-claude-code-tips
- Specyfikacja: nie dotyczy — zmiana dokumentacyjna.
- Plan: porównać wskazówki z instrukcjami, uzupełnić właściwe sekcje `AGENTS.md`, zachować import w `CLAUDE.md`, sprawdzić zmiany i uaktualnić otwarty PR #4.

## Zmiany i weryfikacja

- Sekcja 4 `AGENTS.md`: przegląd różnic, kontrole dopasowane do zmian, jawne wskazywanie niewykonanych kontroli.
- Sekcja 8: rozszerzono istniejący zapis wniosków o korekty właściciela i doprecyzowanie ogólnej zasady, gdy jej brakuje.
- Sekcja 9: planowanie złożonych zadań i zmiana planu po nowych faktach; diagnoza przyczyny błędu oraz weryfikacja poprawki.
- `CLAUDE.md`: zachowano `@AGENTS.md` i usunięto powtórzenie instrukcji utrzymywanych w pliku źródłowym.
- Wskazówki o równoległych sesjach, subagentach, analityce i konfiguracji terminala pominięto jako niepotrzebne w tej zmianie w statycznej stronie.
- `git diff --check`: bez błędów; przejrzano różnice i potwierdzono import `@AGENTS.md`.
- `ASTRO_TELEMETRY_DISABLED=1 npm run site:validate`: poprawnie, z wcześniejszym ostrzeżeniem o miejscach do uzupełnienia w `site.md`.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: poprawnie, w tym kontrola linków w 4 plikach HTML.
- Nie zmieniono kodu ani wyglądu strony; sprawdzenie typów i przeglądarki nie było potrzebne.
