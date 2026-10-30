# Podgląd przed pełnymi testami

- Właściciel wskazał, że przy prostej zmianie najważniejszy jest jak najszybszy publiczny podgląd. Dotychczas lokalny build i testy poprzedzały push, dublując późniejsze CI i opóźniając ocenę.
- Nowa kolejność: minimalny przegląd → push/PR → udane wdrożenie i szybka kontrola podglądu → natychmiast link → reszta kontroli → akceptacja oraz zielone bramki → publikacja.
- Wynik testów musi być jasno odróżniony od dostępności podglądu. CI i build Cloudflare nadal są wymagane w odpowiednich etapach; nie wyłączamy ich ani nie publikujemy przy błędach.
- Pełne reguły dla Codex, Claude i innych agentów: sekcje 4 i 11 AGENTS.md. CLAUDE.md odsyła do tego źródła. Dokumentacja sama nie dowodzi działania wszystkich modeli; reguła będzie dostępna nowym checkoutom main dopiero po scaleniu.
