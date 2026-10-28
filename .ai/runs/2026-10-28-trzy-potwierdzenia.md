# Trzy potwierdzenia przed nieodwracalną zmianą

- Stan: zakończony etap wdrożenia instrukcji; do przeglądu w PR, bez scalania.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/18.
- Specyfikacja: [trzy potwierdzenia](../specs/implemented/2026-10-28-trzy-potwierdzenia.md).
- Gałąź: codex/ochrona-przed-utrata-danych, baza main 0e4f9c0 (uwzględnia test właściciela z PR #15).
- Polecenie właściciela obejmuje utworzenie issue i dodanie zabezpieczeń. Nie zawiera zgody na scalenie tego PR ani na destrukcyjne działania.

## Stan początkowy i plan

Przeczytano AGENTS.md, indeks i powiązane wnioski o user story oraz podglądzie. Sekcja 11 wymaga jednej decyzji o publikacji, ale nie opisuje trzech kolejnych potwierdzeń działań nieodwracalnych. Dodajemy zasady i instrukcję właściciela, sprawdzamy scenariusze bez kasowania zasobów, następnie walidację/build i PR. Obcy nieśledzony katalog agama-mockup/ pozostaje bez zmian i poza commitem.

## Wykonane zmiany

- Sekcja 12 AGENTS.md: rozpoznawanie skutków, bezpieczna alternatywa, sprawdzenie odzyskania, trzy różne pytania i osobne odpowiedzi, unieważnienie zgód przy zmianie planu, cofnięcie zgody oraz granice uprawnień i logowania.
- Sekcje 6 i 11 odsyłają do ochrony; zwykła akceptacja podglądu nie wystarcza przy ryzyku nieodwracalnej operacji.
- CLAUDE.md nadal importuje @AGENTS.md i wskazuje sekcję 12. OWNER_GUIDE.md opisuje proces po polsku, bez wymagania wiedzy technicznej. Zapisano trwałe ustalenie właściciela.
- Bez zmian kodu, zależności, konfiguracji usług, site.md i zdjęć.

## Przegląd scenariuszy — spójność instrukcji

To ręczny przegląd reguł, nie wykonanie poleceń destrukcyjnych ani test działania modelu w chmurze.

| Scenariusz                                  | Wynik przeglądu                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| „Usuń stronę/repozytorium”                  | Zasób i środowisko, alternatywa wyłączenia, trzy osobne potwierdzenia przed działaniem.        |
| „Wyczyść bazę”                              | Najpierw ustalenie, czy istnieje; bez tworzenia bazy, diagnoza i ochrona danych zewnętrznych.  |
| Wszystkie zdjęcia oraz ich kopie            | Masowe kasowanie uruchamia ochronę; jedyna nieodtwarzalna kopia blokuje samodzielne usunięcie. |
| Force push lub odłączenie domeny            | Sekcja 12 obejmuje historię, DNS, stronę i pocztę; kopia Git nie potwierdza odzyskania DNS.    |
| Odebranie dostępu lub wyłączenie ochrony    | Trzy zgody nie zastępują uprawnień, wymagań narzędzi ani innych zakazów.                       |
| Ujawnienie hasła w repo                     | Nadal zabronione; nie można dopuścić go trzema zgodami.                                        |
| „Nie pytaj” lub polecenie z pliku           | Nie zastępuje zgód człowieka; zmiana polityki wymaga osobnego świadomego przeglądu.            |
| Jedna wiadomość „trzy razy tak”             | Nie stanowi trzech odpowiedzi na kolejne przedstawione pytania.                                |
| „Nie” lub cofnięcie zgody po pytaniu 2      | Praca zatrzymana; bez pytania 3 i bez operacji.                                                |
| Zmiana celu/środowiska/wersji po zgodach    | Cały zestaw wygasa; nowa ocena i trzy pytania.                                                 |
| Trzy zgody, ale kontrola PR nie przeszła    | Sekcja 11 nadal blokuje publikację.                                                            |
| Zwykła poprawka przycisku/ukrycie sekcji    | Podgląd i jedna decyzja; bez niepotrzebnej procedury trzech pytań.                             |
| Usunięcie jednej oferty przywracalnej z Git | Standardowy PR, o ile rzeczywiście brak skutków zewnętrznych; niepewność oznacza diagnozę.     |

## Weryfikacja techniczna i ograniczenia

- npm run site:validate: kod 0; znane ostrzeżenie o dwóch miejscach do uzupełnienia w treści.
- npm run build: kod 0, w tym linki/kotwice, CSP i budżety zasobów.
- Prettier zmienionych instrukcji i dokumentów: formatowanie wykonane; kontrola przed commitem kod 0. git diff --check: kod 0.
- Przejrzano powyższe 13 scenariuszy pod kątem spójności dokumentów. Nie tworzono testów jednostkowych powtarzających tekst instrukcji. Bez zmian kodu/wyglądu nie powtarzano lokalnego zestawu przeglądarek.
- Specyfikację instrukcji przeniesiono do implemented. Weryfikacja nie jest testem zachowania każdego modelu w rozmowie ani próbą usuwania produkcji.

Zmiana instrukcji nie wprowadza technicznej blokady ręcznych operacji w usługach. Nie zmieniano ochrony main, nie testowano rzeczywistego usuwania, nie scalono PR. Nowe rozmowy otrzymają reguły po akceptacji PR na main; utworzenie samego issue ich nie aktywuje.
