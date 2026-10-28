# Podgląd Elevate

- Stan: zakończona implementacja i kontrola lokalna; odbiór publicznego podglądu i CI w PR, bez publikacji produkcyjnej.
- Issue: #20, https://github.com/koper201-cyber/blazej-koprowski-www/issues/20.
- Specyfikacja: [podgląd Elevate](../specs/implemented/2026-10-28-podglad-elevate.md).
- Gałąź: codex/podglad-elevate, od main 0e4f9c0. Bez niescalonych zabezpieczeń z PR #19 ani odrzuconego portretu z #17.
- Przeczytano AGENTS.md, lessons.md i notatki o bezpiecznych treściach/testach oraz podglądach. Plan w specyfikacji; nieśledzony agama-mockup/ pozostaje nietknięty.
- Zlecenie: poglądowa adaptacja wybranego Elevate. Brak zgody na produkcję/merge. Zapisano issue przed zmianą kodu.
- Zastosowano skill figma-design-to-code. Otworzono wybrany projekt przez Open in Figma, odczytano rzeczywisty fileKey i utworzono sesję. Pierwsze get_design_context dla strony 0:1 zwróciło brak zaznaczenia; metadata służy do ustalenia konkretnej ramki, nie do implementacji bez kontekstu.

## Wdrożenie

- Kontekst wysokiej jakości i screenshoty ramek 3:1806, 9:2301, 9:2876, sesja 2a193222-6c37-42e7-af91-9b1686031991. Na ich podstawie adaptowano hero, karty i kontakt do istniejących komponentów Astro. Nie kopiowano React/Tailwind ani trialowych fontów.
- Nowy motyw elevate w schemacie i site.md; style ograniczone do data-theme=elevate. Natural-warm pozostaje dostępny. Oferta przeniesiona przed O mnie, zachowane wszystkie dane/sekcje i flagi.
- Grafiki Figma pobrane wskazanym curl -L do src/assets/elevate, metadane potwierdzone: pliki niepuste, ikona 87×87, rastry o oryginalnych wymiarach. Astro generuje lokalne WebP 1600 px: około 7–22 KiB każda. Brak tymczasowych URL w stronie. Poświaty są dekoracyjne, ukryte przed czytnikiem i ograniczone do swoich sekcji.
- Bez logo Elevate, plakietki partnera Webflow i fikcyjnych referencji; świadoma adaptacja do własnej firmy zgodnie ze zleceniem. Systemowy font zamiast oryginalnych TRIAL. Źródła/licencja i zmiany opisane w docs/DESIGN-SOURCES.md oraz stopce.
- Nie dołączono odrzuconego portretu, nie zmieniono cen/danych kontaktowych, brak nowych zależności lub usług. Nieśledzony agama-mockup poza zmianami.

## Weryfikacja

- npm run check: 0 błędów/ostrzeżeń/hintów.
- npm run site:validate: kod 0, znane ostrzeżenie o dwóch miejscach do uzupełnienia.
- Pierwszy build wykrył CTA #kontakt na podstronach. Poprawiono normalizację do /#kontakt; ponowny npm run build: kod 0, linki, CSP i budżety zasobów poprawne. Wniosek zapisano w istniejącej notatce o regresjach.
- Pierwszy test:e2e: brak przeglądarek w domyślnym cache (12 testów nie wystartowało; 2 kontrole HTTP przeszły). Po wskazaniu istniejącego PLAYWRIGHT_BROWSERS_PATH=/tmp/ai-engineering-browsers: wszystkie 14 testów Chromium/mobile przeszły. Bez instalacji nowych zależności.
- Zrzuty desktop 1440 px i mobile 320 px przejrzane: czytelny nagłówek, karty i kontakt, bez poziomego przewijania. Test obejmuje również 200% tekstu, reduced-motion i axe. To emulacja, nie fizyczny iPhone.
- W przeglądarce GPT sprawdzono stronę, CTA Zobacz ofertę oraz Kontakt. Grafiki hero i ikona załadowane, geometria ikony 87×87; dekoracyjne tła mają świadomie powiększone, przycięte warstwy jak referencja.
- Po przewinięciu do Kontakt potwierdzono załadowanie obu lokalnych teł lazy (naturalWidth > 0), a widok kontaktu przejrzano. Ograniczono szerokość wąskiej kolumny treści na podstronach do 800 px.
- ESLint zmienionego kodu: kod 0; npm test: wszystkie 11 testów logiki przeszło. Przed wysłaniem ponowne check/build oraz formatowanie i przegląd różnic.

## Publiczny odbiór i ograniczenia

Rzeczywisty Preview URL, pełny SHA i końcowe wyniki CI są zapisywane w opisie lub komentarzu PR po wysłaniu, aby sam zapis adresu w logu nie zmieniał zatwierdzanej wersji. Podgląd ma wymagać osobnej decyzji właściciela. Produkcja pozostaje bez zmian; nie scalać. Nie przeprowadzono testu na fizycznym iPhonie, a testy lokalne obejmują aktywny motyw Elevate. Macierz CI sprawdza także dotychczasowe warianty startera.
