# Wdrożenie issue #8

- Stan: zakończony — implementacja i weryfikacja gotowe do przeglądu; aktywacja na main wymaga akceptacji właściciela.
- Cel: obowiązkowe user story i issue przed wdrożeniem zmiany zgłoszonej z telefonu.
- Specyfikacja: [user story z telefonu](../specs/implemented/2026-10-28-user-story-z-telefonu.md).
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/8.
- Gałąź: codex/issue-8-user-story, oparta na codex/wdrozenie-standardow (PR #7), aby zachować istniejące instrukcje i narzędzia bez ich powielania.

## Plan

1. Uzupełnić instrukcje agentów i właściciela oraz formularz issue.
2. Sprawdzić scenariusze przyjęcia zgłoszenia i składnię formularza.
3. Wykonać walidację i build, przejrzeć różnice, dostarczyć PR powiązany z #8. Nie scalać.

## Wyniki

- Dodano sekcję 10 w AGENTS.md, odwołanie w CLAUDE.md, formularz issue z dwoma wymaganymi polami i wyłączeniem pustych zgłoszeń oraz spójne instrukcje w OWNER_GUIDE.md, README.md i docs/SPEC.md. Bez zmian treści strony, kodu aplikacji i zależności.
- Przegląd instrukcji: gotowa user story nie wymaga ponownego dopytywania; jawne zlecenie wdrożenia w pierwotnej prośbie nie wymaga drugiej zgody. Reużycie issue i brak dostępu do GitHub opisane wprost.
- Sprawdzono składnię YAML według oficjalnej dokumentacji GitHub oraz parserem js-yaml: wymagane metadane formularza, tablica pól, unikalne identyfikatory i etykiety, wymagane user-story i acceptance-criteria, brak domyślnych odpowiedzi, blank_issues_enabled=false. Import @AGENTS.md w CLAUDE.md potwierdzony.
- npm run site:validate: kod 0, jedno istniejące ostrzeżenie o dwóch miejscach do uzupełnienia. Pierwszą próbę blokował sandbox (IPC tsx); po zatwierdzonym uruchomieniu poza nim polecenie przeszło.
- npm run build: kod 0, cztery strony, budżety zasobów, CSP i kontrola linków poprawne. Logi: /tmp/issue-8-validate.log, /tmp/issue-8-build.log.
- Przejrzano różnice i numerację kroków instrukcji właściciela; stare odwołanie do kroku podglądu poprawione na 5.
- npm run format:check oraz git diff --check: poprawnie. Nowe pliki specyfikacji, logu i wniosków sprawdzono także poza standardowym wykluczeniem .ai z formatowania.

## Przegląd scenariuszy przyjęcia zgłoszenia

To kontrola decyzyjna reguł i przykładów, bez uruchamiania osobnego modelu i bez tworzenia fikcyjnych issue w repozytorium.

1. Potoczna, kompletna prośba: „Jestem właścicielem strony, zapisz na potem: chcę przycisk do oferty, żeby odwiedzający łatwo ją znaleźli”. Wynik: AI redaguje „Jako właściciel strony, chcę przycisk prowadzący do oferty, aby odwiedzający łatwo ją znaleźli”, dopisuje sprawdzalne kryteria celu odnośnika i tworzy issue. Brak wdrożenia, ponieważ właściciel prosi wyłącznie o zapis.
2. Gotowa user story: „Jako odwiedzający chcę przejść z menu do oferty, aby szybko znaleźć usługi”. Wynik: zachować rolę, potrzebę i korzyść, ustalić konkretne kryteria nawigacji, zapisać issue; bez pytania o informacje już podane.
3. Brak celu: „Zmień kolor przycisku na zielony”. Wynik: zapytać „Jaki ma być efekt tej zmiany?”, bez wymyślania korzyści, tworzenia niepełnego issue lub edycji strony.
4. Istniejące issue: „Wdrażaj issue #8”. Wynik: przeczytać istniejącą user story i kryteria, wykorzystać #8 bez duplikatu i wykonać już zleconą implementację przez PR.
5. Brak uprawnień GitHub: przygotować jawnie niezapisany szkic, poprosić o udostępnienie repo lub ręczne zapisanie. Bez fikcyjnego linku i bez wdrożenia przed utworzeniem issue.
6. Kompletna potrzeba z wyraźną prośbą o wdrożenie: po zapisaniu issue przejść do implementacji, bez dodatkowej rundy zgody. Nie interpretować samego „zapisz na potem” jako takiej prośby.

## Ograniczenia i aktywacja

- Formularz będzie dostępny z main po akceptacji PR. Nie testowano jego opublikowanego interfejsu na GitHub ani fizycznego telefonu przed Merge. API/CLI mogą ominąć formularz; obowiązują je instrukcje AGENTS.md, nie dodano automatu walidującego cudze issue.
- Zapisana wcześniej instrukcja uruchamiania środowiska Codex już nakazuje czytać AGENTS.md. Nie powielono w niej nowego regulaminu. Po scaleniu repozytorium należy korzystać z aktualnego checkoutu w nowym zadaniu; wcześniejsze rozmowy mogą mieć stare instrukcje.
- PR jest oparty na #7 i nie może być samodzielnie scalony przez agenta. Specyfikację przeniesiono do implemented jako repozytoryjne wdrożenie procesu, nie jako deklarację odbioru fizycznego telefonu.
