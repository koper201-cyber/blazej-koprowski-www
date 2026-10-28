# Stos technologiczny i standardy inżynieryjne

- Data researchu: **2026-10-27**, Europe/Warsaw.
- Status: **wdrożenie repozytorium gotowe do przeglądu; odbiór operacyjny w toku**. Dokument pozostaje w `specs/`, ponieważ konfiguracja hostingu, rzeczywisty kontakt i test na telefonie wymagają odbioru.
- Projekt: osobista strona Błażeja Koprowskiego oraz starter stron dla małych firm, artystów i organizatorów warsztatów.
- Punkt odniesienia: [specyfikacja produktu v2](../../docs/SPEC.md), [zasady agentów](../../AGENTS.md).
- Zakres tego zadania: research i specyfikacja. Dokument nie oznacza instalacji nowych pakietów, aktualizacji frameworka, zmiany hostingu ani zgody na płatne usługi.

## 1. Rekomendacja i kryteria wyboru

**Pozostać przy Astro i statycznym generowaniu HTML, uporządkować istniejący kod i proces, a aktualizacje wersji wdrażać oddzielnie.** Docelowo: wspierana stabilna linia Astro, Node.js LTS, TypeScript strict, jeden kontrakt danych Zod, `site.md` + `zdjecia/`, zwykły CSS i małe skrypty przeglądarkowe. Wynikiem buildu pozostaje przenośny katalog `dist/`.

To decyzja projektowa oparta na wymaganiach, nie twierdzenie o uniwersalnie najlepszym frameworku. Kolejność kryteriów: łatwa edycja przez właściciela → niezawodność publikacji → dostępność i szybkość → mały koszt utrzymania → łatwość aktualizacji kolejnych stron. Popularność narzędzia sama w sobie nie uzasadnia migracji.

| Rozwiązanie | Dopasowanie do obecnego celu | Decyzja |
|---|---|---|
| Astro SSG + TypeScript | Komponenty, statyczne HTML, obrazy, istniejący działający kod | Wybrać |
| Eleventy | Sensowny generator treści; alternatywa przy budowie od zera | Nie przepisywać gotowego projektu bez mierzalnej korzyści |
| Next.js static export | Umożliwia statyczny eksport; dobry kandydat, gdy produkt wymaga rozbudowanego React | Na dziś nie uzasadnia kosztu migracji |
| Ręczne HTML/CSS | Mało narzędzi, lecz walidacja danych, zdjęcia i współdzielone szablony wymagają własnego procesu | Nie zastępować Astro |
| CMS i własny backend | Uzasadnione dopiero przy redakcji niezależnej od Git, kontach użytkowników lub transakcjach | Poza obecnym zakresem |

Możliwości technologii: [Astro Islands](https://docs.astro.build/en/concepts/islands/), [Eleventy](https://www.11ty.dev/docs/), [Next.js static export](https://nextjs.org/docs/app/guides/static-exports). Ocena dopasowania w tabeli jest naszym wnioskiem, nie benchmarkiem tych produktów.

## 2. Stan repozytorium i luki

Odczytano `package.json`, konfigurację Astro, parser, schemat, komponenty, skrypty oraz CI. Obserwacje dotyczą kodu w gałęzi roboczej, nie potwierdzają stanu konta Cloudflare ani opublikowanej strony.

| Obszar | Obecnie | Docelowe działanie |
|---|---|---|
| Framework | `astro: ^5.13.0` | Przejście do wspieranej linii po osobnej migracji |
| Runtime | `engines.node >=20.3.0`, CI Node 22; lokalnie Node 26 | Jedna ustalona wersja Node 24 LTS w pracy lokalnej, CI i hostingu |
| Instalacja | Brak śledzonego `package-lock.json`; CI dopuszcza `npm install` | Commit lockfile, instalacja przez `npm ci` |
| Typy | Astro strict, Zod z typami wyprowadzanymi ze schematu | Zachować; usunąć lokalne `any` w walidatorze |
| Markdown | `marked.parse` → `set:html` bez sanitizacji | Jedna kontrolowana granica bezpiecznego HTML |
| JSON-LD | `JSON.stringify` w skrypcie `set:html` | Serializacja zabezpieczająca kontekst HTML i test regresji |
| Walidacja | Własny schemat i polskie komunikaty | Zachować kontrakt; testować daty, linki i obrazy na granicach |
| Linki po buildzie | Skanowanie atrybutów wyrażeniami regularnymi; sprawdzane ścieżki od `/` i kotwice | Dodać pokrycie linków względnych i regresje; parser HTML dopiero gdy potrzebny |
| Preview | Rozpoznanie przez `CF_PAGES_BRANCH`, baner i blokada indeksacji | Dodać test artefaktów produkcji i podglądu |
| Jakość | Walidator, `astro check`, build, demo i linki | Uzupełnić małe testy logiki i krytycznych zachowań |
| Dane właściciela | E-mail przykładowy, brak domeny i zdjęć | Uzupełnić danymi od właściciela przed startem produkcji |

Są to luki do rozpatrzenia w osobnych zmianach. Samo przejrzenie kodu nie jest pełnym audytem bezpieczeństwa ani dowodem wystąpienia wszystkich potencjalnych błędów.

## 3. Docelowy tech-stack i polityka wersji

### 3.1. Zestaw docelowy

| Warstwa | Wybór | Zasada wdrożenia |
|---|---|---|
| Generator | Astro, `output: "static"` | Bez adaptera serwerowego dla samego `dist/` |
| Runtime buildu | Node.js **24 LTS**, npm | Ta sama zatwierdzona wersja poprawkowa w każdym środowisku |
| Język | TypeScript strict, ESM | Wersja zgodna z Astro i `@astrojs/check`; bez automatycznego przeskoku na najnowszy major |
| Dane | `gray-matter` + Zod | Jeden parser i jeden schemat; dane treści pozostają w YAML/Markdown |
| Długie teksty | `marked` + sanitizacja HTML na etapie buildu | Kandydat sanitizera: `sanitize-html`; osobna zgoda na nową zależność zgodnie z `AGENTS.md` |
| Obrazy | `astro:assets`, Sharp, istniejący `heic-convert` | Konwersja HEIC przed walidacją wymagającą pliku wynikowego |
| Interfejs | `.astro`, semantyczny HTML, CSS custom properties | Bez frameworka UI dla podstawowej strony |
| JavaScript klienta | Małe moduły TypeScript | Tylko rzeczywista interakcja; podstawowe treści i nawigacja bez JS |
| Hosting | Cloudflare Pages, integracja Git | Zachować obecny model; nie zmieniać konfiguracji konta w ramach specyfikacji |
| CI | GitHub Actions | Walidacja i testy; publikację realizuje integracja hostingu |
| Kontakt | `mailto:`; opcjonalny Web3Forms | Przycisk e-mail działa bez skonfigurowanego formularza |
| Testy logiki | Wbudowane `node:test` + `node:assert/strict` | Użyć obecnego `tsx` do plików TS; bez drugiego runnera |
| Testy przeglądarki | Playwright, opcjonalnie `@axe-core/playwright` | Etap rozszerzenia jakości, nowe devDependencies wymagają osobnego wdrożenia |
| Format i lint | Prettier + plugin Astro; ESLint + TypeScript + plugin Astro | Proponowane narzędzia developerskie, nie są obecnie zainstalowane |

Źródła możliwości: [obrazy Astro](https://docs.astro.build/en/guides/images/), [Zod i wyprowadzanie typów](https://zod.dev/basics), [node:test](https://nodejs.org/api/test.html), [Playwright](https://playwright.dev/docs/best-practices), [testy dostępności](https://playwright.dev/docs/accessibility-testing). Dobór zestawu i etapów to decyzja tej specyfikacji.

### 3.2. Wynik weryfikacji wersji

Odczyt rejestru npm, bez instalacji, na dzień researchu:

| Pakiet | Odczyt | Znaczenie |
|---|---|---|
| `astro` | latest `7.4.2`; Node `>=22.23.4`, npm `>=9.6.5` | Kandydat docelowy: 7.4.2; sprawdzić wszystkie migracje 5 → 6 → 7 |
| `@astrojs/check` | `0.9.12`; peer TypeScript `^5.0.0 \|\| ^6.0.0` | Najnowszy TypeScript nie musi być zgodny z narzędziami Astro |
| `typescript` | latest `7.0.2` | Nie wybierać automatycznie tej wersji przy wskazanym peer dependency |
| `zod` | latest `4.6.7` | Migracja z obecnego Zod 3 wymaga dostosowania komunikatów i testów |

Polecenia researchu: `npm view astro dist-tags.latest engines --json`, `npm view @astrojs/check version peerDependencies --json`, analogicznie `npm view` dla TypeScript i Zod. Tabela jest migawką, nie gwarancją zgodności całego zestawu. Przy wdrożeniu wybrać konkretny patch TypeScript w obsługiwanej linii 5 lub 6, wpisać rzeczywiste wersje do PR i zatwierdzić je wspólnymi testami. Nie migrować jednocześnie Zod i frameworka, jeśli utrudnia to wskazanie przyczyny regresji.

Oficjalna dokumentacja potwierdza linię Astro 7 i potrzebę przejrzenia zmian: [aktualizacje Astro](https://docs.astro.build/en/upgrade-astro/), [migracja v6](https://docs.astro.build/en/guides/upgrade-to/v6/), [migracja v7](https://docs.astro.build/en/guides/upgrade-to/v7/). Node 24 ma wsparcie LTS; wybór tej linii daje dłuższy horyzont niż Node 22. Źródło: [harmonogram Node.js](https://github.com/nodejs/Release).

Zmiana domyślnego renderowania Markdown w nowym Astro nie zastępuje automatycznie naszego `marked.parse` w `load-site.ts`. Po migracji trzeba także sprawdzić odstępy między elementami HTML i wynikowe formaty zdjęć, a nie tylko pomyślny build.

### 3.3. Reprodukowalność

- Dodać i śledzić `package-lock.json`. `npm install` służy do świadomej aktualizacji; zwykłe odtworzenie projektu odbywa się przez `npm ci`.
- Wybrać konkretny aktualny patch Node 24 i zapisać go w jednym pliku wersji; konfiguracja CI oraz hostingu ma z niego korzystać albo jawnie odzwierciedlać tę samą wartość. Research wskazuje 24.22.1 jako dostępną wersję LTS, lecz przed wdrożeniem sprawdzić nowsze poprawki bezpieczeństwa.
- Przenieść wyłącznie narzędzia developerskie do `devDependencies`; środowisko budujące musi je instalować. Wygenerowany `dist/` nie potrzebuje Node ani zależności npm.
- Nie naprawiać konfliktów przez `--force`, `--legacy-peer-deps` lub `npm audit fix --force`. Usunąć przyczynę niezgodności i sprawdzić pełny zestaw.
- Majory w osobnych PR; poprawki bezpieczeństwa priorytetowo. Co miesiąc przegląd zależności i wsparcia, z rzeczywistym testem demo.

`npm ci` wymaga lockfile i nie aktualizuje go podczas instalacji: [dokumentacja npm](https://docs.npmjs.com/cli/v11/commands/npm-ci/). Aktualne wydania Node: [oficjalne pobieranie](https://nodejs.org/en/download).

## 4. Architektura i wzorce projektowe

### 4.1. Przepływ danych

```text
site.md + zdjecia/
  → odczyt i przygotowanie HEIC
  → parsowanie YAML/Markdown
  → walidacja i normalizacja danych
  → bezpieczne HTML + model widoku
  → komponenty Astro + metadane SEO
  → dist/
  → kontrola artefaktów i linków
  → podgląd PR → decyzja właściciela → produkcja
```

Środowisko (`SITE_FILE`, gałąź, domena, data) wchodzi przez jawny kontekst. Kod parsera i modelu widoku nie może importować Astro ani wymagać przeglądarki.

### 4.2. Wzorce, które stosujemy

| Wzorzec | Zastosowanie | Granica złożoności |
|---|---|---|
| Functional core, imperative shell | Czyste funkcje dat, filtrów, URL i danych; odczyt plików i CLI na zewnątrz | Zwykłe funkcje i parametry, bez kontenera DI |
| Pipeline | Oddzielne etapy odczytu, walidacji, sanitizacji i renderowania | Jeden jawny przebieg; bez ukrytych efektów przy imporcie |
| Schema-first / single source of truth | Zod określa kontrakt, typy powstają przez `z.infer` | Bez ręcznych kopii interfejsu `SiteData` |
| Composition over inheritance | `Base`, `Photo`, `Contact` i sekcje składane przez propsy | Bez klas bazowych komponentów |
| Model widoku | Raz ustalona widoczność sekcji, lista wydarzeń i metadane | Menu, treść i JSON-LD korzystają z tych samych decyzji |
| Progressive enhancement | Strona działa jako HTML; JS tylko ulepsza zachowanie | Wyspy frameworkowe dopiero przy konkretnej potrzebie |
| Adapter na granicy usługi | Kontakt z dostawcą formularza zamknięty w komponencie | Bez uniwersalnej platformy integracji |
| Design tokens | Wspólne kolory, spacing, typografia w CSS variables | Nowy motyw zmienia tokeny, nie kopiuje całej strony |

Schemat wysp i brak konieczności runtime dla komponentów `.astro` opisuje [Astro](https://docs.astro.build/en/concepts/islands/). Pozostałe wzorce są naszym wyborem organizacji istniejącej małej aplikacji.

### 4.3. Organizacja kodu

Zachować `src/pages`, `layouts`, `components`, `lib`, `styles` oraz cienkie skrypty CLI w `scripts/`. Dodać `tests/` dopiero wraz z testami. Moduły `dates.ts`, `urls.ts`, `seo.ts` lub `safe-html.ts` wydzielać, gdy izolują realną odpowiedzialność; nie tworzyć pustych warstw na zapas.

Przykładowe kontrakty do wdrożenia: `parseSite(source) → wynik lub lista błędów`, `buildViewModel(data, context) → widoczne sekcje i wydarzenia`, `renderSafeMarkdown(markdown) → bezpieczny HTML`. Konkretne nazwy dopasować do obecnego API, żeby nie przepisywać projektu dla samej nomenklatury.

Nie wprowadzać Redux, ORM, mikroserwisów, CQRS, DDD z wieloma warstwami, monorepo ani własnego systemu pluginów. Nowe repo klienta nadal powstaje z szablonu. Zmiany silnika przenosić do klientów małymi, przetestowanymi PR z numerem wersji startera i instrukcją aktualizacji; nie nadpisywać treści klienta.

## 5. Coding standards

### 5.1. TypeScript i moduły

- ESM, `import type` dla typów, `const` domyślnie, funkcje o jednej odpowiedzialności. Identyfikatory po angielsku, komunikaty właściciela i dokumentacja po polsku.
- Typy wejścia spoza programu: `unknown`, następnie zawężanie lub Zod. Nie dodawać `any`, `@ts-ignore` ani rzutowań tylko w celu wyciszenia błędu. Udokumentowany wyjątek musi mieć ograniczony zakres.
- Zachować Astro strict. Po osobnym sprawdzeniu zgodności włączyć `noUncheckedIndexedAccess` i `exactOptionalPropertyTypes`; nie zakładać, że samo `strict` obejmuje te opcje.
- Na publicznych granicach modułów jawne typy wyników. Oczekiwane błędy walidacji zwracać jako wynik z listą problemów; nieoczekiwane awarie I/O zgłaszać z kontekstem, bez ukrywania błędu w pustej wartości.
- Dane wejściowe nie są mutowane podczas sortowania lub normalizacji. Zegar i ustawienia środowiska przekazywać jawnie do logiki, aby dało się ją testować.
- `process.exit` tylko w wejściu CLI. Import modułu nie powinien czytać plików, uruchamiać konwersji ani kończyć procesu.

Zakres `strict` i zalecenia integracji: [TypeScript](https://www.typescriptlang.org/tsconfig/strict.html), [Astro TypeScript](https://docs.astro.build/en/guides/typescript/).

### 5.2. Formatowanie i lint

Docelowy zestaw: Prettier z `prettier-plugin-astro`, ESLint z konfiguracją recommended dla Astro i TypeScript. Jeden formatter; ESLint wykrywa błędy, nie konkuruje z formatowaniem. Przewidywane komendy `format:check` i `lint` zostaną dodane dopiero w osobnym PR narzędziowym.

Format: UTF-8, LF, końcowa nowa linia, dwie spacje, średniki i podwójne cudzysłowy w TS; automatyczna obsługa łamania wierszy. Formatowanie starego repo wykonać oddzielnie od zmiany zachowania. Wykluczyć `dist`, `.astro`, `generated-images`, `node_modules` i binarne zdjęcia. Nie dodawać pre-commit hooków wymaganych do zwykłej edycji z telefonu.

Konfigurację recommended i plugin formatujący potwierdzają [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) oraz [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro). Konkretne reguły są propozycją projektu, nie obowiązkiem narzuconym przez biblioteki.

### 5.3. Kontrakt danych

- Nieznane klucze są błędem, a nie cicho pomijanym polem. Zmianę schematu wdrażać razem z przykładem, komunikatami i migracją danych.
- Ceny produktów i wydarzeń: skończona nieujemna liczba PLN; formatowanie przez `Intl.NumberFormat`. Tekstowa cena oferty pozostaje osobnym świadomym formatem.
- Daty: zachować surowy zapis `YYYY-MM-DD` aż do sprawdzenia poprawności kalendarzowej. Unikać normalizacji nieistniejących dat przez parser YAML/`Date` przed walidacją; przetestować niecytowane daty YAML.
- Godzina `HH:mm`; strefa `Europe/Warsaw`. Zachować obecną regułę ukrywania po dniu wydarzenia; przejście na dokładną godzinę zakończenia wymaga osobnego wymagania. W JSON-LD zdarzenie z godziną ma prawidłowy offset dla daty, uwzględniający DST.
- Linki walidować według celu: social media `https`, CTA może wskazywać istniejącą sekcję, kontakt `mailto`/`tel`; odrzucać nieoczekiwane schematy i linki `//host`. Sam wspólny regex nie opisuje wszystkich tych kontraktów.
- Nazwy obrazów: plik wewnątrz katalogu zdjęć, właściwy format, limit 15 MB, poprawny odczyt obrazu, opis alternatywny dla treści znaczącej. Nie ufać samemu rozszerzeniu.
- `features` jest źródłem widoczności także dla menu i odnośników. Wyłączenie kontaktu nie może zostawić kotwicy `#kontakt` prowadzącej donikąd.

## 6. Bezpieczeństwo i granice zaufania

Repozytorium i build są uprzywilejowane: autor kodu w PR może zmienić wynik strony. Treści właściciela i AI mimo tego podlegają walidacji. Statyczny hosting ogranicza zakres backendu, ale nie usuwa ryzyka XSS, wycieku sekretów czy ataku przez zależności.

1. Markdown przechodzi przez jeden sanitizer HTML działający podczas buildu. Proponowana allowlista: akapity, listy, nagłówki niższe od H1, wyróżnienia, cytaty i bezpieczne linki. Bez `script`, `iframe`, atrybutów zdarzeń i dowolnego stylu. Obrazy dodaje komponent obrazów, nie surowy HTML właściciela. Biblioteka sanitizująca wymaga osobnej decyzji o zależności; nie zastępować jej własnym regexem.
2. `set:html` wolno stosować tylko przy udokumentowanej granicy bezpieczeństwa. `JSON.stringify` samo nie wystarcza do osadzania danych w tagu `script`: serializator JSON-LD ma co najmniej kodować znak `<` jako `\u003c`, aby tekst `</script>` nie kończył elementu HTML. Testować rzeczywisty wygenerowany dokument.
3. Publiczny klucz Web3Forms pozostaje publiczny; tokenów GitHub i Cloudflare nie ma w repo, logach, artefaktach ani kodzie przeglądarki. W logach błędów nie zapisywać wiadomości z formularza.
4. Dla statycznych odpowiedzi określić `X-Content-Type-Options`, `Referrer-Policy` i CSP z ograniczeniem ramek. CSP najpierw zweryfikować na podglądzie: obecne style inline, JSON-LD, formularz i ewentualna analityka wymagają świadomej konfiguracji. Nie kopiować polityki z `unsafe-inline` jako rzekomego rozwiązania problemu. Dla skryptów inline preferować hashe generowane podczas buildu; nie stosować stałych nonce w statycznym HTML.
5. Pipeline PR działa bez sekretów wdrożeniowych, z minimalnymi uprawnieniami (`contents: read`) i bez uruchamiania niezaufanego kodu PR w uprzywilejowanym `pull_request_target`.

Uzasadnienie: [Marked nie sanitizuje HTML](https://marked.js.org/), [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [kandydat sanitize-html](https://github.com/apostrophecms/sanitize-html), [nagłówki Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/headers/), [bezpieczne GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use).

## 7. Dostępność, wydajność i SEO

### 7.1. Dostępność

Cel jakościowy: WCAG 2.2 AA. Semantyczne landmarki, jedno H1, logiczne nagłówki, skip link, pełna obsługa klawiaturą, widoczny i niezasłonięty fokus, etykiety i czytelne błędy formularza. Sprawdzić tekst przy powiększeniu 200%, reflow przy szerokości 320 CSS px i preferencję ograniczenia ruchu.

Kontrast tekstu zwykłego ≥4,5:1, dużego ≥3:1; istotnych elementów interfejsu ≥3:1. Mierzyć także stany hover/focus i tekst pomocniczy, nie tylko główny przycisk. Cel projektu dla przycisków: 44×44 CSS px; nie przedstawiać go jako bezwarunkowego minimum WCAG AA, gdzie kryterium 2.5.8 przewiduje 24×24 z wyjątkami. Automatyczne axe nie dowodzi pełnej zgodności — potrzebna kontrola ręczna.

Źródła: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).

### 7.2. Wydajność

Cele produkcyjne dla 75. percentyla oddzielnie mobile/desktop: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1. Gdy ruch jest za mały do danych terenowych, raportować brak danych; Lighthouse jest pomiarem laboratoryjnym i nie zastępuje INP użytkowników. Źródło progów: [Web Vitals](https://web.dev/articles/vitals).

Proponowane budżety projektu, do sprawdzenia na pierwszym wdrożeniu: własny JS początkowy ≤20 KiB gzip, CSS ≤30 KiB gzip, obraz hero dla telefonu zwykle ≤200 KiB. Każdy wyjątek wymaga uzasadnienia w PR. To nasze cele, a nie limity Astro lub Google.

Responsywne obrazy z rozmiarami, formatami i fallbackiem; tylko obraz LCP ładowany priorytetowo, pozostałe lazy. Preferować obecne fonty systemowe. Nie dodawać karuzel, animacji ani skryptów analitycznych bez potrzeby produktu. Metryki mierzyć na stronie z rzeczywistymi zdjęciami, nie wyłącznie na pustym szablonie.

### 7.3. SEO i publikacja

- Title, opis, canonical i linki absolutne powstają z jednego zatwierdzonego adresu strony.
- Produkcyjne dane strukturalne odzwierciedlają widoczne treści; bez wymyślonych opinii, cen i właściwości. Person/LocalBusiness, Product oraz Event tylko przy właściwych danych. Rich result nie jest gwarantowany.
- Sitemap nie zawiera 404 ani strony podziękowania; polityka prywatności może być indeksowana. Samo `noindex` nie usuwa adresu z sitemap, więc sprawdzić wynik konfiguracji integracji.
- Preview ma baner i `noindex` w HTML oraz nagłówku hostingu; blokada w robots nie zastępuje potwierdzenia tych ustawień. Sprawdzić, że produkcja nie odziedziczyła `noindex`.
- Przed startem uzupełnić kontakt i prawdziwą domenę, zweryfikować przekierowania oraz formularz. Treść o prywatności ma odpowiadać faktycznie włączonym usługom; nie deklarować analityki, jeśli jej nie uruchomiono.

Źródła: [Google structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/). Konfiguracja domeny i usług wymaga sprawdzenia rzeczywistego konta; research nie potwierdził ich wdrożenia.

## 8. Strategia testowania i CI

### 8.1. Co sprawdzamy

| Warstwa | Scenariusze istotne dla projektu |
|---|---|
| Unit / kontrakty | Brakujące i nieznane pola, ceny ujemne i nieskończone, daty nieistniejące i przestępne, niecytowane daty YAML, niebezpieczne URL |
| Reguły czasu | Wczoraj/dzisiaj/jutro, granica dnia w Warszawie, DST, brak mutacji listy podczas sortowania |
| Bezpieczeństwo treści | Markdown z `script`, `onerror`, złośliwym linkiem; JSON-LD zawierający `</script>` |
| Integracja buildu | Strona minimalna, pełne demo, wyłączone sekcje, produkcja i preview; menu/CTA/SEO zgodne z widocznymi sekcjami |
| Obrazy | Istniejący JPG, mały obraz, brakujący plik, limit rozmiaru, rzeczywisty HEIC z legalnego fixture lub urządzenia właściciela |
| Artefakty | Linki i kotwice również względne, brak 404 w sitemap, właściwy canonical/robots, prawidłowy HTML |
| Browser | Nawigacja klawiaturą, kontakt, brak przepełnienia mobile, obsługa formularza i stanów błędu, brak błędów JS |
| Przekazanie | Edycja z telefonu → PR → podgląd → Merge → Revert, w tym ścieżka dodania zdjęcia |

Każda naprawa błędu logiki dostaje test regresji, jeśli test da się stabilnie wykonać. Nie tworzyć testów kopiujących implementację ani snapshotów całej strony po każdej zmianie tekstu. Nie ustalać arbitralnego celu 100% coverage. Próg jakości to pokrycie powyższych ryzyk.

Runner logiki: `node:test`. Proponowana komenda po utworzeniu testów: `node --import tsx --test tests/*.test.ts`; zweryfikować ją na wybranym Node i faktycznym układzie plików przed dodaniem do CI. Vitest rozważono, ale przy obecnej logice Node nie uzasadnia kolejnego runnera; wrócić do niego przy testach zależnych od środowiska Vite. Źródła: [Node test runner](https://nodejs.org/api/test.html), [Vitest](https://vitest.dev/guide/).

Playwright testuje zbudowany projekt, używa selektorów ról/etykiet i automatycznego oczekiwania. Nie wysyła prawdziwych formularzy w każdym CI: mock odpowiedzi dostawcy w testach automatycznych, jedno uzgodnione wysłanie testowe przy wdrożeniu formularza. Chromium dla szybkiego PR; Firefox/WebKit przy zmianach UI i przed wydaniem szablonu. Retry może zbierać ślad awarii, ale nie ukrywać niestabilnego testu. [Praktyki Playwright](https://playwright.dev/docs/best-practices).

### 8.2. Pipeline docelowy

1. Checkout i wspólny Node LTS; instalacja przez `npm ci` po dodaniu lockfile.
2. Format/lint po wdrożeniu narzędzi; kontrola typów `npm run check`.
3. Testy logiki i przygotowanie HEIC przed samodzielnym `site:validate`, żeby walidacja na czystym checkout nie wymagała wcześniej wygenerowanych plików.
4. `npm run site:validate`, następnie `npm run build` z kontrolą artefaktów/linków.
5. `npm run demo:build` dla zmian silnika/schematu/stylów; nie nadpisywać artefaktu produkcji przez demo przed testami lub publikacją. Buildu klienta i demo używać w osobnych jobach albo zapisywać wynik oddzielnie.
6. Smoke browser i kontrola dostępności po dodaniu narzędzi, z fixture zamiast usług na żywo. Przekazywać raporty awarii jako artefakty.
7. PR dopuszczony do scalenia po zielonym checku i przeglądzie właściciela. Hosting ma publikować produkcję tylko z `main`.

Bieżące polecenia obowiązkowe z `AGENTS.md` pozostają w mocy. Nazwy `lint`, `format:check`, `test` i `test:e2e` są planem, nie istniejącymi skryptami. Dokumentacja nie może obiecywać, że już działają.

Minimalne uprawnienia CI, timeout i anulowanie starszych przebiegów; zachować stałą nazwę checka używaną w ochronie gałęzi. Akcje identyfikować niezmiennie: pełny SHA jako prosty punkt startowy, z komentarzem wersji i przeglądem aktualizacji. Oficjalna dokumentacja opisuje również workflow dependency lockfiles — rozważyć, gdy są dostępne i wspierane w danym repo. Nie wymieniać tagów automatycznie bez sprawdzenia wymagań runnera. Źródło: [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use).

## 9. Hosting, koszty i utrzymanie

Utrzymać Cloudflare Pages dla tego repo: build `npm run build`, output `dist`, production `main`, podglądy pozostałych gałęzi. To odpowiada [oficjalnej konfiguracji Astro na Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

Workers Static Assets jest realną alternatywą dla nowych wdrożeń. Przed zmianą porównać integrację Git, podglądy i ich ochronę, rollback, zmienne środowiskowe i cache. Szczególnie `CF_PAGES_BRANCH` jest dziś zależnością od Pages: na innym hostingu potrzebny adapter środowiska i test produkcja/preview. Samo istnienie Workers nie oznacza, że nasze Pages wymaga natychmiastowej migracji. Źródło: [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).

Budżet: bez nowej płatnej infrastruktury, bazy i serwera. Plan darmowy ma limity, więc nie obiecywać kosztu 0 zł niezależnie od skali. Na dzień researchu Pages Free opisuje 500 buildów miesięcznie i 20 000 plików na stronę; oddzielnie liczą się usługi formularza, domena i abonament AI. Przed wdrożeniem ponownie sprawdzić limity konta i [limity Pages](https://developers.cloudflare.com/pages/platform/limits/); dla alternatywy sprawdzić [cennik Workers](https://developers.cloudflare.com/workers/platform/pricing/).

Nie uruchamiać monitoringu ani cyklicznych zadań bez zlecenia właściciela. Docelowo przy przeglądzie wydania sprawdzić stan formularza, domeny i certyfikatu, wynik CI oraz sposób cofnięcia zmian. Revert w repo przywraca źródła; rollback hostingu służy awaryjnie i wymaga późniejszego uzgodnienia z Git.

## 10. SDD, PR i utrwalanie decyzji

Stosować istniejące `AGENTS.md`, bez kopiowania procesu do kolejnego regulaminu. Dla każdego wdrożenia z poniższego planu przygotować specyfikację lub doprecyzować odpowiednią część tej; w PR wskazać kryteria akceptacji i rzeczywiste wyniki kontroli. Plan ma opisywać kroki i ryzyka, a nie wewnętrzny tok rozumowania modelu.

Decyzja architektoniczna powinna mieć: problem → rozważone warianty → wybór → konsekwencje → warunek ponownego rozpatrzenia. Dla tej skali wystarczy sekcja specyfikacji; osobny katalog ADR dopiero gdy liczba decyzji zacznie utrudniać szukanie. Po poprawce zapisać potwierdzony wniosek w `.ai/lessons/` i indeksie, zgodnie z istniejącą instrukcją. Instrukcje ogólne pozostają w `AGENTS.md`, importowane przez `CLAUDE.md`.

## 11. Plan wdrożenia

Priorytety to kolejność prac, nie zgoda na implementację w ramach tego zadania. Nowe zależności i zmiany kodu/konfiguracji pozostają osobnymi zleceniami zgodnie z `AGENTS.md`.

| Etap | Zakres | Warunek zakończenia |
|---|---|---|
| P0.1 — powtarzalność | Lockfile, jeden Node LTS, `npm ci`, udokumentowana macierz wersji | Czyste checkout w CI i hostingu buduje się w tym samym zatwierdzonym środowisku |
| P0.2 — wspierany silnik | Mała migracja Astro 5 → 6 → 7, zgodne integracje i TS | Główna strona, demo, zdjęcia i preview przechodzą testy; brak automatycznego TS 7 |
| P0.3 — bezpieczeństwo treści | Sanitizacja Markdown, bezpieczny JSON-LD, testy regresji | Złośliwe fixture nie wykonują skryptu i nie przerywają struktury dokumentu |
| P0.4 — gotowość publikacji | Prawdziwy kontakt/domena, zgodna polityka prywatności, noindex preview, ochrona `main` | Przejście całej ścieżki publikacja/cofnięcie oraz test kontaktu |
| P1.1 — kontrakt danych | Testy dat/YAML/linków/sekcji, refaktoryzacja `any`, model widoku | Scenariusze graniczne z sekcji 8 przechodzą, treści właściciela zachowane |
| P1.2 — standardy narzędziowe | Format/lint, smoke browser, dostępność, budżety wydajności | Powtarzalne kontrole w CI i ręczny przegląd mobile/keyboard |
| P2 — kolejne wdrożenia | Uporządkowany transport poprawek startera, drugi motyw tylko przy potrzebie | Drugi klient bez kopiowania silnika z ręcznymi poprawkami treści |
| Później — warunkowo | Zod 4, Workers, Content Collections lub CMS | Oddzielny problem produktu, analiza migracji i zatwierdzony zakres |

P0.4 można prowadzić równolegle do technicznych poprawek, ale uruchomienie publiczne wymaga zamknięcia istotnych ryzyk P0. Content Collections rozważyć przy wielu stronach artykułów; dla jednego `site.md` własny mały parser z walidacją wystarcza.

## 12. Kryteria akceptacji

### Gotowość tej specyfikacji

- [x] Decyzje wynikają z obecnego produktu i przejrzanego kodu.
- [x] Rozdzielono stan istniejący, rekomendację i migracje; podano datę researchu i źródła pierwotne.
- [x] Opisano stos, wzorce, coding standards, bezpieczeństwo, testy, CI, dostępność, SEO, koszty i wdrożenie etapami.
- [x] Wersje i ograniczenia zgodności sprawdzono w dokumentacji/rejestrze, bez instalacji nowych narzędzi.
- [x] Specyfikacja nie zmienia produktu ani obowiązujących instrukcji.

### Gotowość przyszłej implementacji

- [ ] Instalacja i build są powtarzalne na zatwierdzonym Node LTS z lockfile.
- [x] Astro, integracje, TypeScript i Zod mają udokumentowane zgodne wersje.
- [x] Testy kontraktu i bezpieczeństwa treści działają, a błędy pozostają zrozumiałe po polsku.
- [x] Minimalna strona, demo i kombinacje wyłączonych sekcji mają poprawne linki, SEO i obrazy.
- [x] Klawiatura/mobile, kontakt i podstawowy odczyt strony działają bez frameworka klienta.
- [x] Sprawdzono cele dostępności i wydajności oraz udokumentowano braki danych terenowych.
- [ ] Preview i produkcja mają właściwą indeksację i działający scenariusz rollback/Revert.
- [ ] Właściciel wykonuje zmianę z telefonu bez edycji kodu i akceptuje publikację przez PR.

## 13. Ryzyka i ustalenia potrzebne przed wdrożeniem

- Dokładna konfiguracja Cloudflare, ochrona `main`, domena i działanie formularza nie zostały sprawdzone na koncie. Nie traktować deklaracji w README jako dowodu działania.
- Migracja major frameworka może zmienić HTML, obrazy i zależności; testy demo i porównanie wygenerowanych stron są warunkiem wdrożenia.
- Test HEIC wymaga legalnego, reprezentatywnego pliku; należy potwierdzić zachowanie zdjęcia z docelowego telefonu. Sam build demo z JPG nie testuje HEIC.
- Brak aktualnych pomiarów produkcyjnych wydajności; budżety w tej specyfikacji są propozycją, nie wynikiem benchmarku.
- Nie przeprowadzono audytu prawnego ani pełnego audytu bezpieczeństwa. Treść dokumentu określa wymagania techniczne i nie deklaruje zgodności prawnej.
- Dane biznesowe, e-mail, domenę i zgodę na dodatkowe narzędzia pozyskać przed pracami, które od nich zależą. Nie blokuje to ukończenia researchu.

## 14. Raport wdrożenia — 2026-10-27

Właściciel zlecił wdrożenie tej specyfikacji. Prace obejmują kod i konfigurację, bez scalenia PR i publikacji produkcyjnej.

- Wersje wdrożone: Node 24.22.1, Astro 7.4.2, TypeScript 6.0.3, Zod 4.6.7, Sharp 0.35.5. Zod 4 przyspieszono po wykryciu [podatności starszej linii](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5); Sharp uaktualniono po [advisory librsvg](https://github.com/advisories/GHSA-wq5f-xc86-pv6w). Research z sekcji 3 pozostaje historyczną migawką.
- Dodano lockfile, czyste npm ci, podział dependencies/devDependencies, format, lint, strict z dodatkowymi opcjami oraz macierz CI.
- Wdrożono sanitizację Markdown, bezpieczny JSON-LD, hashe CSP, nagłówki preview, walidację obrazów, dat i URL, model widoku, względne linki, offsety DST oraz budżety JS/CSS/hero.
- Testy: 11 scenariuszy Node (w tym 64 kombinacje flag), 84 przypadki browser (po 21 dla strony, demo, formularza-preview i strony minimalnej). Dostępne lokalnie Chromium/profil telefonu/WebKit przeszły testy. Firefox lokalnie nie uruchamia się z powodu błędu profilu macOS; nie uznano go za zaliczony. Pozostaje dostępny w ręcznym workflow na Linux.
- npm audit po aktualizacjach: 0 znanych podatności. Zbadano zrzuty desktop/mobile; naprawiono fokus skip-linka, przepełnienie przy 200% tekstu, honeypot formularza i nadpisywanie koloru z site.md przez CSS.
- CI sprawdza każdy wariant niezależnie, bez mieszania artefaktów demo i produkcji. Dokumentacja operacyjna: [ENGINEERING.md](../../docs/ENGINEERING.md).
- Nadal otwarte: konfiguracja kont Cloudflare i ochrony gałęzi, prawdziwy e-mail/domena i formularz, rzeczywisty HEIC z telefonu, terenowe CWV i ścieżka telefon → PR → Merge → Revert. Nie deklarujemy pełnej zgodności WCAG ani gotowości produkcji bez tego odbioru.
- Zod 4 został wdrożony z przyczyn bezpieczeństwa; Workers/CMS/Content Collections oraz drugi motyw pozostają poza zakresem.
