# Edytor treści

Cel: oddzielić edycję strony od administracji projektu. Issue #38. Agnieszka nie ma jeszcze docelowego repo; nie nadajemy dostępu i nie obiecujemy aktywnej ochrony GitHub (odczyt ochrony: 403).

Plan: domyślna rola edytora w instrukcjach, wyjątek od repozytoryjnych logów dla tej roli, allowlista site.md i zdjęć, porównanie chronionych pól YAML, zaufany workflow pull_request_target bez wykonywania kodu PR, CODEOWNERS i instrukcja wymuszania kontroli. Techniczne zmiany tylko przez oddzielne uwierzytelnione konto administratora, nie przez potwierdzenie w czacie. Testy funkcji klasyfikacji i scenariuszy nadużyć.

Chronione: wszystkie inne ścieżki, symlinki i zmiany nazw spoza allowlisty; w site.md domena, projekt hostingu, motyw, typ/język i form_key. Treści, oferta, zdjęcia, SEO i widoczność sekcji pozostają edytowalne. Zdjęcia wyłącznie formaty rastrowe/HEIC, bez SVG/HTML/skryptów. Brak sekretów w logach.

Tożsamość pochodzi z eventu GitHub, polityka i skrypt z bazy PR; PR nie może sam wskazać listy administratorów. Wymagany status na aktualnym head SHA oraz ochrona gałęzi i code-owner review blokują obejście. Nie współdzielić konta/tokenu admina. Administrator będący autorem PR nie może sam sobie udzielić code-owner review — potrzeba drugiego zaufanego administratora przy takiej konfiguracji. CODEOWNERS bez ustawień nie jest blokadą.

Walidacja: testy pozytywne treści/zdjęć, negatywne kodu, instrukcji, ustawień, symlinków, rename i braku danych; przegląd workflow pod kątem braku checkout/wykonania head. Format/lint i istniejące CI. Aktywację i test rzeczywistym kontem edytora wykonać po utworzeniu osobnego repo; do tego status nieaktywny.
