# Portret w hero i kapitan w O mnie

- Stan: implementacja i lokalna weryfikacja zakończone; odbiór podglądu i CI w PR. Bez publikacji produkcyjnej.

- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/40.
- Cel: powiązać osobę Błażeja z osobistym prowadzeniem projektu od celu do wdrożenia.
- Zakres: nowy załączony portret w zdjecia/ i hero; obecne zdjęcie blazej-na-zaglowce.jpg w O mnie, krótka metafora. Zachować wszystkie pozostałe treści aktualnego main, wielkość nagłówka i wygląd. Nie przywracać #24.
- Dane: opcjonalne about_photo z image, wymaganym opisem alt i opcjonalnym podpisem caption. Bez bloku brak figury; features.about false ukrywa całą sekcję. Zdjęcia przez istniejący Photo (AVIF/WebP/srcset); hero eager, O mnie lazy. Walidator sprawdza plik i rozmiar jak dla pozostałych zdjęć.
- Układ: portret w istniejącej ramce hero; zdjęcie kapitana pod nagłówkiem O mnie w lewej kolumnie, na telefonie nad biografią. Bez edycji twarzy i generowania zdjęć.
- Tekst: „Jak kapitan na pokładzie, prowadzę projekt od pomysłu do wdrożenia. Ustalam cel, pilnuję kursu i reaguję na przeszkody, żeby doprowadzić pracę do działającego rozwiązania.” To opis podejścia, bez fikcyjnych wyników i gwarancji każdego terminu.
- Weryfikacja: site:validate, build, check; kontrola alt, naturalWidth, eager/lazy, braku overflow oraz zrzutów 320/390/1440, sprawdzenie starego wariantu bez about_photo przez istniejącą macierz CI. Nie dodawać testów powtarzających treść. Publiczny Preview URL udanego Cloudflare dla SHA, HTTP 200 i weryfikacja obrazów.
- Publikacja wyłącznie po odbiorze nowego podglądu. Ograniczenia kontroli zapisać w logu; brak testu na fizycznym telefonie.
