# Mniejszy portret

- Stan: edycja i minimalna kontrola zakończone; podgląd oraz końcowe wyniki kontroli w PR.
- Issue #40, PR #41. Korekta w ramach specyfikacji ../specs/implemented/2026-10-30-portret-i-kapitan.md; bez nowej funkcji.
- Cel i plan: zmniejszyć wyłącznie ramkę hero o około 15–20% na komputerze i telefonie, zachować oprawę, zdjęcie O mnie i treści; przegląd różnic i diff --check, push, sprawdzony podgląd od razu, potem kontrole CI i widoku.
- Zmiana: limit 500 → 400 px na desktopie; 460 → 380 px i 85% zamiast 100% szerokości kontenera w mniejszych widokach. Bez edycji obrazu, zależności, danych kontaktowych i pozostałych treści.
- Minimalna kontrola przed push: zakres różnic i git diff --check. Build/testy w Cloudflare i CI równolegle, bez blokowania wysłania podglądu. Wyniki, pełny SHA i Preview URL zapisywane w PR po wysłaniu, bez zmieniania SHA samą dokumentacją adresu.
- Bez merge, brak testu na fizycznym iPhonie; agama-mockup/ poza zakresem. Przeczytano dotychczasowy log i lessons o iteracjach portretu.
