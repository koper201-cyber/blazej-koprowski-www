# Portret i cofnięcie dopisku Autoliv

- Stan: zakończone przygotowanie i kontrole lokalne; oczekiwanie na podgląd i decyzję właściciela.
- Cel: przesłany portret w hero i przywrócenie opisu Autoliv bez freelance na prośbę właściciela.
- Prosta zmiana treści i zdjęcia, bez osobnej specyfikacji i zmian kodu.
- Plan: zapis potrzeby w issue, zdjęcie i site.md, walidacja/build, kontrola mobilna i desktop, PR i rzeczywisty podgląd.
- Wspólna wersja ze zdjęciem wymaga nowej decyzji właściciela przed publikacją.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/16; korekta poprzedniej zmiany #14 / PR #15.
- Zapisano oryginalny załącznik jako zdjecia/blazej-koprowski.jpg; hero korzysta z istniejącego kadru 4:3, zaokrągleń i responsywnego układu. Bez edycji wyglądu osoby lub kodu.
- site.md: zdjęcie i alt oraz usunięcie freelance tylko przy Autoliv.
- npm run site:validate: kod 0, jedno istniejące ostrzeżenie o dwóch miejscach do uzupełnienia.
- npm run build: kod 0, optymalizacja zdjęcia AVIF/WebP/JPG, poprawne linki i budżety JS/CSS.
- Chromium /usr/bin/chromium przez Playwright: 1440×1000 i 390×844; zdjęcie zdekodowane, brak poziomego overflow. Obejrzano zrzuty /tmp/portret-desktop.png i /tmp/portret-mobile.png. Nie jest to test na fizycznym telefonie.
- Pełny SHA, PR i kontrola publicznego podglądu zostaną zapisane w opisie PR. Produkcja nie została zmieniona.
