# Poglądowa adaptacja Elevate

- Stan: adaptacja zrealizowana i zweryfikowana lokalnie; do przeglądu w PR, bez scalenia. Wynik publicznego podglądu końcowego SHA jest zapisywany w opisie PR.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/20.
- Cel: pokazać nowy kierunek strony osobistej Błażeja Koprowskiego / Legnumcloud inspirowany wybranym Elevate, bez zmiany produkcji.
- Źródło: [Elevate — flowcub](https://www.figma.com/community/file/1502180307181819798/elevate-agency-ai-landing-page), w Community oznaczone CC BY 4.0. Plik otwarty do adaptacji: PsB3zNPfNOAO4hHqqeuMsa, Landing Page Design.

## Plan i zakres

1. Odczytać warstwy oraz zrzut projektu Figma i istniejące komponenty, dane i tokeny projektu.
2. Dostosować układ i CSS: ciemny motyw, fioletowa poświata, duża typografia, czytelna oferta i kontakt. Zachować site.md jako źródło danych i wszystkie istniejące funkcje/opcjonalne sekcje.
3. Sprawdzić typy, walidację, build, testy przeglądarkowe i wygląd na komputerze oraz telefonie. Wyeliminować przepełnienia i niedostępny kontrast.
4. Udostępnić PR i rzeczywisty podgląd aktualnego SHA; bez scalania i bez publikacji produkcyjnej.

## Wymagania i akceptacja

- Osobista marka i dotychczasowa oferta AI, danych, chmury i szkoleń w stylu Elevate. Adaptacja poglądowa, nie kopia obcego produktu lub jego fikcyjnych wyników.
- Treści, dane kontaktowe i flagi sekcji z site.md; brak zmyślonych cen, referencji, klientów i statystyk. Bez odrzuconego zdjęcia z #17. Pełna dotychczasowa treść pozostaje dostępna.
- Nawigacja i kontakt działają, obsługa klawiatury i reduced-motion, układ bez poziomego przewijania przy 320–1440 px; odpowiedni kontrast.
- Korzystać z istniejących Base, Photo, Contact, schema i logiki widoku. Bez nowych zależności, usług ani backendu.
- Źródło i adaptacja wskazane w dokumentacji oraz dyskretnym przypisie projektu. Potwierdzone lokalne zasoby; bez tymczasowych adresów Figma w kodzie i bez podmieniania projektu jego zrzutem.

## Ryzyka i weryfikacja

Zmiana obejmuje src/ i style na wyraźne zlecenie wyglądu, co należy wyjaśnić w PR. Istniejące testy obejmują również warianty opcjonalne startera; nowy wygląd musi zachować ich działanie. Nie uznawać lokalnego builda za publiczny podgląd. Przed PR: site:validate, build, check i testy adekwatne do zmiany, przegląd wizualny, log rzeczywistych ograniczeń.
