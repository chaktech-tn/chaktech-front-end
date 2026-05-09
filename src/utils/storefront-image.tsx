const LOCAL_BACKEND_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
const PRODUCT_UPLOAD_PREFIX = "/uploads/products/";

const isAbsoluteUrl = (value: string | null | undefined) =>
  typeof value === "string" && /^https?:\/\//i.test(value);

const parseUrl = (value: string | null | undefined) => {
  if (!isAbsoluteUrl(value)) {
    return null;
  }

  try {
    const safeValue = typeof value === "string" ? value : "";
    return new URL(safeValue);
  } catch {
    return null;
  }
};

const isLocalBackendUploadUrl = (value: string | null | undefined) => {
  const parsedUrl = parseUrl(value);

  if (!parsedUrl) {
    return false;
  }

  return (
    LOCAL_BACKEND_HOSTS.has(parsedUrl.hostname) &&
    parsedUrl.pathname.startsWith(PRODUCT_UPLOAD_PREFIX)
  );
};

export const normalizeStorefrontImageUrl = (
  value: string | null | undefined,
  currentHostname?: string
) => {
  const parsedUrl = parseUrl(value);

  if (!parsedUrl || !isLocalBackendUploadUrl(value)) {
    return value;
  }

  if (!currentHostname || LOCAL_BACKEND_HOSTS.has(currentHostname)) {
    return value;
  }

  parsedUrl.hostname = currentHostname;
  return parsedUrl.toString();
};

export const shouldUseUnoptimizedImage = (value: string | null | undefined) => {
  const parsedUrl = parseUrl(value);

  if (!parsedUrl) {
    return false;
  }

  return (
    parsedUrl.port === "5001" &&
    parsedUrl.pathname.startsWith(PRODUCT_UPLOAD_PREFIX)
  );
};
