# Ikony oferty

- Stan: implementacja i kontrole lokalne zakończone; oczekiwanie na podgląd i decyzję właściciela.
- Właściciel zlecił ikony i informację o szkoleniach z programowania AI.
- Specyfikacja: ../specs/implemented/2026-10-28-ikony-oferty.md.
- Plan: komponent SVG i styl Elevate, tekst site.md, walidacja/build/check, kontrola mobile/desktop i publiczny podgląd. Bez publikacji.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/29.
- Pięć ikon SVG dobieranych po temacie tytułu (z wariantem domyślnym), aria-hidden i focusable=false; bez zależności. Zastąpiono ikonę pierwszej karty i strzałki wspólnym stylem fiolet/limonka.
- site.md: „Szkolenia z programowania z AI oraz z baz danych, ETL i BI dla zespołów”. Inne treści bez zmian.
- site:validate/build/check: kod 0; 31 plików typów, 0 błędów. Znane ostrzeżenie o dwóch miejscach do uzupełnienia. Linki, kotwice, CSP i budżety zasobów poprawne.
- Chromium 320/390/1440: pięć ikon i treść potwierdzone, brak overflow; przejrzano zrzuty mobile/desktop. Axe mobile 0 naruszeń. Bez testu na fizycznym telefonie. Brak nowej trwałej reguły do lessons.
- Pełny SHA i publiczny Preview URL z wynikami kontroli zapisujemy w opisie PR, aby nie zmieniać weryfikowanego commita samym adresem podglądu.
