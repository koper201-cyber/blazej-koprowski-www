# Bezpieczne treści i testowanie wariantów strony

Data: 2026-10-27. Wnioski potwierdzone podczas wdrożenia standardów.

- Parser YAML normalizował daty przed walidacją. Silnik JSON_SCHEMA zachowuje tekst, dzięki czemu schemat odrzuca nieistniejące dni. Utrzymywać testy dat niecytowanych i granic DST.
- `marked` nie sanitizuje HTML, a samo JSON.stringify nie zabezpiecza kontekstu tagu script. Używać wspólnych granic `renderSafeMarkdown` i `serializeJsonLd`; testować DOM wynikowego dokumentu.
- Zielony build strony bez formularza nie potwierdza dostępności formularza. Fixture ujawniło brak ukrycia honeypota przed czytnikiem ekranu; poprawiono `hidden` i `aria-hidden`. Macierz CI obejmuje stronę, demo, formularz preview i minimalne sekcje.
- Test klawiatury wymaga fokusowalnego celu skip-linka (`tabindex=-1` na main). Test powiększenia ujawnił przepełnienie długich słów i szerokości pól formularza; zachować kontrolę 320 px i 200% tekstu.
- Raporty Playwright zawierają JS; należy wykluczać je także z tsconfig, aby diagnostyka kodu nie analizowała plików raportu.
- Audit zależności wykrył wysokie podatności starszych Sharp i Zod. Wdrożono Sharp 0.35.5 i Zod 4.6.7, dostosowując API błędów i prefault. Nowy lockfile i czyste npm ci muszą przechodzić przed akceptacją.
- Firefox nie uruchomił się lokalnie (błąd profilu macOS); nie uznawać tego testu za zaliczony. Chromium, profil mobile i WebKit są testowane lokalnie; pełny workflow Linux udostępnia również Firefox.

- Po migracji Astro kolejność CSS nadpisywała kolor z site.md. Usunięto zbędną wartość domyślną z arkusza; test przeglądarkowy porównuje aktywny token z ustawieniem motywu.
- Adaptacja Elevate ujawniła, że dodatkowy CTA w wspólnym nagłówku nie może używać samego `#kontakt` na podstronach. Normalizować lokalne kotwice do `/#kontakt`; istniejący check-links wykrywa brak celu na 404, stronie podziękowania i polityce prywatności. Dotyczy wszystkich wspólnych komponentów nawigacyjnych.
- Przy ofercie aplikacji kontrola reflow nie wykryła nieestetycznego łamania „oprogramowanie” w nagłówku 320 px. Zrzut widoku ujawnił problem: zmniejszono mobilną typografię hero z kontaktem i skrócono powtórzoną etykietę. Oprócz braku overflow przeglądać rzeczywiste łamanie słów. Stały pasek kontaktu wymaga miejsca w układzie, safe-area i kontroli fokusu przy stopce; sam full-page screenshot umieszcza pasek na wysokości początkowego viewportu, więc do oceny używać również zrzutów viewportu.
