# Przycisk — tu i teraz

- Stan: zakończona zmiana treści; podgląd publiczny i decyzja właściciela przed publikacją.
- Cel: zmienić tylko tekst głównego CTA na „Porozmawiajmy tu i teraz”; zachować odnośnik i pozostałą treść.
- Prosta zmiana treści, bez osobnej specyfikacji.
- Plan: issue, site.md, walidacja i build, przegląd różnic, PR i rzeczywisty podgląd; osobna decyzja właściciela przed publikacją.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/25.
- Zmieniono wyłącznie hero.cta_label; nie zmieniano linku przycisku ani innych treści. Bez nowych lessons: prosta realizacja żądania, bez korekty błędu lub nowej reguły.
- npm run site:validate i npm run build: kod 0; istniejące ostrzeżenie o dwóch miejscach do uzupełnienia. Linki, kotwice i budżety JS/CSS poprawne.
- Chromium 390 i 1440 px: główny CTA widoczny, cel #kontakt, brak poziomego overflow. Pierwsza kontrola zakładała jeden link o tym tekście na całej stronie, lecz desktop ma także CTA w nagłówku; poprawiono selektor testu na sekcję hero. Bez testu na fizycznym urządzeniu.
- Pełny SHA, link PR i wynik publicznego podglądu zostaną zapisane w opisie PR, aby nie zmieniać weryfikowanego commita samym zapisem adresu. Produkcja bez zmian.
