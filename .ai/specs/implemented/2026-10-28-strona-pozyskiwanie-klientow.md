# Strona pozyskująca klientów na aplikacje

- Stan: implementacja i lokalna weryfikacja zakończone; odbiór publicznego podglądu i CI w PR. Bez publikacji produkcyjnej i bez deklarowania testu z człowiekiem.

- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/22.
- Cel: odwiedzający rozumie ofertę kompletnych aplikacji tworzonych osobiście przez Błażeja z pomocą AI i może zadzwonić lub napisać.
- Zakres: treści, SEO, opcjonalny blok sales w site.md, proces współpracy, zaplecze danych/ETL/chmury, biografia foundera i mobilny kontakt. Zachować Elevate, nagłówek i istniejące doświadczenie/wykształcenie. Portfolio w osobnym issue #23.

## Plan i wymagania

1. Zapisać wszystkie biznesowe teksty w site.md. Opcjonalny blok sales zawiera etykiety sekcji, opis kontaktu, proces z listą etapów i zaplecze z informacją dla dużych organizacji. Brak bloku zachowuje dotychczasowy starter; żadnych nowych zależności/backendu.
2. Przełożyć ofertę na cztery problemy klienta: pomysł/pierwsza wersja, aplikacja dla firmy, automatyzacja, integracje. Techniczne kompetencje i szkolenia zachować w zapleczu i biografii. Wskazać osobiście prowadzony pełny cykl bez fikcyjnych obietnic.
3. Kontakt: prawdziwy e-mail i telefon z rozmowy, widoczne u góry i w Kontakt; tel/mailto bez pośredników. Mobilny pasek opcjonalny i zależny od włączonego kontaktu. Zarezerwować miejsce w układzie wraz z safe-area, by nie zasłaniał końca strony ani fokusu; podstrony mają poprawne kotwice. Bez formularza, jeśli brak dotychczasowego form_key.
4. Biografia: właściciel Legnumcloud, founder, wcześniej CEO Trackick i obecnie co-founder roboprocess. Nazwiska klientów/pracodawców bez sugerowania rekomendacji. Bez dat niepodanych przez właściciela.

## Kryteria akceptacji i weryfikacja

- Sekcje renderowane z danych, brak pustych bloków w starych wariantach; ceny i pozostałe funkcje startera nie naruszone.
- site:validate, build, check, testy logiki i odpowiednie testy przeglądarkowe z macierzą wariantów; test telefonu/mailto, nowych sekcji, ich wyłączenia i dostępu klawiaturą.
- Przegląd zrzutów desktop i mobile, 320 px i 200% tekstu bez poziomego przewijania; axe bez naruszeń. Pasek nie zasłania stopki, kontaktu i aktywnego elementu.
- Aktualny podgląd z Cloudflare dla SHA PR, HTTP 200 i kontrola widoku. Brak merge bez nowej decyzji właściciela.
- Test z osobą spoza IT i tygodniowy rejestr wartościowych zapytań pozostają działaniem właściciela po odbiorze/publikacji. Nie wdrażamy automatycznego śledzenia ani cyklicznego zadania. Nie deklarujemy przeprowadzonego testu z człowiekiem.
- Przy zmianie kontaktu PR zawiera stare → nowe wartości.
