# Ochrona edytora treści

- Stan: wzorzec przygotowany i przetestowany lokalnie; aktywacja blokady wymaga docelowego repo, osobnych uprawnień oraz ustawień GitHuba.
- Issue #38; specyfikacja ../specs/2026-10-29-edytor-tresci.md.
- Użytkownik potwierdził brak repo/konta Agnieszki. Przygotowujemy wzorzec tutaj, bez nadawania dostępu.
- API repo potwierdziło public=true (private=false), uprawnienia deklarowane admin; API branch protection zwraca 403 Resource not accessible by integration. Nie zweryfikowano ani nie zmieniono aktywnej ochrony.
- PR #37 z szybkim podglądem pozostaje osobny. Ten PR startuje od main; nie scala wcześniejszych propozycji.
- Dodano role w AGENTS/CLAUDE/OWNER_GUIDE, wyjątek logów treści poza .ai, CODEOWNERS, politykę kont administratorów, zaufany workflow pull_request_target i kontrolę ścieżek/trybów/protected YAML. Nie zmieniano site.md, wyglądu, zależności lub hostingu.
- Kontrola odczytuje politykę i kod wyłącznie z bazy; pobiera obiekty head bez checkout i wykonania. Zapis statusu na aktualnym head SHA, porównanie base main bieżącego repo, obsługa edycji bazy PR. Autor i actor muszą być administratorami dla zmian technicznych.
- 7 testów kontroli: treść/obrazy, chronione ścieżki, ustawienia/parsing YAML, symlinki/submoduły/rename, deklaracje tożsamości i brak danych oraz integracja CLI z lokalnym repo Git i atrapą API. Sukces 7/7; integracja potwierdza status pending→success/failure na head i pozostanie checkoutu na bazie. To nie jest test prawdziwych uprawnień GitHub.
- npm run verify: sukces (format, lint, typy 34 pliki bez błędów, 11 testów logiki, site:validate/build, linki/CSP/budżety). Pierwsze oddzielne check zatrzymało się na katalogu telemetrii poza sandboxem; po ASTRO_TELEMETRY_DISABLED=1 pełne verify przeszło. Znane ostrzeżenie treści o dwóch miejscach bez zmian.
- Przegląd bezpieczeństwa: rola nie pochodzi z czatu/etykiety; nie wykonywać kodu PR z tokenem; CODEOWNERS i wymagany status trzeba aktywować, świeża baza i unieważnianie reviews po push. Opisano brak drugiego code ownera dla własnych technicznych PR oraz ryzyko podrobienia statusu przez inny workflow, jeśli edytor otrzyma nadmierne uprawnienia. Bez ograniczenia workflow/statusów — wyłącznie propozycje edytora, publikacja przez admina.
- Specyfikacja pozostaje aktywna: test odbioru prawdziwym kontem i konfiguracją repo Agnieszki niewykonany. Brak poświadczeń/uprawnień nie jest obchodzony. Nie deklarować twardej ochrony na podstawie lokalnych testów.
