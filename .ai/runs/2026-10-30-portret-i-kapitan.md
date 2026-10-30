# Portret i kapitan projektu

- Stan: zakończona implementacja i kontrola lokalna; publiczny odbiór oraz CI zapisane w PR po wysłaniu.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/40.
- Specyfikacja: ../specs/implemented/2026-10-30-portret-i-kapitan.md.
- Gałąź: codex/portret-i-kapitan, od aktualnego main 52451d3. Nieśledzony agama-mockup/ nietknięty.
- Sprawdzono aktualny GitHub: PR #24 jest odrzucony i zamknięty bez merge; nie przywracamy jego treści. Aktualna strona ma zdjęcie przy sterze w hero i nową biografię z #34.
- Przeczytano lessons, notatki o regresjach/podglądach, log minimalistycznego hero i bieżący kod. Nowe zdjęcie obejrzane w załączniku; istniejące kapitańskie potwierdzone lokalnie. Bez potrzeby ponownego wysłania zdjęcia przez właściciela.
- Plan: zachować obecny wygląd i wielkość nagłówka; nowy portret w hero, zdjęcie przy sterze w opcjonalnym about_photo i krótka metafora kapitana. Następnie walidacja, build, check, kontrola obrazów i widoków mobile/desktop, nowy PR i rzeczywisty podgląd. Bez merge.
- Nowy oryginalny PNG 2,3 MB zapisano jako zdjecia/blazej-portret.png bez zmian obrazu; hero używa nowego alt. Obecne zdjęcie żeglarskie przeniesione do widoku O mnie poprzez opcjonalne about_photo, z opisem podejścia kapitana do realizacji. Pozostała treść main zachowana, również wcześniejsza pisownia opisu hero zgodna z osobnym zleceniem właściciela; brak zmian kontaktu.
- Dodano obsługę opcjonalnego zdjęcia O mnie w schemacie/widoku i kontrolę w walidatorze. Hero eager, zdjęcie kapitańskie lazy; pusta figura nie powstaje bez bloku lub przy ukrytym O mnie. Bez nowych zależności/backendu.
- Pierwszy build: błąd budżetu 200 KiB przez fallback PNG hero, mimo lekkich source AVIF/WebP. Dodano opcjonalny fallbackFormat w Photo, WebP tylko dla hero; drugi build i budżety przeszły. Źródło PNG bez zmian. Wniosek zapisano w istniejącej notatce o regresjach.
- site:validate i końcowy build: kod 0, istniejące ostrzeżenie o dwóch miejscach UZUPEŁNIJ bez zmian. Linki/kotwice i CSP poprawne. check: 0 błędów, ostrzeżeń i hintów. ESLint src/scripts i Prettier zmienionych plików: sukces. npm test: 11/11; npm run test:e2e: 14/14 Chromium/mobile (axe, 320 px, 200% tekstu, reduced-motion, klawiatura, bez JS). Przejrzano zrzuty desktop 1440 i mobile 320, widoczne oba obrazy, brak overflow.
- Przeglądarki testowej po dwóch dniach brakowało w cache; przywrócono Chromium przez istniejące npx playwright install chromium bez zmiany zależności. Bez testu na fizycznym telefonie.
- Pełny SHA, Preview URL z checka Cloudflare, wyniki CI i kontrola publicznych obrazów zostaną zapisane w opisie PR, aby dokumentacja adresu nie zmieniała zatwierdzanej wersji. Bez merge i bez publikacji produkcyjnej.
