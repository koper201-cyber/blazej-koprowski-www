# Standardy inżynieryjne — starter 0.2.0

Decyzje i zakres: [specyfikacja](../.ai/specs/2026-10-27-tech-stack-i-standardy.md). Zasady pracy i akceptacji zmian: [AGENTS.md](../AGENTS.md).

## Środowisko

Node **24.22.1** z `.node-version`, npm 11. Astro **7.4.2**, TypeScript **6.0.3**, `@astrojs/check` **0.9.12** i Zod **4.6.7**, Sharp **0.35.5**. Migrację Zod przyspieszono po wykryciu podatności w starszej linii. Wszystkie rzeczywiste wersje zależności określa `package-lock.json`.

Instaluj `npm ci`. Aktualizując świadomie pakiety, użyj `npm install`, sprawdź ich engines/peerDependencies i dołącz lockfile. Nie omijaj konfliktów wersji flagami force/legacy-peer-deps. Po aktualizacji wykonaj kontrole poniżej.

## Kontrole

```bash
npm ci
npm run verify
npx playwright install chromium firefox webkit
npm run test:e2e:all
```

`verify` sprawdza format, ESLint, Astro/TypeScript strict, testy Node, obrazy i kontrakt treści, a następnie buduje stronę. Build generuje `_headers` z hashami CSP oraz kontroluje linki względne, kotwice i sumaryczne budżety zasobów (JS 20 KiB gzip, CSS 30 KiB gzip). Nie jest to pomiar LCP/INP użytkowników.

`npm run format` formatuje kod i konfigurację. Historyczne instrukcje i specyfikacje oraz dane `site.md` są wyłączone z masowego formatowania, aby nie mieszać redakcji treści z kodem. `npm run lint` i `npm run check` wykrywają błędy kodu; `npm test` testuje reguły produktu. Testy nie zastępują ręcznej kontroli klawiatury, powiększenia i poprawności treści.

Testy browser uruchamiają własny serwer lokalny z nagłówkami zbudowanego artefaktu. Każdy wariant buduj i testuj oddzielnie; demo nadpisuje lokalny `dist/`:

```bash
npm run demo:build
npm run test:e2e:all
SITE_FILE=tests/fixtures/site.md CF_PAGES_BRANCH=test-preview npm run build
CF_PAGES_BRANCH=test-preview npm run test:e2e:all
SITE_FILE=tests/fixtures/minimal.md npm run build
npm run test:e2e:all
npm run build
```

Pliki w `tests/fixtures/` mają wyłącznie dane fikcyjne. Formularz w testach używa przechwyconej odpowiedzi dostawcy — nie wysyła wiadomości. Chromium i profil telefonu wykonują się na każdym CI; Firefox/WebKit można włączyć ręcznie przez workflow_dispatch (`all_browsers`). W macOS WebKit domyślna nawigacja do linków używa Option+Tab; test uwzględnia to zachowanie systemu.

## Granice modułów i bezpieczeństwo

- `content.ts` odczytuje YAML bez zamiany dat na Date; `site-schema.ts` jest jedynym kontraktem pól.
- `safe-html.ts` sanitizuje Markdown i serializuje JSON-LD. Tylko wynik tych granic może trafiać do `set:html`; styl inline zawiera wyłącznie kolor sprawdzony przez schemat.
- `view-model.ts` określa widoczne sekcje, nawigację, CTA i warsztaty. `dates.ts` ustala offset Warszawy z uwzględnieniem DST; nieistniejąca godzina jest błędem, podwójna godzina jesienna wybiera wcześniejsze wystąpienie.
- Skrypty CLI realizują I/O, a czyste funkcje są testowane bez Astro. Nowe narzędzia są zależnościami deweloperskimi; hosting buildu musi je instalować.
- CSP nie zawiera `unsafe-inline` ani stałych nonce. Nagłówki mają zostać opublikowane wraz z `dist/`; serwer `astro preview` sam ich nie egzekwuje, użyj `preview:secure`.
- Dodanie zewnętrznych skryptów, analityki lub nowego dostawcy formularza wymaga aktualizacji i testu CSP. Formularz HTML zachowuje standardową walidację przeglądarki i odpowiedź dostawcy, bez dodatkowego frameworka UI.

## CI i publikacja

CI ma minimalne uprawnienia i akcje przypięte do SHA. Oddzielne joby sprawdzają stronę, demo, formularz preview oraz minimalny zestaw sekcji. Artefakty testów awarii przechowywane są przez 7 dni. Nie ma sekretów wdrożeniowych ani deployu w GitHub Actions.

Cloudflare Pages: build `npm run build`, output `dist`, produkcja `main`, podglądy gałęzi. Ustaw `NODE_VERSION` zgodnie z `.node-version`; potwierdź użycie lockfile i instalację devDependencies w logu hostingu. Preview ma blokadę indeksacji w HTML, robots i `_headers`; produkcja nie może jej odziedziczyć.

Ochrona `main` powinna wymagać także zielonych jobów przeglądarkowych, nie tylko `Sprawdzenie strony`. Nie wykonuj Merge automatycznie. Awaryjnie rollback w hostingu, a potem Revert w Git, aby uzgodnić źródła z produkcją.

## Warunki odbioru poza repozytorium

Przed uruchomieniem produkcji właściciel musi podać prawdziwy e-mail i domenę. Do sprawdzenia pozostają: ustawienia Cloudflare i ochrony gałęzi, nagłówki na rzeczywistym preview, formularz na prawdziwy adres, zgodność polityki prywatności z aktywnymi usługami, zdjęcie HEIC z telefonu, pomiary terenowe CWV i cały scenariusz telefon → PR → podgląd → Merge → Revert. Automatyczne axe nie jest certyfikatem zgodności WCAG.

Nie publikuj fikcyjnego formularza ani danych `tests/fixtures/`. Kolejny motyw lub klient wymagają osobnego zlecenia. Aktualizacje startera przenoś do klientów przez przetestowane PR z numerem wersji i zachowaniem ich `site.md` i zdjęć.
