export function getBackendBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  // Normalize trailing slash
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export function buildBackendUrl(path, queryParams) {
  // Ensure path string and leading slash
  const p = (path || "/").toString().startsWith("/") ? path : "/" + path;
  const base = getBackendBaseUrl();
  const url = new URL(p, base);
  if (queryParams && typeof queryParams === "object" && !Array.isArray(queryParams)) {
    Object.keys(queryParams).forEach(k => {
      const v = queryParams[k];
      if (v != null) url.searchParams.append(k, String(v));
    });
  }
  return url.toString();
}
