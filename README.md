# AI Website Starter

Jedna baza kodu + jeden plik `site.md` + folder `zdjecia/` = nowa strona. Po przekazaniu właściciel zmienia stronę z telefonu przez agenta AI w chmurze (Codex albo Claude Code): **zgłoszenie → user story → issue → przygotowanie zmiany → sprawdzony podgląd → zatwierdzenie albo odrzucenie**. Operacje GitHub wykonuje agent; publikacja wymaga wyraźnej decyzji o pokazanej wersji.

Instrukcja dla właściciela strony: [`OWNER_GUIDE.md`](OWNER_GUIDE.md). Zasady dla agenta: [`AGENTS.md`](AGENTS.md).

Współdzielenie strony: [tryb edytora treści i aktywacja ochrony](docs/CONTENT-EDITOR.md). Sam plik instrukcji lub CODEOWNERS nie włącza zabezpieczeń GitHuba.

## Jak to działa

```
telefon → AI redaguje user story (dopytuje o braki) → GitHub Issue
zlecone wdrożenie issue → gałąź + PR → GitHub Actions (walidacja, build)
                                  └──► Cloudflare Pages: sprawdzony Preview URL konkretnego SHA
właściciel zatwierdza wersję → AI sprawdza SHA i kontrole → merge → produkcja
odrzucenie → zamknięcie propozycji bez zmiany produkcji
cofnięcie → nowy PR przywracający treść → podgląd → decyzja
```

- **Astro** (strona statyczna), **zod** (schemat `site.md`), zdjęcia optymalizowane do AVIF/WebP, HEIC z iPhone'a konwertowany automatycznie.
- Podglądy mają czarny pasek „PODGLĄD” i `noindex`, więc nie trafiają do Google.
- Minione warsztaty ukrywają się same (przy buildzie i w przeglądarce).

## Standardy inżynieryjne

Wersja startera: **0.2.0**. Używaj Node z `.node-version` i npm 11. Instalacja: `npm ci` (z zatwierdzonym `package-lock.json`). Hosting budujący musi instalować również devDependencies.

Pełny proces kontroli i ograniczenia wdrożenia: [docs/ENGINEERING.md](docs/ENGINEERING.md).

## Polecenia

| Polecenie                | Co robi                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| `npm ci`                 | instaluje zależności                                               |
| `npm run dev`            | podgląd lokalny na http://localhost:4321                           |
| `npm run site:validate`  | sprawdza `site.md` i zdjęcia, błędy po polsku                      |
| `npm run build`          | konwersja zdjęć → walidacja → build do `dist/` → test linków       |
| `npm run verify`         | formatowanie, lint, typy, testy logiki, walidacja i build          |
| `npm run test:e2e`       | testy Chromium i rozmiaru telefonu po buildzie                     |
| `npm run test:e2e:all`   | dodatkowo Firefox i WebKit                                         |
| `npm run preview:secure` | lokalny podgląd z nagłówkami CSP                                   |
| `npm run check`          | sprawdzenie typów (TypeScript/Astro)                               |
| `npm run demo:build`     | build strony demonstracyjnej z `examples/demo/` (wszystkie sekcje) |

## Nowa strona dla klienta (ok. 1–2 h)

### 1. Repozytorium

1. To repo oznacz jako szablon: _Settings → General → Template repository_.
2. Utwórz darmową **organizację GitHub** klienta (np. `pracownia-agnieszki`), dodaj klienta jako _Owner_.
3. W szablonie: **Use this template → Create a new repository** → właściciel: organizacja klienta, repo **publiczne** (ochrona gałęzi `main` jest za darmo tylko dla repo publicznych).

### 2. Treść

1. Wypełnij `site.md` (wzór wszystkich sekcji: `examples/demo/site.md`), wgraj zdjęcia do `zdjecia/`.
2. Ustaw `site.pages_project` — tę samą nazwę nadasz projektowi w Cloudflare.
3. `npm ci && npm run build` — musi przejść bez błędów.

### 3. Cloudflare Pages

1. _Workers & Pages → Create → Pages → Connect to Git_ → repo klienta.
2. Nazwa projektu = `site.pages_project`. Framework preset: **Astro**. Build command: `npm run build`. Output: `dist`.
3. Production branch: `main`. Preview deployments: **All non-production branches** (domyślnie).
4. Zmienna środowiskowa `NODE_VERSION` = wersja z `.node-version` (`24.22.1`) (Production i Preview).
5. _Custom domains_ → podłącz domenę klienta; potem wpisz ją w `site.domain`.
6. Analityka wymaga osobnego sprawdzenia CSP i treści o prywatności; obecna polityka nie dopuszcza zewnętrznego skryptu analitycznego.

### 4. Ochrona `main` (GitHub → Settings → Rules → Rulesets → New branch ruleset)

- Target: default branch.
- ✔ Restrict deletions, ✔ Block force pushes.
- ✔ Require a pull request before merging (0 wymaganych recenzji GitHub — właściciel zatwierdza pokazaną wersję w rozmowie).
- ✔ Require status checks to pass → dodaj **Sprawdzenie strony** (job z `check.yml`; pojawi się po pierwszym uruchomieniu).

### 5. Agent AI właściciela

**Codex (ChatGPT):** chatgpt.com/codex → _Settings → Environments → Create environment_ → wybierz repo.

- Setup script: `npm ci`
- Zachowaj ograniczony dostęp sieciowy: rejestry pakietów oraz dodatkowo `api.github.com`, `*.blazej-koprowski.pages.dev` i `blazej-koprowski.pages.dev` dla tej strony. Dla kopii startera użyj domen własnego projektu. Po zmianie zapisz szkic, sprawdź API i HTTP podglądu z chmury, a następnie opublikuj prywatne środowisko. Sama instalacja zależności nie zapewnia dostępu do GitHuba.
- Sprawdź, że w zakładce Code review / GitHub aplikacja ChatGPT Codex Connector ma dostęp do organizacji klienta.

**Claude Code (aplikacja Claude):** claude.ai/code → połącz GitHub → zainstaluj aplikację Claude GitHub na organizacji klienta → wybierz repo. W ustawieniach środowiska jako setup ustaw `npm ci` (albo dopuść dostęp do rejestru npm).

Oba agenty czytają zasady: Codex z `AGENTS.md`, Claude z `CLAUDE.md` (który odsyła do `AGENTS.md`).

Obowiązkowe przyjmowanie zgłoszeń opisuje [sekcja 10 AGENTS.md](AGENTS.md#10-zgłoszenia-z-telefonu-najpierw-user-story-i-issue). Formularz GitHub „Zmiana z telefonu” wymaga user story i kryteriów akceptacji. Przez API/CLI agent ma zapisać te same sekcje. Brak informacji oznacza dopytanie, a istniejące issue jest używane ponownie. Samo zapisanie pomysłu nie zleca jego wdrożenia.

### 6. Formularz kontaktowy (opcjonalnie)

Załóż darmowy klucz na web3forms.com na e-mail klienta i wpisz go w `contact.form_key`. Bez klucza strona pokazuje przycisk „Napisz e-mail”.

### 7. Przekazanie

1. Sprawdź stronę na telefonie i komputerze.
2. Zrób z klientem na jego telefonie jedną zmianę od początku do końca (OWNER_GUIDE.md).
3. Przetestuj plan z sekcji 14 specyfikacji (zmiana tekstu, ceny, warsztat, zdjęcie z telefonu, Revert, celowy błąd).

## Awaryjne cofnięcie

Cloudflare → projekt → _Deployments_ → poprzednie wdrożenie produkcyjne → **Rollback**. To natychmiast przywraca stronę, ale `main` dalej zawiera złą zmianę — zrób też **Revert** w GitHubie, żeby następny merge jej nie przywrócił.

## Ograniczenia MVP

- Brak koszyka, płatności i rezerwacji z limitem miejsc (zapisy przez link, np. Google Forms).
- Motywy `natural-warm` i `elevate`, wybierane przez `site.theme`; kolor główny z `site.primary_color`. Źródło adaptacji Elevate: [docs/DESIGN-SOURCES.md](docs/DESIGN-SOURCES.md).
- Ukrywanie minionych warsztatów działa w przeglądarce od razu, ale z kodu strony znikają przy kolejnym buildzie (każdy merge).
- Zapis zdjęcia załączonego w zadaniu agenta zależy od aplikacji — plan B opisany w `OWNER_GUIDE.md`.
- Cloudflare rozwija teraz głównie Workers Static Assets; strona to czysty `dist/`, więc ewentualna migracja to zmiana konfiguracji hostingu, bez zmian w kodzie.

## Struktura

```
site.md              treść i ustawienia (YAML + Markdown)
zdjecia/             zdjęcia klienta
examples/demo/       pełny przykład z fikcyjnymi danymi
src/lib/site-schema.ts   schemat site.md (jedyne źródło prawdy o polach)
src/lib/load-site.ts     wczytywanie site.md
src/pages/, src/components/, src/layouts/, src/styles/theme.css
scripts/validate-site.ts   walidator z błędami po polsku
scripts/prepare-images.ts  HEIC → JPG
scripts/check-links.ts     test linków wewnętrznych po buildzie
scripts/finalize-build.ts  nagłówki CSP i budżety zasobów
tests/                    testy logiki, przeglądarki i dane fikcyjne
.github/workflows/check.yml  CI (bez deployu — deploy robi Cloudflare)
```
