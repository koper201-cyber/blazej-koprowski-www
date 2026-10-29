# Najpierw podgląd

Cel: skrócić czas do pierwszego publicznego podglądu przy prostych zmianach. Właściciel wyraźnie zlecił zmianę kolejności dla wszystkich agentów. Bez zmian aplikacji i CI.

Zakres: AGENTS sekcje 4 i 11 jako jedno źródło reguł, CLAUDE odsyła do nich, OWNER_GUIDE i README opisują właściwy porządek. Minimum przed push: przegląd zakresu, przypadkowych plików i sekretów, git diff --check; brak pełnej lokalnej walidacji/build/testów jako obowiązkowej bramki podglądu. Rzeczywisty preview nadal musi być zbudowany, sprawdzony przez HTTP i potwierdzony dla SHA. Link natychmiast po kontroli, reszta kontroli dalej w tle. Publikacja tylko po akceptacji oraz wymaganych zielonych kontrolach.

Weryfikacja: formatowanie dokumentów, przegląd sprzecznych reguł, scenariusze: tekst, wygląd, błąd CI przy działającym preview, brak preview, akceptacja przy testach w toku, zmiana SHA, odrzucenie. Nie wyłączać CI ani TLS/bezpieczeństwa. Nie twierdzić, że dokumentacja dowodzi zachowania wszystkich modeli. CI istniejącego projektu wykonuje pełne sprawdzenia po utworzeniu PR; brak powielania ich lokalnie dla samej dokumentacji.
