# Aktualizacje muszą uwzględniać zgodność narzędzi

- Data ustalenia: 2026-10-27.
- Kontekst: research stosu dla Astro, bez aktualizacji pakietów projektu.
- Potwierdzenie: `npm view typescript dist-tags.latest --json` zwróciło `7.0.2`, a `npm view @astrojs/check version peerDependencies --json` zwróciło wersję `0.9.12` i peer TypeScript `^5.0.0 || ^6.0.0`.
- Wniosek: aktualizowanie wszystkich narzędzi do `latest` może utworzyć niezgodny zestaw. Najnowszy major języka nie jest automatycznie poprawnym wyborem dla projektu.
- Zapobieganie: przed aktualizacją sprawdzić `engines` i `peerDependencies`, wybrać zgodne wersje oraz potwierdzić je czystą instalacją, typecheckiem, buildem i testami. Nie obchodzić konfliktu flagami `--force` ani `--legacy-peer-deps`.
- Wersje w tej notatce są migawką; przed kolejną aktualizacją odczytać je ponownie.
- Powiązana [specyfikacja](../specs/2026-10-27-tech-stack-i-standardy.md) opisuje kandydatów migracji. Żadnej migracji nie wykonano w ramach researchu.
