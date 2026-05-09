import { sanitizeRichHtml } from "@/lib/sanitize-rich-html";

describe("sanitizeRichHtml", () => {
  it("removes script tags and event handlers while keeping safe markup", () => {
    const dirtyHtml = '<p>Hello <strong>world</strong><img src="x" onerror="alert(1)" /></p><script>alert(1)</script>';

    const cleanHtml = sanitizeRichHtml(dirtyHtml);

    expect(cleanHtml).toContain("<strong>world</strong>");
    expect(cleanHtml).not.toContain("<script");
    expect(cleanHtml).not.toContain("onerror");
  });

  it("removes javascript urls", () => {
    const dirtyHtml = '<a href="javascript:alert(1)">Click</a>';

    const cleanHtml = sanitizeRichHtml(dirtyHtml);

    expect(cleanHtml).toContain(">Click<");
    expect(cleanHtml).not.toContain("javascript:");
  });
});
