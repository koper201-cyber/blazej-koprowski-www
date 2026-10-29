# Jak zmieniać swoją stronę z telefonu

Nie potrzebujesz komputera ani znajomości programowania. Piszesz do asystenta AI, co chcesz zmienić i po co. Asystent porządkuje zgłoszenie, zapisuje je w GitHubie, a po zleceniu wdrożenia przygotowuje podgląd. Każdą opublikowaną zmianę można cofnąć.

**Potrzebne aplikacje:** ChatGPT (z Codexem) albo Claude — oraz GitHub (opcjonalnie, można przez przeglądarkę).

---

## Zmiana w 6 krokach

### 1. Napisz, co zmienić

**ChatGPT (Codex):** otwórz aplikację ChatGPT → **Codex** → wybierz środowisko swojej strony → napisz polecenie → wyślij.
**Claude:** otwórz aplikację Claude → **Code** → wybierz repozytorium strony → napisz polecenie → wyślij.

Pisz konkretnie, np.:

> Dodaj warsztat „Spotkanie z oddechem” 14 lutego 2027 o 18:00 w Poznaniu, cena 150 zł, zapisy: https://forms.gle/…

### 2. Ustal z asystentem potrzebę

Asystent opisze zmianę własnymi słowami jako **user story**: „Jako [kto], chcę [co], aby [po co]”. To po prostu krótki opis potrzeby. Nie musisz sam znać ani wypełniać szablonu.

Jeśli takiego opisu jeszcze nie ustaliliście, zapyta o brakujące informacje, np. „Jaki ma być efekt tej zmiany?”. Gotowej user story nie trzeba podawać ponownie. Przeczytaj opis i popraw go, jeśli nie oddaje Twojego zamiaru.

### 3. Otrzymaj link do zgłoszenia i zleć wdrożenie

Asystent zapisze **issue**, czyli zgłoszenie w GitHubie, z user story i listą warunków ukończenia. Dostaniesz link, dzięki któremu wrócisz do niego później.

- Chcesz tylko zachować pomysł? Napisz „Zapisz na potem” — na tym praca się kończy.
- Chcesz realizacji? Napisz „Wdrażaj issue #numer”. Jeśli już w pierwszej wiadomości zleciłeś wdrożenie, asystent przejdzie do pracy po ustaleniu potrzeby i zapisaniu issue, bez ponownego pytania o zgodę.
- Masz już issue? Podaj numer lub link. Asystent wykorzysta istniejące zgłoszenie i dopyta tylko o braki.

Telefon możesz zablokować — po doprecyzowaniu i zleceniu wdrożenia asystent pracuje w chmurze.

### 4. Poczekaj na podgląd

Asystent sam przygotowuje zmianę i zapisuje ją do sprawdzenia. Dostaniesz krótki opis, numer wersji i klikalny link **Obejrzyj podgląd**. Nie musisz otwierać GitHuba ani tworzyć PR.

Podgląd pokazuje propozycję; strona publiczna czeka na Twoją decyzję. Jeśli budowanie trwa albo wystąpi błąd, asystent powinien to wyjaśnić. Sam komunikat „zmieniono plik” nie kończy pracy.

### 5. Sprawdź na telefonie

Otwórz podgląd i obejrzyj zmieniony fragment. Sprawdź też wskazane ceny, linki i dane kontaktowe.

- Chcesz poprawki? Wróć do tej samej rozmowy i napisz, co poprawić. Dostaniesz nowy podgląd do sprawdzenia.
- Rezygnujesz? Napisz **„Odrzucam tę wersję”**. Strona publiczna pozostaje bez zmian.

### 6. Podejmij decyzję o publikacji

Jeżeli podgląd jest dobry, napisz **„Zatwierdzam tę wersję do publikacji”**. Asystent sprawdzi, czy wersja nadal jest ta sama i czy kontrole przeszły, a następnie wykona zleconą publikację. Dopiero po sprawdzeniu publicznej strony potwierdzi „Opublikowane” i poda jej adres.

Jeśli wcześniej zakazałeś publikowania lub scalania, musisz wyraźnie odwołać ten zakaz dla zatwierdzanej wersji. Akceptacja podglądu nie zatwierdza innych otwartych zmian.

Ten proces wymaga włączonej integracji i opublikowanych instrukcji projektu. Otwarte PR z instrukcjami jeszcze nie zmieniają działania nowych rozmów na głównej gałęzi.

---

## Jak cofnąć zmianę

Napisz: „Cofnij zmianę [opis lub numer wersji]”. Asystent przygotuje propozycję przywrócenia poprzedniej treści. Obejrzysz podgląd i zdecydujesz o publikacji tak samo jak przy każdej innej zmianie.

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

Możesz zacząć od poniższych zdań. Asystent dopisze user story na podstawie rozmowy, a jeśli nie zna celu lub innych potrzebnych informacji — zapyta. Potem zapisze issue.

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

### Gdy polecenie może zniszczyć stronę lub dane

Jeśli poprosisz np. o usunięcie strony, skasowanie wszystkich zdjęć, odłączenie domeny albo działanie grożące utratą danych lub dostępu, asystent najpierw wyjaśni skutki i zaproponuje bezpieczniejszą opcję.

Zada **trzy pytania, jedno po drugim, innymi słowami**: czy taki jest Twój zamiar i zakres, czy akceptujesz konkretne konsekwencje oraz czy ostatecznie zlecasz tę operację. Na każde potrzebuje osobnej, jednoznacznej odpowiedzi. Możesz w każdej chwili powiedzieć „Nie” albo „Wycofuję zgodę”. Zmiana planu oznacza ponowne potwierdzenia.

Asystent ma sprawdzić możliwość odzyskania danych. Nie powinien sam trwale usuwać jedynej kopii, jeśli nie potwierdził sposobu przywrócenia. Trzy zgody nie pozwalają ujawniać haseł, obchodzić zabezpieczeń ani robić czegoś poza Twoim zleceniem. Ta procedura chroni pracę przez AI; nie blokuje Twoich własnych kliknięć w panelach usług.

Przy zwykłej poprawce tekstu lub ukryciu sekcji nadal wystarczy podgląd i jedna decyzja o publikacji.

### Pozostałe zasady

- Nic nie trafia na stronę bez wyraźnego zatwierdzenia konkretnej wersji do publikacji.
- Asystent nie powinien wymyślać cen ani dat — jeśli o coś zapyta, po prostu odpowiedz.
- Jeżeli asystent nie ma dostępu do GitHuba, pokaże szkic i napisze, że zgłoszenie nie zostało zapisane. Najpierw trzeba udostępnić repozytorium lub ręcznie zapisać issue; sam szkic nie uruchamia wdrożenia.
- Nie wpisuj w poleceniach haseł ani numerów kart.
