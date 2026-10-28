import matter from "gray-matter";
import { load, JSON_SCHEMA } from "js-yaml";

/** JSON_SCHEMA nie zamienia niecytowanych dat YAML na normalizowane Date. */
export function readContent(source: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const parsed = matter(source, {
    engines: {
      yaml: (text: string): object => {
        const value: unknown = load(text, { schema: JSON_SCHEMA });
        if (value === undefined || value === null) return {};
        if (typeof value !== "object" || Array.isArray(value))
          throw new Error("Dane YAML muszą być obiektem.");
        return value;
      },
    },
  });
  return {
    data: parsed.data as Record<string, unknown>,
    content: parsed.content,
  };
}
