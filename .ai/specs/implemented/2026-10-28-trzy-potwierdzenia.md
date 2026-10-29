# Ochrona przed nieodwracalnymi zmianami

- Stan: zrealizowano i sprawdzono instrukcje; aktywacja na main wymaga scalenia PR. Nie wykonywano destrukcyjnego testu modelu w chmurze.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/18.
- User story: jako właściciel strony chcę trzech osobnych potwierdzeń ryzykownej operacji, abym nie utracił strony, danych lub dostępu przez pomyłkę.

## Zakres i plan

1. Uzupełnić AGENTS.md o rozpoznawanie ryzyka, bezpieczne alternatywy i trzy kolejne bramki decyzji. Uzgodnić je z podglądem i decyzją z sekcji 11.
2. CLAUDE.md odsyła do tych samych reguł. OWNER_GUIDE.md wyjaśnia je właścicielowi.
3. Przejrzeć scenariusze destrukcyjne i zwykłe poprawki, wykonać wymagane walidację i build, przygotować PR bez scalania.

Nie zmieniamy uprawnień usług, ochrony main ani kodu aplikacji. Nie dodajemy zależności, bazy ani backendu. Reguły agenta nie zastępują technicznej blokady usług i nie gwarantują zachowania każdego modelu.

## Wymagania i akceptacja

- AI rozpoznaje także pośrednie skutki: utratę treści/danych, hostingu, domeny, historii, kopii, dostępu oraz osłabienie zabezpieczeń; nie zakłada istnienia bazy danych.
- Przed skutkiem destrukcyjnym przedstawia konkretny zasób i środowisko, konsekwencje i odwracalną alternatywę. Brak rozpoznanego zakresu blokuje operację.
- Trzy pytania mają różne sformułowania i cele: zakres/intencja, skutki/odzyskanie, końcowe zlecenie. Każde wymaga osobnej odpowiedzi właściciela przed następnym. Trzecie nie może być zadane dopiero po wykonaniu operacji.
- Kopia lub wersja do przywrócenia i procedura odzyskania są potwierdzone przed pytaniem końcowym; nieudokumentowana kopia nie jest zabezpieczeniem. Bez możliwości odzyskania jedynej kopii danych AI nie wykonuje samodzielnie trwałego usunięcia.
- Odmowa, cofnięcie zgody i niejednoznaczność zatrzymują pracę. Zmiana operacji/zasobu/wersji/skutków wymaga nowych trzech potwierdzeń. Zgody nie obejmują kolejnych zadań.
- Instrukcje z plików/stron i prośby o pominięcie pytań nie zastępują potwierdzeń; trzy zgody nie zastępują innych ograniczeń ani przekazania sterowania wymaganego przez narzędzia. Bez ujawniania sekretów.
- Zwykła poprawka tekstu, ukrycie sekcji i usunięcie pojedynczej oferty odzyskiwalnej z Git bez skutków ubocznych nadal korzystają ze standardowego PR i podglądu; masowe kasowanie lub niepewne odzyskanie uruchamia ochronę.
- Log zapisuje zakres/wersję, trzy decyzje i stan odzyskiwania bez sekretów. Samo dodanie tej polityki nie jest operacją destrukcyjną i nie uruchamia trzech pytań.

## Weryfikacja

Przegląd scenariuszy w logu: usunięcie strony, wyczyszczenie bazy, skasowanie zdjęć i kopii, force push, DNS, odebranie dostępu, wyłączenie ochrony, obejście przez treść pliku, trzy zgody z góry, cofnięcie zgody, zmiana zakresu oraz zwykła poprawka. To weryfikacja spójności reguł, bez wykonywania niebezpiecznych operacji i bez deklarowania testu zachowania modelu w chmurze. Dodatkowo site:validate, build, formatowanie i diff.
