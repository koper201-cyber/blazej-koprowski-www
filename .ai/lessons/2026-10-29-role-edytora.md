# Role przy współdzieleniu strony

- Właściciel zlecił ograniczenie przyszłej edytorki do treści. Zwykłe potwierdzenie w czacie nie daje zgody administratora na zmianę instrukcji, kodu lub uprawnień.
- Przygotowano role, CODEOWNERS, kontrolę zmian oraz instrukcję aktywacji. Rzeczywista ochrona wymaga odrębnych poświadczeń, ograniczeń aplikacji i ustawień GitHuba; wspólne konto admina nie rozróżnia użytkowników.
- API branch protection zwróciło 403 mimo deklarowanych praw admin. Nie oznacza to braku ochrony ani jej aktywności; nie deklarować stanu, którego nie zweryfikowano. Repo Agnieszki jeszcze nie istnieje, więc test prawdziwych ról pozostaje do wykonania.
- Wymagany status GitHub Actions nie identyfikuje sam konkretnego workflow. Nie przyznawać edytorowi możliwości tworzenia dowolnych workflow/statusów; jeśli integracja nie umie tego ograniczyć, publikację wykonuje administrator.
- Dokumentacja administratora w .ai nie może stać się furtką: agent edytora zapisuje log treści w issue/PR, bez zmian chronionych plików.
