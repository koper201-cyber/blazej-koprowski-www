# Szybki podgląd

- Stan: instrukcje przygotowane, weryfikacja dokumentacji zakończona; PR do przeglądu przed scaleniem.
- Właściciel zlecił zapisanie dla wszystkich agentów priorytetu: najpierw podgląd, potem pełne testy i publikacja.
- Specyfikacja: ../specs/implemented/2026-10-29-szybki-podglad.md.
- Plan: zmiana wspólnych zasad i instrukcji właściciela, kontrola spójności/formatowania, osobny PR. Bez zmian witryny, CI ani Cloudflare.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/36.
- Zmieniono AGENTS 4/11, odsyłający CLAUDE, OWNER_GUIDE i README. Usunięto obowiązek lokalnej walidacji/build przed PR oraz zakaz samego PR z błędami; pozostawiono wszystkie bramki publikacji i kontrole minimum przed push.
- Przegląd scenariuszy dokumentacji: prosta treść i wygląd — szybki push/PR, Cloudflare i CI równolegle; CI w toku/błąd — link dostępnego preview z jawnym statusem, bez merge; brak udanego preview — diagnoza, bez zgadywania linku; akceptacja podczas testów — oczekiwanie na wyniki tego SHA, bez auto-merge; zmiana SHA — nowy podgląd i decyzja; odrzucenie — bez publikacji. Zmiany wrażliwe wymagają adekwatnej kontroli przed wysłaniem.
- Nie uruchamiano lokalnego buildu/testów aplikacji dla zmiany samej dokumentacji. Weryfikacja: Prettier, git diff --check, przegląd sprzecznych reguł. Nie deklarujemy pomiaru przyspieszenia ani testu zachowania każdego modelu; CI uruchamia istniejące kontrole na PR.
- Reguły w gałęzi będą dostępne wszystkim nowym agentom korzystającym z main po scaleniu. Nie zmieniano produkcji ani nie scalamy innych otwartych propozycji.
