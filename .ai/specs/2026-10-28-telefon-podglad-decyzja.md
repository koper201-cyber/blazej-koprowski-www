# Zgłoszenie → podgląd → decyzja właściciela

- Stan: w realizacji.
- Issue: https://github.com/koper201-cyber/blazej-koprowski-www/issues/10.
- User story: jako właściciel strony chcę zgłaszać zmianę z telefonu, dostać działający podgląd i zatwierdzić albo odrzucić wersję, aby nie obsługiwać ręcznie GitHuba.

## Plan

1. Zdiagnozować odmowę GitHub API i przygotować minimalną zmianę dostępu sieciowego do zatwierdzenia właściciela.
2. Uzupełnić instrukcje: issue i PR w tle, obowiązkowy podgląd konkretnego commita, zachowanie przy błędzie i przy decyzji właściciela.
3. Zweryfikować dostęp i prawdziwy podgląd w środowisku telefonu. Test nie może scalać obecnych PR ani publikować na produkcji.
4. Dostarczyć PR z wynikami i jasno wskazać czynności wymagające zgody właściciela.

## Kryteria

- Tworzenie issue i PR nie wymaga ręcznej obsługi przez właściciela.
- Link podglądu jest publiczny, sprawdzony i dotyczy aktualnego commita. Błąd PR nie ukrywa gotowego podglądu.
- Brak decyzji i odrzucenie pozostawiają main bez zmian. Akceptacja dotyczy konkretnego podglądu i commita; nowy commit wymaga ponownej akceptacji.
- Obecny zakaz scalania pozostaje wiążący. Wyjaśnienie protokołu przyszłej publikacji nie stanowi zgody na Merge teraz.
- Udane wdrożenie jest potwierdzane na stronie produkcyjnej, nie tylko stanem Git.
- Nie dodajemy backendu, płatnych usług, sekretów do repo ani nowych zależności. Nie obiecujemy natywnych przycisków w aplikacji ChatGPT; decyzja może być przekazana zwykłą wiadomością.

## Weryfikacja

Sprawdzić składnię i działanie przygotowanych instrukcji, wymagane site:validate i build, integrację chmurową GitHub oraz rzeczywisty podgląd. Testy publikacji lub Merge wymagają osobnej aktualnej zgody właściciela i nie zostaną oznaczone jako zaliczone bez jej wykonania.
