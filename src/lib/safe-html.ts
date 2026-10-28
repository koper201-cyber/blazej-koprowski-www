import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/** Jedyna granica HTML dla tekstów właściciela. Bez skryptów, stylów i obrazów. */
export function renderSafeMarkdown(markdown: string): string {
  return sanitizeHtml(marked.parse(markdown, { async: false }), {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "blockquote",
      "a",
      "code",
      "pre",
      "hr",
    ],
    allowedAttributes: { a: ["href", "title"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowProtocolRelative: false,
  });
}

/** JSON pozostaje danymi także przy osadzeniu wewnątrz znacznika script. */
export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
