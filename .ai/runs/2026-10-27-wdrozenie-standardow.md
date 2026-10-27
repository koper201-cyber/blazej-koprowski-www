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

Nie wymyślam kontaktu ani domeny. Nie scalę PR i nie opublikuję strony produkcyjnej. Konfiguracja konta Cloudflare, dane terenowe CWV i przekazanie na telefonie wymagają weryfikacji poza lokalnym wdrożeniem.

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
- Po instrukcji właściciela używana jest wyłącznie przeglądarka GPT (IAB). Potwierdzono w niej konto GitHub koper201-cyber; Cloudflare wymaga osobnego logowania.
- Automatyczna kontrola odrzuciła początkowe otwarcie Connect GitHub. Po wyjaśnieniu właściciel zezwolił na otwarcie podglądu uprawnień. Zgoda nie obejmuje zatwierdzenia instalacji ani szerszych uprawnień.
- Oczekiwanie na logowanie Cloudflare w IAB; nie utworzono projektu ani nie opublikowano strony.
