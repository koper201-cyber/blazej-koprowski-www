# User story dla zgłoszeń z telefonu

- Status: zrealizowane i zweryfikowane w gałęzi; aktywacja na main po akceptacji PR przez właściciela.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/8.
- User story: jako użytkownik zgłaszający zmiany strony przez telefon chcę, aby AI redagowało moje zgłoszenie własnymi słowami jako user story i zapisywało je w GitHub Issue, abym miał jasny opis potrzeby i oczekiwanego efektu przed wdrożeniem.

## Zakres i plan

1. W AGENTS.md opisać obowiązkowy przepływ: ustalenie roli, potrzeby i korzyści → issue → wdrożenie, jeśli zlecone → PR. CLAUDE.md nadal importuje @AGENTS.md, bez kopii reguł.
2. Dodać formularz GitHub z wymaganymi polami user story i kryteriów akceptacji; uaktualnić instrukcję właściciela, README i opis procesu w specyfikacji produktu.
3. Sprawdzić trzy scenariusze z issue, przypadek istniejącego issue i brak dostępu do GitHub. Zweryfikować YAML formularza, linki i wymagane polecenia projektu.

## Wymagania i kryteria akceptacji

- AI redaguje potoczne lub dyktowane zgłoszenie jako „Jako [rola], chcę [potrzeba], aby [korzyść]”. Korzysta z informacji ustalonych w rozmowie, nie wymyśla celu.
- Nieustalona user story blokuje utworzenie issue i implementację. AI pyta prostym językiem o brakujące elementy i samo redaguje odpowiedź; nie żąda od właściciela znajomości szablonu.
- Gotowej, kompletnej user story nie trzeba podawać ponownie.
- Issue zawiera user story i sprawdzalne kryteria akceptacji; użytkownik dostaje rzeczywisty link. Bez dostępu do GitHub powstaje wyłącznie szkic, wyraźnie oznaczony jako niezapisany.
- Wskazane istniejące issue jest używane ponownie; poprawki w jego zakresie nie tworzą duplikatów. Nowa potrzeba wymaga osobnej user story i issue.
- Samo utworzenie issue nie zleca wdrożenia. Prośba o wdrożenie może być zawarta w pierwotnym zgłoszeniu lub brzmieć „wdrażaj issue #…”. Nie wymaga ponownego potwierdzenia; nigdy nie upoważnia do samodzielnego Merge.
- Formularz wymaga user story oraz kryteriów; tworzenie pustych issue z pominięciem formularza w interfejsie jest wyłączone przez config.yml. Reguły dla AI pozostają w AGENTS.md i są wczytywane przez CLAUDE.md oraz instrukcję uruchamiania opublikowanego środowiska Codex.

## Weryfikacja i granice

Przegląd scenariuszy opisany w logu jest kontrolą instrukcji i przykładów, nie testem modelu ani fizycznego telefonu. Formularz ogranicza puste zgłoszenia w interfejsie GitHub, ale nie blokuje tworzenia issue przez API bez szablonu; agent ma stosować instrukcje również wtedy. Nie dodajemy workflow z szerszymi uprawnieniami ani backendu. Nowe instrukcje repo zaczną obowiązywać na main po akceptacji PR przez właściciela.
