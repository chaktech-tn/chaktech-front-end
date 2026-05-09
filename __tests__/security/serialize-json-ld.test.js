import { serializeJsonLd } from "@/lib/serialize-json-ld";

describe("serializeJsonLd", () => {
  it("escapes html-significant characters in json-ld output", () => {
    const payload = {
      name: "Example",
      description: "</script><script>alert(1)</script>",
    };

    const serialized = serializeJsonLd(payload);

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script\\u003e");
  });
});
