import { isDeepStrictEqual } from "node:util";
import yaml from "js-yaml";

const photo =
  /^zdjecia\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:jpe?g|png|webp|avif|gif|heic|heif)$/i;
const allowed = (path) => path === "site.md" || photo.test(path);
const parse = (text) => {
  if (typeof text !== "string" || text.length > 1024 * 1024)
    throw new Error("Brak lub zbyt duży site.md");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error("Brak poprawnej sekcji YAML");
  const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new Error("Niepoprawny YAML");
  return data;
};
const protectedSettings = (data) => ({
  site: Object.fromEntries(
    Object.entries(data.site ?? {}).filter(
      ([key]) => !["name", "city"].includes(key),
    ),
  ),
  formKey: data.contact?.form_key,
});

export function checkContentScope({
  changes,
  baseSite,
  headSite,
  actor,
  author,
  administrators,
}) {
  if (
    !Array.isArray(changes) ||
    !actor ||
    !author ||
    !Array.isArray(administrators) ||
    !administrators.length
  ) {
    return {
      allowed: false,
      reason: "Nie można ustalić zakresu lub tożsamości.",
    };
  }
  // Obie tożsamości pochodzą z GitHub, nie z plików lub opisu PR.
  const administrator =
    administrators.includes(actor) && administrators.includes(author);
  if (administrator)
    return {
      allowed: true,
      reason:
        "Zmiana administratora; pozostałe kontrole i review nadal obowiązują.",
    };
  for (const change of changes) {
    if (
      !allowed(change.path) ||
      (change.previousPath && !allowed(change.previousPath)) ||
      (change.mode && !["100644", "100755"].includes(change.mode)) ||
      (change.previousMode &&
        !["100644", "100755"].includes(change.previousMode))
    ) {
      return {
        allowed: false,
        reason:
          "Zmiana wykracza poza treść lub zdjęcia. Potrzebny osobny PR administratora.",
      };
    }
  }
  if (
    changes.some(
      (change) =>
        change.path === "site.md" || change.previousPath === "site.md",
    )
  ) {
    try {
      if (
        !isDeepStrictEqual(
          protectedSettings(parse(baseSite)),
          protectedSettings(parse(headSite)),
        )
      ) {
        return {
          allowed: false,
          reason:
            "Zmieniono ustawienia techniczne site.md. Potrzebny administrator.",
        };
      }
    } catch {
      return {
        allowed: false,
        reason: "Nie można bezpiecznie porównać ustawień site.md.",
      };
    }
  }
  return {
    allowed: true,
    reason:
      "Zmiana mieści się w zakresie edytora treści. Testy strony nadal wymagane.",
  };
}
