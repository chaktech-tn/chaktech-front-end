const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

export function getRuntimeApiBaseUrl(
  baseUrl: string | undefined,
  currentHostname?: string
) {
  if (!baseUrl) {
    return baseUrl;
  }

  try {
    const parsedUrl = new URL(baseUrl);

    if (
      currentHostname &&
      !LOCAL_HOSTNAMES.has(currentHostname) &&
      LOCAL_HOSTNAMES.has(parsedUrl.hostname)
    ) {
      parsedUrl.hostname = currentHostname;
      return parsedUrl.toString().replace(/\/$/, '');
    }

    return parsedUrl.toString().replace(/\/$/, '');
  } catch {
    return baseUrl;
  }
}
