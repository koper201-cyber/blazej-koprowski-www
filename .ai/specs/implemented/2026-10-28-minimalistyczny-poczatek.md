# Minimalistyczny początek

Najnowsza korekta zastępuje poniższe wcześniejsze ograniczenia: opis hero zaczyna się od „Błażej Kaprowski” (dokładna pisownia zlecenia), CTA „Porozmawiajmy”, nagłówek „Twój pomysł.” i „Moje doświadczenie.” w osobnych wierszach. Oryginalny wygląd zachowany. Znak nowej linii w treści i white-space: pre-line w CSS; na bardzo wąskim ekranie dopuszczalne naturalne łamanie dla zachowania reflow.

## Ostateczny zakres po korekcie właściciela

Właściciel odrzucił minimalistyczny wygląd. Przywrócić wygląd i opis z aktualnego main; jedyną zmianą strony ma być hero.heading = „Twój pomysł. Moje doświadczenie.”. Nie usuwać „Jestem…”, dekoracji, kolorów, oprawy zdjęcia ani innych treści. Poniższy opis wcześniejszej koncepcji jest historią, nie obowiązującym zakresem. Weryfikacja: różnica site.md obejmuje tylko nagłówek, src/ bez różnic względem main; site:validate/build i nowy podgląd.

## Cel i zakres

Właściciel zlecił zaproponowanie i przygotowanie minimalistycznego, lekko spartańskiego, eleganckiego początku. Header i hero: jednolite ciemne tło, spokojne zdanie zamiast wersalików, krótki opis, usunięcie powtórzonej etykiety imienia i dekoracyjnych warstw zdjęcia. Pozostałe sekcje zachowane. Zmiany src/CSS wynikają bezpośrednio z prośby o wygląd.

## Kryteria

Nagłówek „Twój pomysł. Moje doświadczenie.”; opis „Projektuję hurtownie danych, procesy ETL i rozwiązania w chmurze.” bez „Jestem”. Zdjęcie ostre, prosta oprawa, neutralny header CTA, główny przycisk i jego cel bez zmian. Desktop tekst i zdjęcie obok siebie; mobile czytelne łamanie i brak overflow.

## Plan i weryfikacja

Edycja site.md, uproszczenie markup hero i stylów Elevate; walidacja/build/check, testy logiki, Chromium 320/390/1440, axe, kontrola CTA i zrzuty. Ryzyko: długie słowo „doświadczenie” na małym ekranie; dobór rozmiaru i test reflow. Podgląd aktualnego SHA i osobna decyzja przed publikacją. Bez zależności i zmian danych kontaktowych.
