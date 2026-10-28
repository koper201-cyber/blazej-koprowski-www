# Nagłówek o programowaniu z AI

- Stan: zakończona zmiana i weryfikacja lokalna; odbiór publicznego podglądu w PR.
- Cel: podmiana nagłówka zgodnie z wyborem właściciela w podglądzie Elevate.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/20
- PR: https://github.com/koper201-cyber/blazej-koprowski-www/pull/21
- Zakres: wyłącznie `hero.heading` w `site.md`; prosta zmiana treści bez osobnej specyfikacji.
- Plan: zmienić tekst, uruchomić walidację i build, sprawdzić różnice, wysłać do istniejącej gałęzi i zweryfikować nowy podgląd. Bez merge.
- Zmieniono nagłówek na dokładnie: „Twój pomysł. Moje doświadczenie. Oprogramowanie tworzone z AI.” Pozostałe treści bez zmian.
- Weryfikacja: npm run site:validate i npm run build zakończone kodem 0; znane ostrzeżenie o dwóch miejscach do uzupełnienia. Linki, kotwice i budżety zasobów poprawne. Przegląd różnic i git diff --check przed wysłaniem.
- Rzeczywisty adres nowego podglądu, SHA i wynik kontroli widoku zostaną zapisane w opisie PR po publikacji, aby zapis adresu nie zmieniał weryfikowanego commita. Bez testu na fizycznym telefonie i bez merge. Nie ma nowej trwałej reguły wymagającej osobnej notatki lessons.
