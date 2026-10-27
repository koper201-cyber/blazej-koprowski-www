Zasady pracy w tym repozytorium: zobacz @AGENTS.md

Przeczytaj i stosuj cały `AGENTS.md`, w szczególności obowiązkowy proces z sekcji 8:

- `.ai/specs/` — specyfikacje SDD; ukończone w `implemented/`, wycofane lub zastąpione w `archive/`.
- `.ai/runs/` — log każdego autonomicznego przebiegu wykonującego zmiany.
- `.ai/lessons.md` — indeks trwałych ustaleń; `.ai/lessons/` — szczegółowe wnioski i usprawnienia.

Specyfikacje i logi nazywaj `YYYY-MM-DD-slug.md` (data rozpoczęcia w `Europe/Warsaw`, slug małymi literami ASCII, cyfry i myślniki). Nie nadpisuj istniejących plików; przy kolizji dodaj numer do sluga.

Przed pracą przeczytaj indeks wniosków i dokumenty dotyczące zadania. Przed implementacją funkcji lub naprawą kodu przygotuj specyfikację z kryteriami akceptacji. Przy prostej zmianie treści lub dokumentacji wystarczy log. Log załóż przed zmianami i zakończ rzeczywistymi wynikami weryfikacji. Po naprawie błędu lub ustaleniu trwałej reguły uzupełnij wnioski i ich indeks. Przed zakończeniem uporządkuj status specyfikacji i dołącz dokumentację `.ai/` do tej samej gałęzi i PR. Nie zapisuj sekretów ani pełnego toku rozumowania.
