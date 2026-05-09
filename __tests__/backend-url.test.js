import { buildBackendUrl, getBackendBaseUrl } from "@/lib/backend-url";

describe("backend-url (skeleton)", () => {
  const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  afterEach(() => {
    if (originalApiBaseUrl === undefined) {
      delete process.env.NEXT_PUBLIC_API_BASE_URL;
      return;
    }
    process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl;
  });

  it("produces a full URL including base for a given path", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001/";
    const url = buildBackendUrl("content-blocks/homepage/fr");
    expect(url).toBe("http://localhost:5001/content-blocks/homepage/fr");
  });

  it("builds the real storefront CMS page and content-block routes", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001";

    expect(buildBackendUrl("/pages/about/fr")).toBe(
      "http://localhost:5001/pages/about/fr"
    );
    expect(buildBackendUrl("/content-blocks/about/fr")).toBe(
      "http://localhost:5001/content-blocks/about/fr"
    );
  });

  it("builds the real homepage content and SEO routes", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001/";

    expect(buildBackendUrl("/content-blocks/homepage/fr")).toBe(
      "http://localhost:5001/content-blocks/homepage/fr"
    );
    expect(buildBackendUrl("/pages/homepage/fr")).toBe(
      "http://localhost:5001/pages/homepage/fr"
    );
  });

  it("throws when NEXT_PUBLIC_API_BASE_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    expect(() => getBackendBaseUrl()).toThrow(
      "NEXT_PUBLIC_API_BASE_URL environment variable is not set"
    );
  });

  it("trims trailing slash from base URL", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:5001/";
    expect(getBackendBaseUrl()).toBe("http://localhost:5001");
  });
});
