# Research stosu i standardów projektu

- Data: 2026-10-27 (Europe/Warsaw).
- Stan: zakończony.
- Cel: przygotować opartą na źródłach specyfikację stosu technologicznego, standardów inżynieryjnych i wzorców dopasowanych do statycznego startera stron.
- Specyfikacja: [tech-stack i standardy](../specs/2026-10-27-tech-stack-i-standardy.md).

## Plan

1. Porównać cel produktu, obecny kod i zasady repozytorium.
2. Sprawdzić oficjalną dokumentację technologii, testów, bezpieczeństwa, dostępności i hostingu.
3. Oddzielić decyzje architektoniczne od propozycji narzędzi i migracji wymagających osobnego wdrożenia.
4. Zapisać specyfikację z priorytetami, ryzykami, kryteriami akceptacji i źródłami.
5. Przejrzeć dokument, uruchomić wymagane kontrole i dostarczyć PR.

## Weryfikacja

- Przejrzano aktualny kod, specyfikację produktu, instrukcje i logi poprzednich prac.
- Research oparto na oficjalnej dokumentacji Astro, Node, npm, TypeScript, Zod, Cloudflare, GitHub, narzędzi testowych, W3C, OWASP i Google; odnośniki znajdują się przy decyzjach w specyfikacji.
- Rejestr npm potwierdził: Astro latest 7.4.2 (Node >=22.23.4), @astrojs/check 0.9.12 (TS ^5 lub ^6), TypeScript latest 7.0.2, Zod latest 4.6.7. Odczyt metadanych nie instalował pakietów.
- Utworzono specyfikację obejmującą 13 sekcji: decyzje, luki, wersje, architekturę, coding standards, bezpieczeństwo, dostępność/SEO/wydajność, testy/CI, hosting, SDD, plan wdrożenia, kryteria i ryzyka.
- Zapisano potwierdzony wniosek o zgodności wersji TypeScript i narzędzi oraz odnośnik w indeksie lessons.
- Kontrola nazwy, domknięcia bloków kodu i lokalnych linków w nowych dokumentach: poprawnie.
- `git diff --check`: bez błędów.
- `ASTRO_TELEMETRY_DISABLED=1 npm run site:validate`: poprawnie, z istniejącym ostrzeżeniem o miejscach do uzupełnienia.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: poprawnie; kontrola linków w 4 plikach HTML zakończona sukcesem.
- Nie sprawdzano rzeczywistego konta Cloudflare, produkcyjnych metryk, HEIC ani działania kontaktu. Ograniczenia jawnie opisano w specyfikacji.
- Nie zmieniono kodu, konfiguracji ani zależności. Przyszła implementacja wymaga osobnych zleceń; specyfikacja pozostaje aktywna.
- Osobna gałąź `codex/spec-tech-stack` bazuje na instrukcjach z nadal otwartego PR #4; PR ze specyfikacją ma tę gałąź instrukcji jako bazę, aby nie powielać poprzednich zmian.
