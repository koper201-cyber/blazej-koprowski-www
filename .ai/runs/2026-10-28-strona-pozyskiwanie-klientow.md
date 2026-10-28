# Strona nastawiona na zapytania

- Stan: zakończona implementacja i weryfikacja lokalna; podgląd i wyniki CI zapisane w PR po wysłaniu.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/22; portfolio zapisane oddzielnie w #23, bez implementacji.
- Specyfikacja: [strona pozyskująca klientów](../specs/implemented/2026-10-28-strona-pozyskiwanie-klientow.md).
- Start: od main ceba825; gałąź codex/strona-pozyskiwanie-klientow. Nieśledzony agama-mockup/ poza zakresem.
- Przeczytano AGENTS, indeks lessons, notatki o regresjach, user story i podglądach oraz specyfikację Elevate i ostatnie logi. Plan zatwierdzony przez właściciela; zmiany src/ i schematu są wyraźnie zlecone. Brak zgody na merge.
- Dane kontaktowe od właściciela w tej rozmowie: koper201@gmail.com, 506 531 430. W linku telefonicznym używamy polskiego prefiksu +48.
- Plan: zapisać opcjonalne sekcje i treść, dodać widok oraz mobilny kontakt, sprawdzić kompatybilność, dostępność i wygląd, przygotować PR z rzeczywistym podglądem. Bez nowych usług i zależności.
- Wdrożono opcjonalny sales w schemacie i site.md, cztery problemy klienta w offer, proces, zaplecze i informację dla dużych organizacji, biografię foundera oraz SEO. Zachowano wszystkie stanowiska, umiejętności i wykształcenie; szkolenia jako informacja uzupełniająca. Bez portfolio, zależności i nowych usług.
- Podano kontakt u góry i w Kontakt, linki tel/mailto oraz mobilny pasek z safe-area i miejscem w układzie. Pasek zależy od sales.mobile_contact i features.contact; stare warianty bez sales nie dostają nowych sekcji. Podstrony zachowują poprawne kotwice.
- npm run site:validate, npm run build: sukces; znane ostrzeżenie o jednym komentarzu UZUPEŁNIJ, kontakt nie jest już przykładowy. CSP, linki/kotwice i budżety zasobów poprawne. npm run check: 0 błędów/ostrzeżeń/hintów. ESLint src/tests, Prettier zmienionych plików i git diff --check: sukces.
- npm test: 12/12. npm run test:e2e z PLAYWRIGHT_BROWSERS_PATH=/tmp/ai-engineering-browsers: 16/16 Chromium/mobile; axe, 320 px, 200% tekstu, reduced-motion, bez JS, telefon/e-mail i geometria stopki/fokusu pod stałym paskiem. Brak rzeczywistego połączenia telefonicznego lub wysyłki wiadomości.
- Tymczasowy /tmp/site-sales-disabled.md: usunięte process/expertise, features.contact false; build i 2 testy przeglądarkowe nowego scenariusza przeszły. Potem odtworzono build właściwego site.md. Starsze warianty demo/formularz/minimalny sprawdzane dodatkowo przez CI.
- Przejrzano pełne zrzuty desktop/mobile i zrzuty viewportów 1440/320 oraz stopki. Poprawiono łamanie długiego słowa w hero na 320 px, ponowny build/check i 16 testów przeszły. Wniosek dodano do istniejącej notatki o regresjach.
- Ograniczenia: brak fizycznego iPhone'a i testu z osobą spoza IT. Test odbioru z człowiekiem i tygodniowe zbiorcze liczenie wartościowych zapytań opisano w OWNER_GUIDE, do wykonania przez właściciela. Bez automatycznego śledzenia i bez obietnic konwersji.
- Rzeczywisty Preview URL, pełny SHA, wynik kontroli publicznego widoku i CI zapisujemy w PR po publikacji podglądu, aby sam zapis adresu nie zmieniał weryfikowanej wersji. Bez merge i bez zmiany produkcji; oczekuje osobna decyzja właściciela.
