# Zdjęcie z żaglówki

- Stan: zakończona implementacja i kontrola lokalna; publiczny podgląd i decyzja właściciela przed publikacją.
- Specyfikacja: ../specs/implemented/2026-10-28-zdjecie-wtopione.md.
- Plan: nowa propozycja na aktualnym main, edycja zdjęcia, CSS hero, kontrole lokalne, PR i zweryfikowany podgląd. Nie włączać odrzuconych PR #17/#24.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/27.
- Imagegen: edycja nowego załącznika z żaglówki, kadr portretowy i rozmycie/przyciemnienie otoczenia do granatu i fioletu; następnie wyłącznie kodowanie JPEG dla wydajności. Oryginał załącznika pozostaje w /tmp/codex-remote-attachments; wynik PNG w /workspace/generated_images.
- site.md wskazuje nowe zdjęcie i alt. Zmiana CSS wyraźnie zlecona efektem wtopienia: maski gradientowe na brzegach, poświata, bez ramki, desktop dwie kolumny i mobile pod tekstem. Nie zmieniano doświadczenia ani CTA.
- Pierwszy build: zbyt ciężki PNG fallback (limit 200 KiB hero na telefonie). Po kodowaniu do JPEG ponowny build przeszedł, zdjęcie źródłowe około 151 KiB; generowane warianty AVIF/WebP/JPG.
- Końcowe site:validate/build/check: kod 0; typy 30 plików, 0 błędów. Linki, kotwice, CSP i budżety poprawne. Pozostaje znane ostrzeżenie o dwóch miejscach do uzupełnienia.
- npm test: 11/11. Chromium 320/390/1440: zdjęcie zdekodowane, CTA widoczne, brak overflow; przejrzano zrzuty. Axe mobile: 0 naruszeń WCAG A/AA. Pierwszy pomocniczy skrypt axe wymagał jawnego browser.newContext; poprawiono skrypt kontroli, bez zmian aplikacji. Bez fizycznego telefonu.
- Końcowe maski są przecięciem gradientów poziomego i pionowego, aby brzegi zanikały całkowicie; twarz pozostaje ostra. Kontrola po ostatnim CSS: build/check i zrzuty 320/390/1440 ponownie poprawne.
- Pełny SHA, link PR i rzeczywisty Preview URL z wynikami publicznej kontroli będą zapisane w opisie PR, aby adres nie zmieniał weryfikowanego commita. Nie wykonano publikacji.
