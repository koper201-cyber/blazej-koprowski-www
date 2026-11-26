# Wersja angielska strony z przełącznikiem flag

- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/52
- Stan: w realizacji.

## Cel

Strona dostępna po polsku (bez zmian adresów) i po angielsku pod `/en/`. Przełącznik z flagą PL i flagą angielską w prawym górnym rogu nagłówka.

## Decyzje

- Treść angielska w osobnym pliku `site.en.md` obok `site.md`. Zawiera **wyłącznie teksty**: `seo`, `hero` (heading, text, cta_label, alt), `about_photo` (alt, caption), `offer`, `testimonials` oraz sekcje `# About me` i `# Privacy policy`. Dane wspólne (kontakt, zdjęcia, domena, kolory, włączone sekcje) pochodzą tylko z `site.md`.
- Brak `site.en.md` = strona jednojęzyczna: brak tras `/en/` i przełącznika (demo i fixture testowe bez zmian).
- Adresy: `/` ↔ `/en/`, `/polityka-prywatnosci/` ↔ `/en/privacy-policy/`, `/dziekuje/` ↔ `/en/thank-you/` (poza sitemap). Kotwice sekcji (`#o-mnie`, `#oferta`, `#kontakt`) wspólne, by `hero.cta_link` działał w obu językach.
- Teksty interfejsu (menu, przyciski, stopka, formularz) w słowniku `src/lib/i18n.ts`.
- Ikony oferty dobierane po polskim tytule pozycji o tym samym numerze.
- Przełącznik: dwa linki z flagami SVG (bez skryptów i stylów inline — CSP), `aria-label`, `hreflang`, `lang`, `aria-current` dla aktywnego języka. Komputer: na końcu nagłówka; telefon: w pierwszym wierszu obok nazwy, menu w drugim wierszu.
- SEO: `<html lang>`, `og:locale`, `link rel="alternate" hreflang` (pl, en, x-default=pl), canonical per język; obie wersje w sitemap.
- Walidator: błędy w `site.en.md` po polsku; liczba pozycji `offer`/`testimonials` musi się zgadzać z PL; wymagane tłumaczenia pól obecnych w PL (hero.text, cta_label, about_photo.alt) i obu sekcji; brak tłumaczenia podpisu zdjęcia = ostrzeżenie (podpis nie jest pokazywany po angielsku).
- Produkty i warsztaty nie mają jeszcze tłumaczeń treści (na tej stronie są wyłączone); etykiety interfejsu są przetłumaczone.

## Kryteria akceptacji

Jak w issue #52.

## Weryfikacja

- CI: format, lint, typy, testy jednostkowe (scalanie tłumaczenia, walidacja), build wszystkich wariantów, testy przeglądarkowe (axe na `/en/`, przełączanie języka, reflow 320 px).
- Podgląd Cloudflare: HTTP 200 dla `/`, `/en/`, `/en/privacy-policy/`; przełącznik na telefonie i komputerze.
