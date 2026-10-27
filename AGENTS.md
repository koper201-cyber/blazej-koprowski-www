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

## 5. Gałąź i pull request

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
https://<gałąź>.<pages_project>.pages.dev
(gotowy ok. 1–2 minuty po utworzeniu PR; link pojawi się też w komentarzu pod PR)

Jeśli wszystko wygląda dobrze — kliknij **Merge**. Strona zaktualizuje się w 1–2 minuty.
```

- Sekcję „⚠️ Do sprawdzenia” dodawaj **zawsze**, gdy zmieniasz: ceny, linki zapisów lub płatności, e-mail, telefon, adres. Podaj starą → nową wartość.
- Adres podglądu: `<pages_project>` weź z `site.md` (`site.pages_project`); `<gałąź>` to nazwa gałęzi małymi literami, inne znaki niż litery/cyfry zamienione na `-`, maks. 28 znaków.

## 6. Czego nie robić

- Nie wymyślaj danych (cen, dat, godzin, adresów, linków, opinii klientów). Jeśli czegoś brakuje — **zapytaj**.
- Nie usuwaj treści bez wyraźnej prośby.
- Nigdy nie wpisuj do repozytorium haseł, tokenów ani kluczy prywatnych. (Klucz formularza Web3Forms w `contact.form_key` jest publiczny — to w porządku.)
- Nie scalaj (merge) PR samodzielnie — akceptuje zawsze właściciel.

## 7. Typowe prośby

| Prośba | Co zrobić |
|---|---|
| „Zmień cenę mandali Spokój na 320 zł” | `products` → znajdź po `name` → `price: 320`; „⚠️ Do sprawdzenia”: 300 → 320 zł |
| „Dodaj warsztat 14 lutego o 18 w Poznaniu za 150 zł” | dopisz do `workshops`; jeśli brak linku do zapisów — zapytaj |
| „Mandala Las sprzedana” | `status: "sprzedana"` |
| „Zmień tekst o mnie: …” | zmień tekst pod `# O mnie` |
| „Ukryj warsztaty” | `features.workshops: false` |
| „Cofnij ostatnią zmianę” | wyjaśnij: na scalonym PR kliknij **Revert**, potem **Merge** nowego PR |
| „Napraw błąd w PR” | uruchom `npm run site:validate`, popraw `site.md`, wypchnij poprawkę do tej samej gałęzi |

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
- **Po naprawie błędu lub ustaleniu trwałej reguły** zapisz przyczynę, rozwiązanie i sposób zapobiegania w `.ai/lessons/` (zalecana nazwa `YYYY-MM-DD-slug.md`), a w `.ai/lessons.md` dodaj krótkie podsumowanie i link. Aktualizuj istniejącą notatkę o tym samym zagadnieniu zamiast tworzyć duplikat. Nie dopisuj wniosków bez potwierdzenia.
- **Przed uznaniem zadania za zakończone** sprawdź aktualność logu, status specyfikacji i potrzebę zapisania wniosków. Dokumentację `.ai/` dołącz do tej samej gałęzi i PR co zmiany. Te zasady obowiązują wszystkich agentów AI; `CLAUDE.md` odsyła do tego pliku.
