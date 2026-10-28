# Minimalistyczny początek

- Stan: implementacja i lokalna kontrola zakończone; podgląd przed decyzją właściciela.
- Plan/specyfikacja: ../specs/implemented/2026-10-28-minimalistyczny-poczatek.md.
- Prośba: spokojny, minimalistyczny hero, skrócony nagłówek i usunięcie przedstawiania się. Nowa wersja wymaga podglądu; bez publikacji.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/31.
- site.md: „Twój pomysł. Moje doświadczenie.” i „Projektuję hurtownie danych, procesy ETL i rozwiązania w chmurze.” Usunięto w hero „Jestem Błażej…”; biografia niżej zachowana.
- Usunięto tło ElevateBackdrop i powtórzoną etykietę z hero, lżejsze zdaniowe h1, neutralny header CTA. Prosta oprawa istniejącego zdjęcia bez płaszczyzn/narożników. Inne sekcje i ikony bez zmian. Bez zależności.
- site:validate/build/check: kod 0, 0 błędów typów, linki/CSP/budżety poprawne. Znane ostrzeżenie o dwóch miejscach do uzupełnienia bez zmian. npm test 11/11.
- Chromium 320/390/1440: nagłówek i brak „Jestem” potwierdzone, CTA widoczne, brak overflow; zrzuty mobile/desktop przejrzane. Axe mobile 0 naruszeń. Bez fizycznego telefonu.
- Pełny SHA, PR i rzeczywisty publiczny Preview URL z wynikiem kontroli zapisujemy w opisie PR, aby nie zmieniać weryfikowanego commita samym adresem podglądu. Bez publikacji produkcyjnej.
- Właściciel odrzucił minimalistyczny podgląd a3c422f i zlecił przywrócenie oryginalnego wyglądu, zmieniając tylko nagłówek. Przywrócono src/pages/index.astro, src/styles/elevate.css, hero.text i wcześniejsze lessons z main. Jedyna zmiana strony względem main to „Twój pomysł. Moje doświadczenie.”. Nie usuwamy „Jestem…” i niczego nie dodajemy w interfejsie. Kontynuacja PR #32 i issue #31, nowy podgląd przed decyzją.
- Ponowna weryfikacja: site:validate/build kod 0; src/ bez różnic względem main, site.md różni się tylko jedną linią nagłówka. Chromium 320/390/1440: nowy nagłówek, oryginalny opis i brak overflow potwierdzone. Znane ostrzeżenie o dwóch miejscach bez zmian. Nie publikowano.
- Następna korekta właściciela: hero bez „Jestem”, początek dokładnie „Błażej Kaprowski” według pisowni z wiadomości (inne wystąpienia nazwiska bez zmian), CTA „Porozmawiajmy”, dwa zdania nagłówka rozdzielone znakiem nowej linii. CSS white-space: pre-line zachowuje podział i reflow na wąskich ekranach. Pozostały wygląd zachowany; nowy podgląd przed decyzją.
- Weryfikacja: site:validate/build/check kod 0, ponowny build po doborze mobilnego font-size kod 0. Chromium 320/390/1440: zmierzono dokładnie 2 wiersze h1, brak overflow, początek opisu „Błażej Kaprowski” potwierdzony; zrzut mobile przejrzany. Reszta wyglądu i zdjęcie zachowane. Znane ostrzeżenie bez zmian; bez publikacji.
- Właściciel odrzucił zmniejszenie mobilnego nagłówka. Przywrócono dokładny oryginalny font-size clamp(2.2rem, 9.8vw, 3.75rem). Zachowano jawny podział między zdaniami; na wąskim ekranie długie zdanie może naturalnie zająć więcej niż jeden wiersz, bez zmniejszania liter. Pozostałe korekty zachowane.
