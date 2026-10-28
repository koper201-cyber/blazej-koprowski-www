# Instalacja zależności w środowisku Codex

- Przyczyna: konfiguracja środowiska korzystała z obecnego main, natomiast lockfile i przypięcie Node istniały dopiero w niezaakceptowanym PR #7. Polecenie npm ci nie działa bez pliku blokady.
- Rozwiązanie: sprawdzać pliki rzeczywistego checkoutu. Skrypt używa npm ci przy istniejącym package-lock.json, a bez niego npm install. Obie ścieżki zostały sprawdzone w środowisku na Node 24.22.1; śledzone źródła pozostały bez zmian.
- Zapobieganie: nie zakładać, że pliki z PR są już na main. Po akceptacji standardów normalną instalacją będzie npm ci z wersjami z repozytorium. Nie tworzyć zewnętrznych kopii manifestu ani symlinków node_modules tylko po to, aby wykonać npm ci.
- Rozróżniać przygotowanie plików, zapis szkicu konfiguracji i publikację środowiska. Gotowy raport testów nie potwierdza jeszcze dostępności środowiska na telefonie.
