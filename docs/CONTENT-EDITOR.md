# Edytor treści — aktywacja

## Obecny stan

Wzorzec dla przyszłej strony Agnieszki. Nie ma jeszcze jej repozytorium ani skonfigurowanego konta. Nie nadano dostępu. Odczyt ochrony main zwrócił 403 `Resource not accessible by integration`; ustawień ochrony nie zweryfikowano i nie zmieniono. **Nie nazywać blokady aktywną**, dopóki administrator nie spełni poniższych warunków.

## Włączenie w docelowym repozytorium

1. Osobne repo strony i konto/środowisko edytora. Nigdy nie udostępniaj Agnieszce tokenu, sesji lub proxy administratora. Gdy agent obu osób zapisuje zmiany jako administrator, GitHub nie odróżni osób w czacie.
2. W `.github/content-edit-policy.json` oraz `.github/CODEOWNERS` ustaw rzeczywiste konta administratorów tej strony. Nie kopiuj właściciela szablonu bez sprawdzenia. Administrator przegląda i scala politykę, skrypt oraz workflow przed udostępnieniem dostępu edytorowi.
3. Ochrona/ruleset main: wymagaj PR, review od Code Owners dla chronionych plików, statusu **Zakres edycji treści** oraz istniejących wymaganych kontroli strony. Zablokuj force-push i usuwanie. Konto/aplikacja edytora nie może mieć wyjątku pozwalającego ominąć reguły. Sam CODEOWNERS nie wymusza review.
   Wymagaj również aktualnej bazy przed merge oraz unieważniania zatwierdzeń po nowych commitach. Aktualizacja polityki na main nie może pozostawić dawnego statusu jako wystarczającego dla PR z nieaktualną bazą.
4. Po scaleniu workflow utwórz testowy PR treści, aby status został zarejestrowany na head SHA. Wybierz ten status jako wymagany; przypisz do GitHub Actions, jeżeli UI pozwala. Potwierdź, że brak/pending/failure blokuje merge. Podczas tego bootstrapu nie udostępniaj jeszcze edytorowi publikacji.
5. Autor PR nie może sam udzielić wymaganego code-owner review. Techniczne PR administratora wymagają drugiego zaufanego administratora. Przy jego braku zgłoś ograniczenie, nie obchodź go kontem edytora i nie wyłączaj ochrony.
6. Edytor bez praw admin/maintain do repo, bez panelu Cloudflare/DNS, zarządzania aplikacjami i sekretami. Przyznaj minimalny zakres uprawnień agenta. Ochrona plików Git nie blokuje operacji w zewnętrznym panelu hostingu.
   Nie dawaj edytorowi bezpośredniego dostępu pozwalającego zmieniać lub uruchamiać dowolne workflow na innych gałęziach. Aplikacja edytora ma nie mieć uprawnienia `Workflows: write`, zarządzania statusami ani sekretami. Sam wymagany status od GitHub Actions nie dowodzi pochodzenia z konkretnego workflow: inny workflow z prawem zapisu statusów mógłby użyć tej samej nazwy. Potwierdź te ograniczenia testem rzeczywistych poświadczeń. Jeśli integracja nie pozwala ich wymusić, edytor może tylko proponować treść, a publikację wykonuje administrator; nie przedstawiaj allowlisty jako samodzielnej twardej granicy bezpieczeństwa.
7. Potwierdź dostępność wymaganej ochrony w planie GitHub i dla widoczności docelowego repo. Jeżeli plan lub integracja jej nie zapewnia, edytor tylko proponuje zmiany, a administrator publikuje. Nie zmieniaj planu na płatny ani widoczności repo bez osobnego zlecenia.

## Mechanizm

Zaufany `pull_request_target` uruchamia kod, politykę i zależności **z bazy PR**, nigdy head ani merge-ref. Pobiera obiekty Git do odczytu różnic, bez checkout/wykonywania kodu propozycji. Publikuje status na konkretnym head SHA. Tożsamości autora i wykonawcy zdarzenia pochodzą z GitHuba; obie muszą należeć do administratorów, aby dopuścić zakres techniczny. Inaczej tylko site.md i zdjęcia w dozwolonych formatach.

W site.md edytor nie zmienia `site` poza `name` i `city` ani `contact.form_key`. Reszta treści musi nadal przejść schemat i testy strony. Domenu/motywu/hostingu nie da się odblokować odpowiedzią w czacie. Renames analizowane są jako usunięcie i dodanie; symlinki/submoduły blokowane; SVG/HTML/skrypty nie są zdjęciami w allowliście. Brak danych lub błędny YAML oznacza odmowę. Kontrola nie wypisuje YAML, różnic ani sekretów.

Techniczną prośbę edytora administrator realizuje w osobnym PR. Samo zatwierdzenie PR edytora nie odblokowuje tego statusu. CODEOWNERS i ochrona gałęzi zabezpieczają także politykę/workflow przed podmianą kontroli. Administrator GitHuba nadal może zmienić ustawienia repo — to nie jest zabezpieczenie przeciw administratorowi. Repozytoryjne logi .ai są chronione; log zwykłej edycji trafia do issue/PR.

## Test odbioru przed udostępnieniem

- Prawdziwe konto edytora: tekst/zdjęcie przechodzą zakres; walidacja i akceptacja podglądu nadal wymagane.
- AGENTS/CLAUDE, workflow, .ai, src, pakiety, domena/motyw/form_key i symlinki od edytora są blokowane. Zmiana SHA wymaga nowego statusu.
- Edytor nie może ręcznie obejść main, podmienić workflow ani sam zatwierdzić technicznego PR. Wrażliwy zakres zgłoszony jako „tylko tekst” także ma być blokowany.
- Administrator i niezależny reviewer mogą przygotować techniczny PR. Gdy nie ma drugiego reviewera, ten scenariusz pozostaje jawnie zablokowany.
- Sprawdź podgląd i publikację treści na osobnym repo testowym. Lokalne testy funkcji nie są testem uprawnień prawdziwych kont. Reguły w gałęzi nie działają jeszcze dla nowych checkoutów main; workflow target zacznie reagować po scaleniu na główną gałąź.
