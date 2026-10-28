# Potwierdzenia operacji nieodwracalnych

- Ustalenie właściciela z issue #18: prośba mogąca zniszczyć stronę lub dane wymaga trzech kolejnych pytań, sformułowanych różnie, i osobnych potwierdzeń. Nie wystarczy akceptacja podglądu.
- Pełna procedura jest w sekcji 12 AGENTS.md; CLAUDE.md importuje ten plik. Pytania sprawdzają zakres, świadomą akceptację skutków i końcowe zlecenie, a zmiana planu unieważnia cały zestaw zgód.
- Sam Git nie chroni danych poza repozytorium, konfiguracji domen ani dostępu. Nie deklarować możliwości odtworzenia bez jej sprawdzenia i nie niszczyć jedynej kopii bez potwierdzonego odzyskania.
- Instrukcje to procedura agenta, nie techniczna blokada usług ani dowód zachowania modelu. Weryfikacja scenariuszy bez kasowania nie jest testem usuwania produkcji.
