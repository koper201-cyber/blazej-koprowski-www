# Naprawa przepływu telefonu

- Stan: zakończony etap przygotowania; pełne uruchomienie czeka na zgodę na scalenie.
- Issue: #10, https://github.com/koper201-cyber/blazej-koprowski-www/issues/10.
- Specyfikacja: [telefon, podgląd, decyzja](../specs/2026-10-28-telefon-podglad-decyzja.md).
- Gałąź: codex/telefon-podglad-decyzja, na bazie PR #9.

## Potwierdzone przed zmianami

- Test właściciela przeprowadzony w rozmowie konfigurującej środowisko, z main bez zaakceptowanych instrukcji PR #9.
- Zmiana przycisku na gałęzi przycisk-wkrotce, commit f57b4d9, została wysłana; gh api zwróciło Forbidden.
- Cloudflare utworzył rzeczywisty podgląd https://019fce7f.blazej-koprowski.pages.dev/ z napisem „Porozmawiajmy wkrótce”, lecz agent go nie podał.
- Panel pokazuje wyłączony ogólny internet, włączony preset rejestrów pakietów i brak dodatkowych domen. Potrzeba sprawdzić ograniczony dostęp do api.github.com, nie otwierać całego internetu.
- Main pozostaje na 253454e. Nie scalono PR ani nie opublikowano testowej zmiany.

## Zmiany i weryfikacja

- Właściciel zatwierdził trzy domeny. Zapisano szkic i opublikowano prywatne środowisko; panel potwierdził „Opublikowano”. Nie dodano sekretów ani ogólnego dostępu do internetu.
- Rzeczywisty test z chmury: gh api zwróciło koper201-cyber/blazej-koprowski-www; curl potwierdził HTTP 200 i „Porozmawiajmy wkrótce” w podglądzie. Produkcja HTTP 200 ze starym przyciskiem. Python dostał 403, dlatego odnotowano użytego klienta, zamiast uznać całą stronę za niedostępną.
- Przed publikacją migawki checkout przywrócono na main 253454e, zachowując lokalną i zdalną gałąź testową f57b4d9 oraz niezatwierdzony package-lock.json.
- AGENTS.md: issue/PR w tle, rzeczywisty Preview URL z checka tego SHA, sprawdzony podgląd, decyzja odnosząca się do wersji, blokady scalania i kontrola produkcji. OWNER_GUIDE.md nie wymaga już ręcznego Create PR/Merge. CLAUDE.md nadal wczytuje @AGENTS.md.
- README.md: usunięto błędną poradę o wystarczającej instalacji pakietów przy wyłączonym internecie, opisano trzy domeny i test przed publikacją środowiska. Skrót procesu i docs/SPEC.md uzgodniono z sekcją 11; reguły szczegółowe pozostają w AGENTS.md.
- Odczyt API check-runs f57b4d9 potwierdził nazwę aplikacji cloudflare-workers-and-pages i obecność immutable Preview URL w output.summary.
- npm run site:validate: kod 0. npm run build: kod 0, łącznie z kontrolą linków i budżetów. Pozostały znane dwa pola do uzupełnienia; nie zmieniano danych właściciela.
- Prettier dla zmienionych dokumentów: po formatowaniu AGENTS.md kod 0. git diff --check: kod 0. Brak zmian kodu lub wyglądu, więc nie dodawano testów jednostkowych ani nie powtarzano całego zestawu przeglądarek.

## Ograniczenia

- Z chmury zapisano komentarz do istniejącego issue #10: https://github.com/koper201-cyber/blazej-koprowski-www/issues/10#issuecomment-6463812923 oraz utworzono PR #11: https://github.com/koper201-cyber/blazej-koprowski-www/pull/11 (main ← przycisk-wkrotce, f57b4d9148c7ca32a5eb273f2e4d3628b7c5e73f). Ponowna walidacja i build przeszły. PR ma autoMergeRequest null; Cloudflare success, nowe CI rozpoczęło pracę. Nie testowano tworzenia nowego issue, tylko zapis do istniejącego; brak duplikowania zgłoszenia.
- CI PR #11 następnie zakończyło się powodzeniem (Sprawdzenie strony i Cloudflare). Naprawa jest w PR #12: https://github.com/koper201-cyber/blazej-koprowski-www/pull/12, baza PR #9; bez Closes #10. Nie scalono żadnej propozycji.
- Instrukcje wymagają scalenia istniejącego stosu PR, by obowiązywać nowe rozmowy na main. Obowiązuje zakaz scalania właściciela; nie wykonano publikacji produkcyjnej ani testu odrzucenia. Specyfikacja pozostaje aktywna, issue #10 nie jest zamykane.
