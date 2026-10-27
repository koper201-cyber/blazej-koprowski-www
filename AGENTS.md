# Zasady pracy agenta AI w tym repozytorium

To repozytorium to strona internetowa. Właściciel(ka) strony **nie zna się na programowaniu** i pisze do Ciebie z telefonu, zwykłym językiem, po polsku. Odpowiadaj po polsku, krótko i bez żargonu.

## 1. Co wolno zmieniać

- Zwykłe zmiany treści (teksty, ceny, terminy, produkty, warsztaty, kontakt, zdjęcia): edytuj **wyłącznie**
  - `site.md` — cała treść i ustawienia strony,
  - folder `zdjecia/` — zdjęcia.
- Pliki w `src/`, `scripts/`, konfigurację (`astro.config.mjs`, `package.json`, `.github/`) zmieniaj **tylko na wyraźną prośbę** i wyjaśnij w PR, dlaczego.
- Nie dodawaj zależności, usług płatnych ani backendu.

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
