# AI Website Starter — specyfikacja produktu (MVP) · wersja 2

> **Zmiany względem v1 (po review, 27.10.2026):**
> - Agent AI niezależny od dostawcy: **Claude Code** (aplikacja Claude) **lub Codex Cloud** (ChatGPT). Oba działają w chmurze — komputer może być wyłączony.
> - `site.md`: dane strukturalne (produkty, warsztaty, kontakt) w **YAML frontmatter** walidowanym schematem; Markdown tylko na długie teksty.
> - Zdjęcia: folder `zdjecia/` + automatyczna konwersja (HEIC/JPG → WebP/AVIF) i optymalizacja w buildzie; plan B wgrywania przez github.com.
> - Cofanie zmian: główna metoda to **Revert** w GitHubie; rollback w Cloudflare tylko awaryjnie.
> - Ochrona `main`: repo publiczne (albo GitHub Pro), bo na darmowym koncie nie da się chronić gałęzi w repo prywatnym.
> - Deploy wyłącznie przez integrację Cloudflare z GitHubem; GitHub Actions tylko sprawdza.
> - Uproszczenia MVP: 1 motyw wizualny, formularz przez Web3Forms/Formspree, zapisy przez link (np. Google Forms), analityka bez cookies → bez banera.
> - Dodane: konfiguracja środowiska agenta, link do podglądu w opisie PR, plan testów, otwarte pytania.

---

## 1. Wizja
Wielokrotnego użytku starter do tworzenia szybkich, tanich w utrzymaniu stron dla małych firm, artystów i organizatorów warsztatów. Nowa strona = kopia startera + jeden plik `site.md` + folder zdjęć. Po przekazaniu właściciel aktualizuje stronę zwykłym językiem **z telefonu**, przez agenta AI w chmurze (Claude Code lub Codex), bez znajomości HTML, Git ani terminala. **Każdą zmianę ogląda na podglądzie przed publikacją i może ją cofnąć.**

**Zasada przewodnia:** „Jedna baza kodu + jeden opis klienta = nowa strona. AI pomaga klientowi utrzymywać ją po wdrożeniu”.

## 2. Dla kogo i jakie strony
- Strony wizytówkowe: o mnie, oferta, galeria, opinie, kontakt.
- Artyści i rękodzielnicy: katalog 5–20 produktów (np. mandale).
- Trenerzy i instruktorzy: wydarzenia, warsztaty, zapisy.
- Małe firmy usługowe: usługi, FAQ, lokalne SEO.

**Kolejność wdrożeń:** (1) strona wykonawcy jako test całego przepływu, (2) strona Agnieszki Marcinak — wizytówka, mandale, warsztaty oddechowe.

## 3. Cele i kryteria sukcesu
1. Nowa strona bez pisania od zera: „Use this template” + wypełnienie `site.md` + zdjęcia. Cel: **< 1 dzień pracy** na klienta.
2. Infrastruktura ~0 zł; płatne: domena, abonament AI właściciela (Claude lub ChatGPT), ewentualne prowizje płatnicze.
3. Właściciel z telefonu zmienia opis, zdjęcia, cennik, termin warsztatu, dodaje produkt.
4. Każda zmiana: walidacja → podgląd → akceptacja właściciela → publikacja. Każda odwracalna.
5. Repo, domena i konta (GitHub, Cloudflare, AI) należą do klienta.
6. Dobre Core Web Vitals, dostępność, indeksowalność, podstawy SEO.

## 4. Architektura
| Element | Wybór | Uwagi |
|---|---|---|
| Generator | **Astro** + TypeScript, SSG | Content/zod do walidacji, `astro:assets` do obrazów |
| Repozytorium | **GitHub**, jedno repo na klienta | Publiczne (ochrona `main` za darmo) lub prywatne + GitHub Pro |
| Hosting | **Cloudflare Pages** z integracją Git | Podgląd dla każdej gałęzi/PR, produkcja tylko z `main`. Cloudflare rozwija teraz głównie Workers Static Assets — konfigurację trzymamy prostą, żeby migracja była trywialna |
| CI | **GitHub Actions** — tylko kontrola | `site:validate`, typecheck, build, test linków. **Bez deployu** (robi go Cloudflare) |
| Agent AI | **Claude Code** (aplikacja Claude: web/mobile) **lub Codex Cloud** (ChatGPT) | Działa w chmurze, klonuje repo, tworzy PR. Zasady w `AGENTS.md`; `CLAUDE.md` odsyła do `AGENTS.md` |
| Formularz kontaktowy | **Web3Forms** lub **Formspree** (darmowy plan) | Klucz publiczny formularza w `site.md` jest OK (to nie sekret) |
| Zapisy na warsztaty | Link (Google Forms / zewnętrzny system) | Własny system zapisów poza MVP |
| Analityka | Cloudflare Web Analytics (bez cookies) | Bez cookies → baner zgody niepotrzebny |
| SEO | sitemap.xml, robots.txt, canonical, Open Graph, schema.org, Search Console | |

**Ważne:** abonament Claude/ChatGPT nie daje publicznego chatbota na stronie — to osobna integracja i koszt.

## 5. Wejście: plik `site.md`
Jeden plik, czytelny dla człowieka i jednoznaczny dla agenta:
- **Frontmatter YAML** — wszystko, co strukturalne: ustawienia, kontakt, oferta, produkty, warsztaty, opinie. Walidowane schematem zod (typy, wymagane pola, formaty dat i cen, istnienie zdjęć).
- **Treść Markdown** — tylko długie teksty, w sekcjach o stałych nagłówkach (`# O mnie`, `# Polityka prywatności` itd.).

Uzasadnienie: luźne listy typu `- Cena: 300 PLN` agent za każdym razem zapisze trochę inaczej, a parser nie odróżni literówki od nowego pola. YAML + schemat = pewna walidacja i czytelne błędy.

```md
---
site:
  name: "Pracownia Agnieszki"
  domain: "example.pl"
  language: "pl"
  theme: "natural-warm"
  primary_color: "#8A6C63"
  city: "Poznań"
seo:
  title: "Mandale i warsztaty oddechowe"
  description: "Autorskie mandale i spotkania z oddechem."
contact:
  email: "kontakt@example.pl"
  phone: ""
  form_key: ""            # klucz Web3Forms/Formspree; puste = tylko e-mail
  instagram: ""
hero:
  heading: "Mandale, oddech i chwile uważności"
  text: "Krótki opis działalności."
  cta_label: "Zobacz mandale"
  cta_link: "#produkty"
  image: "hero.jpg"       # plik z folderu zdjecia/
features:
  products: true
  workshops: true
  testimonials: false
offer:
  - title: "Mandale na zamówienie"
    text: "Krótki opis."
  - title: "Warsztaty oddechowe"
    text: "Krótki opis."
products:
  - name: "Mandala „Spokój”"
    price: 300            # liczba, w PLN
    image: "mandala-spokoj.jpg"
    status: "dostępna"    # dostępna | sprzedana | na zamówienie
    description: "Ręcznie wykonana mandala."
workshops:
  - title: "Spotkanie z oddechem"
    date: 2027-02-14      # RRRR-MM-DD
    time: "18:00"
    place: "Poznań"
    price: 150
    signup: "https://forms.gle/..."   # link lub mailto:
    image: ""
---

# O mnie
Biografia właścicielki (zwykły Markdown).

# Polityka prywatności
Treść polityki.
```

**Walidator (`npm run site:validate`)** zgłasza po polsku, z numerem pozycji, np.: „Produkt nr 2: brak ceny”, „Warsztat «Spotkanie z oddechem»: zła data «14.02» — użyj formatu 2027-02-14”, „Brak pliku zdjecia/mandala.jpg”. Warsztaty z datą w przeszłości są automatycznie ukrywane (bez kasowania z pliku). Klient nigdy nie edytuje komponentów Astro.

## 6. Zdjęcia
- Wszystkie zdjęcia w folderze **`zdjecia/`** w katalogu głównym repo (nie w `public/` — tam Astro ich nie optymalizuje).
- Akceptowane: JPG, PNG, WebP, **HEIC** (iPhone). Skrypt `prebuild` konwertuje HEIC → JPG (biblioteka JS, np. `heic-convert`, bo standardowy `sharp` nie czyta HEIC), potem `astro:assets` generuje WebP/AVIF w kilku rozmiarach.
- Limit rozmiaru pliku (np. 15 MB) i zalecenie nazw bez polskich znaków i spacji — walidator proponuje poprawną nazwę.
- Tekst alternatywny: pole `alt` przy zdjęciu; jeśli brak, walidator ostrzega (nie blokuje).
- **Do przetestowania jako pierwsze:** czy zdjęcie załączone do zadania agenta z telefonu trafia do repo jako plik. **Plan B:** właściciel wgrywa zdjęcie przez github.com w przeglądarce telefonu (folder `zdjecia/` → *Add file → Upload files*), a potem prosi agenta o użycie go.

## 7. Proces tworzenia nowej strony (wykonawca)
1. „Use this template” → nowe repo klienta (na koncie klienta lub z przekazaniem własności).
2. Wypełnij `site.md`, wgraj zdjęcia do `zdjecia/`.
3. `npm run site:validate` i `npm run build`.
4. Cloudflare Pages: podłącz repo (build: `npm run build`, output: `dist`), produkcja = `main`, podglądy dla pozostałych gałęzi.
5. GitHub: ochrona `main` — wymagany PR i zielony check `check.yml`, zakaz force-push.
6. Środowisko agenta (Claude Code / Codex): podłącz repo, skrypt setup `npm ci` (agent zwykle pracuje bez internetu po starcie, więc zależności muszą być zainstalowane w setupie).
7. Sprawdź telefon + komputer, formularz, SEO. Podłącz domenę.
8. Przekaż: konta, `OWNER_GUIDE.md`, 5–10 gotowych poleceń do skopiowania. Zrób z klientem jedną zmianę na żywo.

## 8. Proces edycji z telefonu (właściciel)
1. Otwórz aplikację Claude (Code) lub ChatGPT (Codex) i wybierz repo strony.
2. Napisz, co zmienić, np.: „Dodaj warsztat 14 lutego o 18:00 w Poznaniu, cena 150 zł”.
3. Agent edytuje `site.md` (i ewentualnie `zdjecia/`), uruchamia walidację i build, tworzy **pull request**. W opisie PR podaje, co zmienił, i **link do podglądu**.
4. Cloudflare buduje podgląd (link także w komentarzu pod PR).
5. Właściciel ogląda podgląd na telefonie. Jeśli coś nie tak — pisze agentowi poprawkę w tym samym zadaniu.
6. Akceptacja = **Merge** PR (aplikacja GitHub lub github.com). Cloudflare publikuje w 1–2 min.
7. **Cofnięcie:** na scalonym PR przycisk **Revert** → nowy PR z podglądem → Merge. Awaryjnie (wykonawca): rollback do poprzedniego wdrożenia w panelu Cloudflare.

Zasady:
- Zmiany cen, linków płatności/zapisów i danych kontaktowych agent wypisuje w opisie PR w sekcji „⚠️ Do sprawdzenia” (stara → nowa wartość).
- Czerwony check w PR = coś się nie zgadza; właściciel pisze agentowi „napraw błąd w PR”.
- Pełny przepływ przetestować na docelowym telefonie każdego klienta. Na Androidzie wsparcie aplikacji dla agentów bywa słabsze — wtedy przeglądarka (claude.ai / chatgpt.com/codex).

## 9. Funkcje MVP
- Responsywny projekt, **1 motyw** (`natural-warm`) parametryzowany kolorem; kolejne motywy po drugim kliencie.
- Strony/sekcje: Start, O mnie, Oferta, Produkty, Warsztaty, Kontakt, Polityka prywatności, 404. Sekcje włączane flagami `features`.
- Katalog produktów i lista warsztatów z `site.md`; przeszłe warsztaty ukrywane.
- Optymalizacja obrazów (sekcja 6), lazy loading.
- SEO: meta, Open Graph, canonical, sitemap, robots, schema.org (`LocalBusiness`/`Person`, `Product`, `Event`).
- Dostępność: semantyczny HTML, kontrast (walidator sprawdza `primary_color`), obsługa klawiatury, etykiety formularzy.
- GitHub Actions `check.yml`: `site:validate`, typecheck, build, test linków wewnętrznych.
- Podgląd na PR; produkcja tylko po merge.
- Dokumentacja po polsku: `OWNER_GUIDE.md` (z obrazkami/zrzutami z telefonu), `README.md` (wykonawca).
- `AGENTS.md` + `CLAUDE.md` (sekcja 10).

## 10. `AGENTS.md` — zasady dla agenta (skrót)
- Zwykłe zmiany treści: edytuj **tylko** `site.md` i `zdjecia/`. Zmiany w `src/`, konfiguracji, zależnościach — tylko na wyraźną prośbę i z wyjaśnieniem w PR.
- Przed PR zawsze: `npm run site:validate` i `npm run build`; nie twórz PR z błędami.
- Zawsze przez gałąź i PR, nigdy bezpośrednio na `main`. Nazwa gałęzi krótka, bez polskich znaków (np. `warsztat-luty`).
- Opis PR po polsku, prostym językiem: co zmieniono, sekcja „⚠️ Do sprawdzenia” dla cen/linków/kontaktu, link podglądu `https://<gałąź>.<projekt>.pages.dev`.
- Nie wymyślaj danych (cen, dat, adresów) — jeśli brakuje, zapytaj.
- Nie usuwaj treści bez wyraźnej prośby; nigdy nie wpisuj sekretów do repo.
- `CLAUDE.md` zawiera jedną linię: „Zasady pracy w tym repo: zobacz AGENTS.md”.

## 11. Bezpieczeństwo, niezawodność, własność
- Sekrety wyłącznie w ustawieniach usług, nigdy w repo (klucz publiczny formularza nie jest sekretem).
- Osobne repo i konta dla każdego klienta.
- Brak przechowywania danych osobowych i płatności po naszej stronie (formularze/zapisy u zewnętrznych dostawców; polityka prywatności je wymienia).
- Nic wygenerowanego przez AI nie trafia na produkcję bez merge właściciela; ochrona `main` to wymusza.
- Dependabot (miesięcznie) dla zależności; zmiany zależności zatwierdza wykonawca, nie klient.

## 12. Poza MVP
Płatności online i koszyk; rezerwacje z limitem miejsc i e-mailami; newsletter/CRM/faktury; wielojęzyczność; panel CMS; dodatkowe motywy; testy wizualne, audyty SEO, monitoring.

## 13. Struktura repozytorium
```text
ai-website-starter/
├── site.md                  # treść i konfiguracja klienta
├── zdjecia/                 # zdjęcia klienta (dowolny format, też HEIC)
├── AGENTS.md                # zasady dla agenta AI
├── CLAUDE.md                # odsyła do AGENTS.md
├── README.md                # instrukcja wykonawcy
├── OWNER_GUIDE.md           # instrukcja właściciela (telefon)
├── astro.config.mjs
├── package.json
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── lib/site-schema.ts   # schemat zod + parser site.md
├── scripts/
│   ├── validate-site.ts     # czytelne błędy po polsku
│   └── prepare-images.ts    # HEIC → JPG, kontrola rozmiaru/nazw
└── .github/
    ├── workflows/check.yml
    └── dependabot.yml
```

## 14. Plan testów przepływu (na telefonie)
Wykonać na stronie wykonawcy, potem z drugą właścicielką:
1. Zmiana tekstu „O mnie”.
2. Zmiana ceny produktu (sprawdzić sekcję „⚠️ Do sprawdzenia”).
3. Dodanie warsztatu z datą.
4. Dodanie produktu ze **zdjęciem z telefonu** (test załącznika; w razie porażki plan B).
5. Cofnięcie zmiany nr 2 przez Revert.
6. Celowy błąd (np. data „14 lutego” w złym miejscu) → czerwony check → agent naprawia.

## 15. Definition of Done
- Podmiana `site.md` + `zdjecia/` daje nową, spójną stronę bez zmian w komponentach.
- Kontakt, oferta, produkty, warsztaty w całości z `site.md`.
- Wszystko działa na telefonie.
- PR przechodzi testy i ma podgląd; publikacja tylko po merge; Revert działa.
- Nietechniczna osoba wykonuje scenariusze 1–5 z sekcji 14 po krótkim instruktażu.
- Brak płatnego hostingu, VPS, bazy danych i CMS.

## 16. Otwarte pytania
- Telefon wykonawcy i Agnieszki: iPhone czy Android?
- Abonament AI każdej właścicielki: Claude, ChatGPT czy oba?
- Repo publiczne (zalecane, darmowa ochrona `main`) czy prywatne + GitHub Pro?
- Konta GitHub/Cloudflare i domeny: istnieją? Na kogo rejestrowane?
- Dane strony testowej wykonawcy (nazwa, profil, sekcje).

## 17. Pierwsze zadanie dla agenta
„Zbuduj repozytorium `ai-website-starter` według tej specyfikacji (v2). Działające MVP w Astro + TypeScript: schemat zod i walidator `site.md` z błędami po polsku, przygotowanie zdjęć z folderu `zdjecia/` (w tym HEIC), katalog produktów, warsztaty z ukrywaniem przeszłych, jeden motyw mobilny, SEO, `check.yml` (bez deployu), konfiguracja pod Cloudflare Pages, `AGENTS.md`, `CLAUDE.md`, `OWNER_GUIDE.md`, `README.md`. Dane demonstracyjne fikcyjne. Bez płatnych usług i backendu. Opisz konfigurację wdrożenia i ograniczenia.”
