# Jak zmieniać swoją stronę z telefonu

Nie potrzebujesz komputera ani znajomości programowania. Piszesz do asystenta AI, co chcesz zmienić, oglądasz podgląd i zatwierdzasz jednym przyciskiem. Każdą zmianę można cofnąć.

**Potrzebne aplikacje:** ChatGPT (z Codexem) albo Claude — oraz GitHub (opcjonalnie, można przez przeglądarkę).

---

## Zmiana w 4 krokach

### 1. Napisz, co zmienić

**ChatGPT (Codex):** otwórz aplikację ChatGPT → **Codex** → wybierz środowisko swojej strony → napisz polecenie → wyślij.
**Claude:** otwórz aplikację Claude → **Code** → wybierz repozytorium strony → napisz polecenie → wyślij.

Pisz konkretnie, np.:

> Dodaj warsztat „Spotkanie z oddechem” 14 lutego 2027 o 18:00 w Poznaniu, cena 150 zł, zapisy: https://forms.gle/…

Telefon możesz zablokować — asystent pracuje w chmurze. Zwykle trwa to 2–5 minut.

### 2. Utwórz zmianę do sprawdzenia (pull request)

Gdy asystent skończy, przeczytaj podsumowanie i naciśnij **Create PR** (Utwórz PR).

### 3. Obejrzyj podgląd

Po 1–2 minutach pod PR-em pojawi się link do podglądu (komentarz od Cloudflare), a asystent podaje go też w opisie. Strona podglądu ma u góry czarny pasek **PODGLĄD** — to jeszcze nie jest wersja, którą widzą inni.

- Coś nie tak? Wróć do tego samego zadania i napisz poprawkę, np. „Zmień godzinę na 18:30”.
- Sprawdź zawsze sekcję **⚠️ Do sprawdzenia** w opisie — są tam zmienione ceny, linki i dane kontaktowe.

### 4. Opublikuj

W PR-ze (aplikacja GitHub albo github.com) naciśnij **Merge pull request** → **Confirm merge**. Po 1–2 minutach zmiana jest na stronie.

---

## Jak cofnąć zmianę

1. Wejdź na github.com → Twoje repozytorium → **Pull requests** → **Closed**.
2. Otwórz PR ze zmianą, którą chcesz cofnąć.
3. Na dole naciśnij **Revert** → **Create pull request**.
4. Obejrzyj podgląd (jak w kroku 3) i naciśnij **Merge**.

Strona wraca do poprzedniej wersji. Jeśli coś pójdzie bardzo źle — napisz do osoby, która zrobiła Ci stronę; może przywrócić poprzednią wersję w kilka sekund.

---

## Zdjęcia

- Najprościej: dołącz zdjęcie do polecenia i napisz, gdzie ma się pojawić, np. „Dodaj produkt Mandala Las, 280 zł, zdjęcie w załączniku”.
- Jeśli asystent napisze, że nie może zapisać zdjęcia:
  1. Otwórz github.com w przeglądarce telefonu → Twoje repozytorium → folder **zdjecia**.
  2. **Add file → Upload files** → wybierz zdjęcie → **Commit changes**.
  3. Napisz asystentowi: „Użyj zdjęcia NAZWA-PLIKU w produkcie …”.
- Zdjęcia z iPhone'a (HEIC) są w porządku. Nazwy plików najlepiej bez polskich znaków i spacji.

---

## Gotowe polecenia do skopiowania

- Zmień tekst „O mnie” na: …
- Zmień cenę produktu „…” na … zł.
- Oznacz produkt „…” jako sprzedany.
- Dodaj produkt „…”, cena … zł, opis: …, zdjęcie w załączniku.
- Dodaj warsztat „…”, data …, godzina …, miejsce …, cena … zł, zapisy: (link).
- Usuń warsztat „…”.
- Zmień numer telefonu na …
- Dodaj opinię: „…” — autor: …
- Ukryj sekcję warsztatów (albo: pokaż sekcję warsztatów).
- Popraw błąd w moim ostatnim PR.

---

## Co znaczą kolory w PR

- **Zielony ✓** — wszystko sprawdzone, można publikować.
- **Czerwony ✗** — coś się nie zgadza (np. zła data). Nie publikuj. Napisz asystentowi: „Napraw błąd w PR”.
- **Żółte kółko** — sprawdzanie jeszcze trwa, poczekaj minutę.

## Ważne

- Nic nie trafia na stronę, dopóki nie naciśniesz **Merge**.
- Asystent nie powinien wymyślać cen ani dat — jeśli o coś zapyta, po prostu odpowiedz.
- Nie wpisuj w poleceniach haseł ani numerów kart.
