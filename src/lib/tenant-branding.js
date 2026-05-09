import { defaultMetadata } from './seo-config.js';

const DEFAULT_STOREFRONT_BRANDING = {
  primaryColor: '#ee6d0a',
  secondaryColor: '#222529',
  accentColor: '#e8430a',
  logoUrl: '',
  faviconUrl: '/favicon.png',
  siteName: typeof defaultMetadata.title === 'string' ? defaultMetadata.title : 'ChakTech',
  description:
    typeof defaultMetadata.description === 'string'
      ? defaultMetadata.description
      : 'ChakTech storefront branding',
};

const normalizeBranding = (branding = {}) => ({
  ...DEFAULT_STOREFRONT_BRANDING,
  ...branding,
});

const extractBranding = (settings) => {
  const nestedBranding = settings?.branding || settings?.customSettings?.branding || {};

  return normalizeBranding({
    primaryColor: nestedBranding.primaryColor,
    secondaryColor: nestedBranding.secondaryColor,
    accentColor: nestedBranding.accentColor,
    logoUrl: nestedBranding.logoUrl || settings?.logo?.url || '',
    faviconUrl: nestedBranding.faviconUrl || settings?.favicon?.url || '/favicon.png',
    siteName: nestedBranding.siteName || settings?.siteName || DEFAULT_STOREFRONT_BRANDING.siteName,
    description:
      nestedBranding.description ||
      settings?.siteDescription ||
      DEFAULT_STOREFRONT_BRANDING.description,
  });
};

const fetchSiteSettings = async (locale = 'fr') => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/site-settings/${locale}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return payload?.data || null;
  } catch (_error) {
    return null;
  }
};

export async function getStorefrontBrandingSnapshot(locale = 'fr') {
  const settings = await fetchSiteSettings(locale);
  return extractBranding(settings);
}

export function buildStorefrontMetadata(branding = {}, metadata = defaultMetadata) {
  const resolvedBranding = normalizeBranding(branding);

  return {
    ...metadata,
    title: resolvedBranding.siteName || metadata.title,
    description: resolvedBranding.description || metadata.description,
    icons: {
      icon: [{ url: resolvedBranding.faviconUrl }],
    },
  };
}

export function buildTenantBrandingBootstrapScript(branding = {}) {
  const resolvedBranding = normalizeBranding(branding);
  const entries = [
    ['--primary-color', resolvedBranding.primaryColor],
    ['--secondary-color', resolvedBranding.secondaryColor],
    ['--accent-color', resolvedBranding.accentColor],
    ['--logo-url', `url(${resolvedBranding.logoUrl})`],
    ['--favicon-url', `url(${resolvedBranding.faviconUrl})`],
    ['--site-name', resolvedBranding.siteName],
    ['--tp-theme-1', resolvedBranding.secondaryColor],
    ['--tp-theme-2', resolvedBranding.primaryColor],
    ['--tp-theme-3', resolvedBranding.accentColor],
    ['--st-primary', resolvedBranding.primaryColor],
  ];

  return `(function(){var d=document.documentElement;${entries
    .map(([key, value]) => `d.style.setProperty(${JSON.stringify(key)}, ${JSON.stringify(value)});`)
    .join('')}})();`;
}
