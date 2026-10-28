# Zasady pracy agenta AI w tym repozytorium

To repozytorium to strona internetowa. Właściciel(ka) strony **nie zna się na programowaniu** i pisze do Ciebie z telefonu, zwykłym językiem, po polsku. Odpowiadaj po polsku, krótko i bez żargonu.

## 1. Co wolno zmieniać

- Zwykłe zmiany treści (teksty, ceny, terminy, produkty, warsztaty, kontakt, zdjęcia): edytuj **wyłącznie**
  - `site.md` — cała treść i ustawienia strony,
  - folder `zdjecia/` — zdjęcia.
- Pliki w `src/`, `scripts/`, konfigurację (`astro.config.mjs`, `package.json`, `.github/`) zmieniaj **tylko na wyraźną prośbę** i wyjaśnij w PR, dlaczego.
- Nie dodawaj zależności, usług płatnych ani backendu.
- Dokumentację pracy AI zapisuj w `.ai/` zgodnie z sekcją 8; jest to dozwolone także przy zmianach treści.

## 2. Jak edytować `site.md`

- Dane są w części YAML (między liniami `---`). Długie teksty są pod nagłówkami `# O mnie` i `# Polityka prywatności`.
- Dozwolone pola opisuje `src/lib/site-schema.ts`. Nie wymyślaj nowych pól.
- Formaty:
  - ceny: sama liczba w złotych, bez cudzysłowów — `price: 150` (nie „150 zł”),
  - daty: `date: 2027-02-14` (RRRR-MM-DD); godziny: `time: "18:00"`,
  - status produktu: `"dostępna"`, `"sprzedana"` albo `"na zamówienie"`,
  - zdjęcie: sama nazwa pliku z folderu `zdjecia/`, np. `image: "mandala-spokoj.jpg"`; zawsze dodaj `alt:` z krótkim opisem tego, co widać,
  - teksty w cudzysłowach `"…"`.
- Nowy produkt/warsztat dopisz na końcu odpowiedniej listy, chyba że właściciel prosi inaczej.
- Minione warsztaty ukrywają się same — nie usuwaj ich, chyba że właściciel o to poprosi.
- Sekcję włącza/wyłącza `features` (np. `workshops: true`).

## 3. Zdjęcia

- Zdjęcie przysłane w zadaniu zapisz do `zdjecia/` pod krótką nazwą **bez polskich znaków i spacji**, np. `warsztat-luty.jpg`. Format HEIC z iPhone'a jest w porządku — konwersja dzieje się automatycznie.
- Jeśli nie da się zapisać załączonego zdjęcia jako pliku, napisz właścicielowi wprost: „Wgraj zdjęcie przez github.com do folderu `zdjecia/` (Add file → Upload files) i napisz mi jego nazwę”.
- Maksymalny rozmiar pliku: 15 MB.

## 4. Zanim utworzysz pull request — obowiązkowo

```bash
npm run site:validate
npm run build
```

- Oba polecenia muszą zakończyć się bez błędów. **Nie twórz PR z błędami.**
- Błędy walidatora są po polsku i mówią, co poprawić. Ostrzeżenia (⚠️) nie blokują.
- Jeśli `npm` nie działa (brak zależności), uruchom najpierw `npm install`.
- Przed PR przejrzyj różnice pod kątem zakresu zadania i przypadkowych zmian. Weryfikację dobierz też do efektu: przy zmianach kodu uruchom `npm run check`, a przy zmianach wyglądu lub interakcji sprawdź zmieniony fragment w przeglądarce na telefonie i komputerze (lub w odpowiadających im rozmiarach okna). Jeśli nie możesz wykonać kontroli, zapisz to w logu i podsumowaniu; nie przedstawiaj jej jako zaliczonej.

## 5. Gałąź i pull request

- Przed zmianą musi istnieć issue z ustaloną user story i kryteriami akceptacji (sekcja 10). W opisie PR podaj link do tego issue; `Closes #numer` stosuj tylko wtedy, gdy PR realizuje cały jego zakres.
- **Nigdy nie zapisuj zmian bezpośrednio na `main`.** Zawsze nowa gałąź + pull request.
- Nazwa gałęzi: krótka, małe litery, bez polskich znaków, np. `warsztat-luty`, `cena-mandala`.
- Tytuł PR po polsku, np. „Nowy warsztat 14 lutego”.
- Opis PR (prostym językiem):

```markdown
## Co zmieniłem

- Dodałem warsztat „Spotkanie z oddechem”, 14 lutego 2027, 18:00, Poznań.

## ⚠️ Do sprawdzenia

- Cena warsztatu: (nowa) 150 zł
- Link do zapisów: https://forms.gle/...

## Podgląd

<sprawdzony Preview URL z Cloudflare dla aktualnego commita>

Obejrzyj podgląd i napisz: „Zatwierdzam tę wersję do publikacji” albo „Odrzucam”.
```

- Sekcję „⚠️ Do sprawdzenia” dodawaj **zawsze**, gdy zmieniasz: ceny, linki zapisów lub płatności, e-mail, telefon, adres. Podaj starą → nową wartość.
- Podgląd pobierz i sprawdź zgodnie z sekcją 11. Nie przedstawiaj przewidywanego adresu gałęzi jako gotowego podglądu.

## 6. Czego nie robić

- Nie wymyślaj danych (cen, dat, godzin, adresów, linków, opinii klientów). Jeśli czegoś brakuje — **zapytaj**.
- Nie usuwaj treści bez wyraźnej prośby.
- Nigdy nie wpisuj do repozytorium haseł, tokenów ani kluczy prywatnych. (Klucz formularza Web3Forms w `contact.form_key` jest publiczny — to w porządku.)
- Nie scalaj (merge) PR bez wyraźnego zlecenia właściciela dotyczącego pokazanej wersji. Obowiązują bramki z sekcji 11 i wcześniejsze zakazy scalania; samo zlecenie przygotowania zmiany nie pozwala jej opublikować.

## 7. Typowe prośby

Poniższe przykłady opisują edycję po ustaleniu user story i zapisaniu issue zgodnie z sekcją 10. Nie pomijaj tego kroku przy krótkiej prośbie o treść.

| Prośba                                               | Co zrobić                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| „Zmień cenę mandali Spokój na 320 zł”                | `products` → znajdź po `name` → `price: 320`; „⚠️ Do sprawdzenia”: 300 → 320 zł                        |
| „Dodaj warsztat 14 lutego o 18 w Poznaniu za 150 zł” | dopisz do `workshops`; jeśli brak linku do zapisów — zapytaj                                           |
| „Mandala Las sprzedana”                              | `status: "sprzedana"`                                                                                  |
| „Zmień tekst o mnie: …”                              | zmień tekst pod `# O mnie`                                                                             |
| „Ukryj warsztaty”                                    | `features.workshops: false`                                                                            |
| „Cofnij ostatnią zmianę”                             | przygotuj PR przywracający poprzednią treść, sprawdzony podgląd i poproś o decyzję zgodnie z sekcją 11 |
| „Napraw błąd w PR”                                   | uruchom `npm run site:validate`, popraw `site.md`, wypchnij poprawkę do tej samej gałęzi               |

## 8. Obowiązkowa dokumentacja pracy AI

```text
.ai/
├── specs/              # aktywne specyfikacje SDD
│   ├── implemented/    # specyfikacje zrealizowane i zweryfikowane
│   └── archive/        # specyfikacje wycofane lub zastąpione
├── runs/               # logi autonomicznych przebiegów AI
├── lessons.md          # indeks trwałych ustaleń i wniosków
└── lessons/            # szczegółowe notatki powiązane z indeksem
```

- **Przed rozpoczęciem zadania** przeczytaj `.ai/lessons.md`, powiązane notatki z `.ai/lessons/` oraz specyfikacje i ostatnie logi dotyczące zadania. Sprawdzaj zapisane ustalenia w aktualnym kodzie; notatki nie zastępują instrukcji właściciela ani zasad tego pliku.
- **Specyfikacje SDD:** przed implementacją funkcji lub naprawą kodu utwórz albo uzupełnij specyfikację w `.ai/specs/`. Opisz cel, zakres, wymagania, kryteria akceptacji i sposób weryfikacji. Proste zmiany treści i dokumentacji mogą obejść się bez osobnej specyfikacji; odnotuj zakres w logu przebiegu.
- **Nazwy specyfikacji i logów są obowiązkowe:** `YYYY-MM-DD-slug.md`, np. `2026-10-27-formularz-kontaktowy.md`. Używaj daty rozpoczęcia w strefie `Europe/Warsaw`, małych liter ASCII, cyfr i myślników w slugu. Przy kolizji dodaj do sluga kolejny numer, np. `2026-10-27-formularz-kontaktowy-2.md`; nie nadpisuj innego przebiegu.
- Po realizacji i weryfikacji przenieś specyfikację do `.ai/specs/implemented/`. Specyfikacje wycofane lub zastąpione przenieś do `.ai/specs/archive/`, zapisując przyczynę i link do następcy, jeśli istnieje. Zachowuj nazwę i historię; nie usuwaj specyfikacji. Niezakończona specyfikacja pozostaje w `.ai/specs/`.
- **Każdy autonomiczny przebieg wykonujący zmiany** musi mieć log w `.ai/runs/`, założony przed zmianami i uzupełniony przed zakończeniem. Zapisz cel, link do specyfikacji (jeśli dotyczy), wykonane zmiany, polecenia weryfikacji i ich rzeczywiste wyniki, ograniczenia oraz ewentualne następne kroki. Oznacz stan: w toku, zakończony albo zablokowany. Nie zapisuj pełnego toku rozumowania ani sekretów.
- **Po naprawie błędu, korekcie od właściciela lub ustaleniu trwałej reguły** zapisz przyczynę, rozwiązanie i sposób zapobiegania w `.ai/lessons/` (zalecana nazwa `YYYY-MM-DD-slug.md`), a w `.ai/lessons.md` dodaj krótkie podsumowanie i link. Aktualizuj istniejącą notatkę o tym samym zagadnieniu zamiast tworzyć duplikat. Nie dopisuj wniosków bez potwierdzenia. Jeśli korekta ujawnia brak ogólnej zasady pracy, doprecyzuj odpowiedni punkt tego pliku; szczegóły konkretnego błędu zostaw we wnioskach.
- **Przed uznaniem zadania za zakończone** sprawdź aktualność logu, status specyfikacji i potrzebę zapisania wniosków. Dokumentację `.ai/` dołącz do tej samej gałęzi i PR co zmiany. Te zasady obowiązują wszystkich agentów AI; `CLAUDE.md` odsyła do tego pliku.

## 9. Planowanie i rozwiązywanie problemów

- Złożone zadanie (wiele zależnych kroków, kilka obszarów kodu lub niejasne rozwiązanie) zacznij od krótkiego planu: kroki, ryzyka i sposób sprawdzenia. Zapisz go w specyfikacji z sekcji 8, a przy zadaniu bez specyfikacji — w logu. Gdy nowe fakty podważają plan lub kolejne próby nie działają, wróć do diagnozy i popraw plan przed dalszą implementacją.
- Przy zgłoszonym błędzie lub nieudanym CI najpierw przeczytaj logi i odtwórz problem, jeśli to możliwe. Ustal przyczynę, wprowadź najprostszą poprawkę w dozwolonym zakresie i sprawdź scenariusz, który wcześniej zawodził. Wykorzystuj istniejące rozwiązania projektu; unikaj poprawek maskujących objawy i przebudowy niezwiązanej z zadaniem.

## 10. Zgłoszenia z telefonu: najpierw user story i issue

1. **Każdą prośbę właściciela o zmianę, także potoczną lub dyktowaną, zredaguj własnymi słowami jako user story:** „Jako [rola], chcę [potrzeba], aby [cel lub korzyść]”. Stosuj ten proces także wtedy, gdy nie wiesz, czy właściciel pisze z telefonu. Zachowaj jego intencję i wykorzystaj informacje już ustalone w rozmowie.
2. **Jeśli user story nie została ustalona, zapytaj o nią przed utworzeniem issue i przed zmianą treści lub kodu.** Pomóż prostymi pytaniami o brakujące elementy: „Dla kogo jest ta zmiana?”, „Co ma się zmienić?”, „Po co / jaki ma być efekt?”. Nie wymagaj od właściciela technicznego szablonu i nie wymyślaj odpowiedzi. Gdy rola, potrzeba i korzyść są już jasne, sam ułóż user story; nie pytaj ponownie o znane informacje ani o zgodę tylko na przepisanie zgłoszenia.
3. **Najważniejszym wynikiem przyjęcia zgłoszenia jest GitHub Issue.** Zapisz w nim sekcje „User story” oraz „Kryteria akceptacji” z konkretnymi, sprawdzalnymi warunkami ukończenia. Dodaj tylko ustalone szczegóły i przekaż właścicielowi rzeczywisty link. Formularz `.github/ISSUE_TEMPLATE/zmiana-z-telefonu.yml` pomaga przy ręcznym zgłoszeniu; te same wymagania obowiązują przez API lub CLI.
4. **Użyj istniejącego issue, jeśli użytkownik je wskazuje lub dotyczy ono tej samej potrzeby.** Przeczytaj jego treść i kryteria; przy brakującej user story najpierw dopytaj, a potem uzupełnij issue. Poprawki w ramach tej samej potrzeby i PR dopisuj do niego, zamiast tworzyć duplikaty. Osobna nowa potrzeba wymaga nowego issue.
5. **Zapisanie issue nie jest samo w sobie zleceniem wdrożenia.** „Zapisz na potem” kończy się na issue. Do implementacji potrzebna jest prośba właściciela, np. „wdrażaj issue #8”; może ona być już zawarta w pierwotnym zgłoszeniu, wtedy nie proś o kolejną zgodę. Dalej obowiązują zakres zmian, specyfikacja, weryfikacja i PR z pozostałych sekcji. Publikacja wymaga osobnej decyzji z sekcji 11.
6. **Brak dostępu do GitHub nie usprawiedliwia pominięcia issue.** Przygotuj szkic user story i kryteriów, zaznacz, że issue nie zostało zapisane, i poproś o udostępnienie repozytorium lub ręczne zapisanie szkicu. Nie wymyślaj numeru ani linku i nie zaczynaj implementacji przed zapisaniem issue.

## 11. Telefon: obowiązkowy podgląd i decyzja

- AI obsługuje issue, gałąź i PR w tle. Nie odsyłaj właściciela do przycisków Create PR lub Merge. Po walidacji wyślij gałąź i utwórz PR do aktualnego main; nie dodawaj do zwykłej zmiany treści innych otwartych prac.
- Zapisz pełny SHA propozycji. Odczytaj `gh api repos/{owner}/{repo}/commits/{sha}/check-runs`; znajdź udany check „Cloudflare Pages” od aplikacji `cloudflare-workers-and-pages`, związany z tym SHA. Z jego `output.summary` pobierz **Preview URL**, nie Branch Preview URL ani adres panelu. Nie zgaduj adresu. W tej stronie domena musi należeć do projektu z `site.pages_project`.
- Poczekaj na wdrożenie i sprawdź HTTP 200 oraz zamierzoną treść/interakcję pod rzeczywistym adresem. Sam build, status PR ani działający localhost nie potwierdzają dostępności podglądu na telefonie. Przy oczekiwaniu podawaj stan, a przy błędzie diagnozuj go; nie ogłaszaj zadania jako gotowego. Jeżeli PR zawiedzie, ale podgląd istnieje, pokaż sprawdzony podgląd i wyjaśnij blokadę publikacji.
- Przekaż krótką kartę: co zmieniono, klikalny podgląd, wymagane dane do sprawdzenia, numer wersji (skrót SHA) i prośbę o „Zatwierdzam tę wersję do publikacji” albo „Odrzucam”. Zachowaj link do issue/PR i pełny SHA w logu oraz opisie PR. Nie obiecuj dodatkowych przycisków w interfejsie ChatGPT.
- Brak odpowiedzi, odrzucenie i prośba o poprawkę nie pozwalają zmieniać main. Po odrzuceniu zamknij właściwy PR bez scalania, jeśli właściciel zleca odrzucenie; zachowaj gałąź i zapisz wynik. Poprawka tworzy nową wersję, która wymaga nowego sprawdzonego podglądu i nowej decyzji.
- Publikacja: tylko po jednoznacznym zatwierdzeniu pokazanej wersji, braku obowiązującego zakazu scalania, zgodnym SHA i zakończonych pomyślnie wymaganych kontrolach (co najmniej „Sprawdzenie strony” oraz Cloudflare). Brak kontroli, oczekiwanie, błąd, konflikt lub zmiana SHA blokują publikację. Tuż przed scaleniem sprawdź ponownie PR, jego bazę main i head SHA; użyj `gh pr merge --match-head-commit {pełny-sha}` bez omijania zabezpieczeń i bez automatycznego scalania późniejszej wersji. Akceptacja jednego podglądu nie zatwierdza innych PR.
- Po scaleniu sprawdź udane wdrożenie tego commita oraz publiczny adres strony i zamierzoną zmianę. Dopiero wtedy napisz „Opublikowane”. Gdy wdrożenie zawiedzie, poinformuj o błędzie i naprawie; nie przedstawiaj samego scalenia jako sukcesu.
- Nowy czat musi korzystać z opublikowanego środowiska i instrukcji faktycznie obecnych na jego gałęzi. Otwarte PR z zasadami nie działają jeszcze na main. Nie uznawaj procesu za sprawdzony bez rzeczywistego testu; osobno zapisuj test przygotowania, podglądu, odrzucenia i publikacji.
