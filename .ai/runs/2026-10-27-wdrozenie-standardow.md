# Wdrożenie standardów inżynieryjnych

- Stan: kod wdrożony i zweryfikowany lokalnie; przegląd PR i odbiór hostingu w toku.
- Data: 2026-10-27, Europe/Warsaw.
- Zlecenie: właściciel potwierdził wdrożenie specyfikacji z PR #5 (plik `2026-10-27-tech-stack-i-standardy.md`). Obejmuje to opisane zależności i konfigurację narzędzi.
- Specyfikacja: [stos i standardy](../specs/2026-10-27-tech-stack-i-standardy.md).

## Plan

1. Zablokować zgodne wersje, Node LTS i instalację npm ci; oddzielić migrację frameworka w historii Git.
2. Dodać sanitizację Markdown, bezpieczny JSON-LD, walidację danych i wspólny model widoku.
3. Dodać testy regresji, kontrole artefaktów i budżety zasobów.
4. Uruchomić formatowanie, lint, ścisłe typy, testy i browser/accessibility dla strony oraz demo.
5. Skonfigurować bezpieczne CI i dokumentację, opisać sprawy zależne od kont/danych właściciela i dostarczyć PR.

## Ograniczenia

Nie wymyślam kontaktu ani domeny. Nie scalam PR samodzielnie. Właściciel rozszerzył zlecenie o konfigurację Cloudflare Pages. Dane terenowe CWV i przekazanie na telefonie wymagają osobnego odbioru.

## Wykonanie i wyniki

- Migracja Astro 7.4.2 i TypeScript 6.0.3 zweryfikowana na Node 24.22.1: typy, główna strona oraz demo ze zdjęciami. Zapisana w osobnym commicie f715f23 i gałęzi codex/migracja-astro.
- Dodano sanitizację HTML/JSON-LD, parser zachowujący daty, model widoku, DST, bezpieczne linki, walidację zdjęć i nagłówki CSP z hashami.
- Dodano Node tests, Playwright/axe, formatowanie, ESLint, ścisłe typy, kontrolę linków HTML i budżetów zasobów oraz CI z 4 wariantami.
- Kontrola obrazu demo i formularza wykryła i pozwoliła naprawić skip-link, reflow 320px/200%, honeypot i nadpisanie koloru.
- npm audit wykrył 2 wysokie podatności (Sharp i Zod). Po migracji do Sharp 0.35.5 i Zod 4.6.7: 0 podatności. Zmiana planu i źródła zapisane w specyfikacji.
- Czyste npm ci oraz npm run verify: poprawnie. 11 testów logiki, 84 przypadki browser z axe, widokami desktop/mobile i powiększeniem: poprawnie. Build strony i pełnego demo: poprawnie, w tym AVIF/WebP i budżety. Istnieją ostrzeżenia o przykładowych danych właściciela.
- Firefox na macOS: próba nieudana (nie można utworzyć profilu). Po sprawdzeniu kanonicznych ścieżek zrezygnowano z dalszych lokalnych prób; nie maskowano tego jako sukces. Workflow Linux pozwala uruchomić Firefox ręcznie.
- Sprawdzono różnice; site.md i dane demo nie zmienione. Treści właściciela zachowane. Nowe fixture są jawnie fikcyjne i nie wysyłają wiadomości.
- Specyfikacja pozostaje aktywna, ponieważ odbiór usług i telefonu nie jest zakończony.

## Rozpoczęta konfiguracja Cloudflare

- Właściciel zlecił podłączenie Pages i zalogował się. Ekran integracji skierował firmową sesję Chrome do SSO Autoliv; nie nadano dostępu ani nie kontynuowano firmowego logowania.
- Po instrukcji właściciela używana jest wyłącznie przeglądarka GPT (IAB). Potwierdzono w niej konto GitHub koper201-cyber i logowanie do Cloudflare.
- Automatyczna kontrola odrzuciła początkowe otwarcie Connect GitHub. Po wyjaśnieniu właściciel zezwolił na otwarcie podglądu uprawnień. Zgoda nie obejmuje zatwierdzenia instalacji ani szerszych uprawnień.
- Właściciel następnie zatwierdził instalację Cloudflare Workers and Pages z uprawnieniami pokazanymi przez GitHub, wyłącznie dla koper201-cyber/blazej-koprowski-www. Integracja zainstalowana.
- Utworzono projekt blazej-koprowski: gałąź produkcyjna main, komenda npm run build, katalog dist, NODE_VERSION=24.22.1 dla produkcji i podglądów. Pierwsze wdrożenie commita 253454e zakończyło się sukcesem. Publiczny adres: https://blazej-koprowski.pages.dev/; początkowy 522 ustąpił po odświeżeniu, potwierdzono treść strony w przeglądarce. Produkcja ma nadal przykładowy kontakt@example.com z istniejącego site.md; nie zastępowano go wymyślonym adresem.
- Za zgodą właściciela dodano zakres workflow do istniejącej autoryzacji GitHub CLI; właściciel wykonał dodatkowe potwierdzenie e-mailem. Nie zmieniano globalnych poświadczeń Git.
- Kod wysłany do codex/wdrozenie-standardow. Utworzono draft PR #7 do codex/migracja-astro. Niczego nie scalono.
- CI PR #6 wykryło niezgodny Node 22 ze starszej konfiguracji. Nowy workflow w PR #7 korzysta z .node-version (24.22.1).
- Podgląd PR #7: https://b1e4aa82.blazej-koprowski.pages.dev/ — potwierdzono stronę z paskiem PODGLĄD. Automatyczne podglądy wszystkich gałęzi poza main oraz komentarze buildów są włączone.
- GitHub Actions run 40568643659: wszystkie 5 zadań zaliczone, Cloudflare Pages również. Dodatkowy run 40569030168 z all_browsers=true: wszystkie 5 zadań zaliczone, obejmuje Chromium, Firefox i WebKit na Linux dla 4 wariantów. Lokalny problem profilu Firefox nie występuje na runnerze Linux.
- Środowisko Codex: właściciel zalogował się do ChatGPT w IAB i potwierdził MFA. Po osobnych zgodach na odczyt e-maili i operacje konektora zainstalowano ChatGPT Codex Connector wyłącznie dla blazej-koprowski-www. Prywatne środowisko przygotowano, zweryfikowano i opublikowano 2026-10-28 — [wynik konfiguracji](2026-10-28-codex-chmura.md).
