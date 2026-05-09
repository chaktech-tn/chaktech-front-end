import DOMPurify from "isomorphic-dompurify";

const sanitizeOptions = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
  FORBID_ATTR: ["style"],
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
};

export function sanitizeRichHtml(html) {
  if (typeof html !== "string") {
    return "";
  }

  if (!html.trim()) {
    return "";
  }

  return DOMPurify.sanitize(html, sanitizeOptions);
}

export default sanitizeRichHtml;
