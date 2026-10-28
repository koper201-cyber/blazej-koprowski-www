# Zdjęcie wtopione w Elevate

## Aktualna decyzja projektowa właściciela

Po dwóch podglądach właściciel wraca do dużego zdjęcia, ale odrzuca efekt rozmycia. Wymagania poniżej dotyczące wtopienia i małego portretu są historią poprzednich iteracji, zastąpioną przez: oryginalne ostre zdjęcie, duży portret po prawej, geometryczna oprawa z przesuniętą fioletową warstwą i limonkowym narożnikiem, bez masek i blur. Na telefonie karta pod tekstem, bez overflow. Inne treści bez zmian; osobny aktualny podgląd przed publikacją.

## Cel i zakres

Właściciel zlecił kadrowanie nowego zdjęcia z żaglówki i miękkie przenikanie fotografii z tłem. Zmiana zdjęcia, site.md oraz stylów hero Elevate jest wyraźnie objęta prośbą. Bez nowych zależności i zmian pozostałej treści.

## Wymagania i akceptacja

- Rozpoznawalna, wyraźna twarz i kadr skupiony na właścicielu.
- Tło i brzegi zdjęcia przechodzą w ciemnofioletowe tło; bez ramki i karty.
- Tekst poza obszarem zdjęcia, przycisk czytelny i klikalny.
- Desktop: tekst i portret obok siebie; mobile: zdjęcie poniżej tekstu, bez poziomego przewijania.
- Korekta właściciela: portret wyraźnie mniejszy, po prawej i drugoplanowy; nagłówek oraz CTA dominują. Desktop do 360 px, mobile do 250 px, bez zmiany samej fotografii.
- Pozostałe motywy bez zmian; efekt tylko przy zdjęciu w Elevate.

## Plan i weryfikacja

Edycja zdjęcia narzędziem imagegen; gradientowa maska CSS oraz delikatna poświata łącząca obraz z istniejącym tłem. Walidacja/build/check, istniejące testy, przegląd zrzutów Chromium 390/1440 i wariantu 320, kontrola publicznego Preview URL konkretnego SHA. Podgląd i osobna akceptacja przed publikacją. Ryzyko: przesadne rozmycie twarzy lub obniżenie kontrastu; twarz pozostaje ostra, rozmycie dotyczy otoczenia i brzegów.
