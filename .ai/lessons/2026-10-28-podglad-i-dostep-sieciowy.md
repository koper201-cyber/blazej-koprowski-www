# Podgląd i dostęp środowiska telefonu

- Przyczyna: środowisko dopuszczało rejestry pakietów, ale blokowało api.github.com. Wysłanie gałęzi powiodło się, utworzenie PR zawiodło. Cloudflare mimo tego zbudował podgląd, którego agent nie przekazał właścicielowi.
- Potwierdzenie: f57b4d9 ma udany check Cloudflare z Preview URL https://019fce7f.blazej-koprowski.pages.dev/. Po zatwierdzeniu trzech domen gh api odczytało repozytorium, a curl sprawdził HTTP 200 i tekst nowego przycisku. Produkcja pozostała bez zmiany. Python w tym samym środowisku otrzymał 403; nie utożsamiać wyniku jednego klienta HTTP z niedostępnością strony.
- Rozwiązanie: ograniczone domeny api.github.com, *.blazej-koprowski.pages.dev i blazej-koprowski.pages.dev, bez pełnego internetu i dodatkowych sekretów. Zasady podglądu oraz decyzji są w sekcji 11 AGENTS.md.
- Zapobieganie: testować API i rzeczywisty podgląd z chmury; nie deklarować całego produktu jako gotowego na podstawie buildu. Nowa rozmowa korzysta z instrukcji rzeczywiście obecnych na jej gałęzi. Zapis szkicu i publikacja środowiska to osobne kroki. Test publikacji strony wymaga zgody i nie został wykonany.
