import React from 'react';
import { MessageChannel } from 'node:worker_threads';

global.MessageChannel = MessageChannel;

const { renderToStaticMarkup } = require('react-dom/server.node');
const getStorefrontBrandingSnapshot = jest.fn(async () => ({
  siteName: 'Tenant Store',
  faviconUrl: 'https://example.com/favicon.ico',
  primaryColor: '#654321',
  description: 'Tenant storefront description',
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ id, dangerouslySetInnerHTML }) => (
    <script id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  ),
}));

jest.mock('next/font/google', () => {
  const createFont = () => ({ variable: '--mock-font' });
  return {
    Poppins: createFont,
    Inter: createFont,
    Oswald: createFont,
    Rajdhani: createFont,
    Roboto: createFont,
    Space_Grotesk: createFont,
    Syne: createFont,
  };
});

jest.mock('next/headers', () => ({
  headers: jest.fn(async () => ({ get: jest.fn(() => '/') })),
}));

jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }) => <>{children}</>,
}));

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn(async () => 'en'),
  getMessages: jest.fn(async () => ({ common: {} })),
  setRequestLocale: jest.fn(),
}));

jest.mock(
  '@components/provider/main-provider',
  () => ({
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  }),
  { virtual: true }
);

jest.mock(
  '@components/seo/structured-data',
  () => ({
    __esModule: true,
    default: () => null,
  }),
  { virtual: true }
);

jest.mock(
  '@components/tracking/FacebookPixel',
  () => ({
    __esModule: true,
    default: () => null,
  }),
  { virtual: true }
);

jest.mock('../../src/lib/tenant-branding', () => ({
  getStorefrontBrandingSnapshot: (...args) => getStorefrontBrandingSnapshot(...args),
  buildTenantBrandingBootstrapScript: jest.fn(
    () => 'document.documentElement.style.setProperty("--primary-color", "#654321");'
  ),
  buildStorefrontMetadata: jest.fn((branding, metadata) => ({
    ...metadata,
    title: branding.siteName,
    description: branding.description,
    icons: { icon: [{ url: branding.faviconUrl }] },
  })),
}));

describe('Storefront RootLayout branding bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders an early branding bootstrap script to reduce FOUC', async () => {
    const { default: RootLayout } = await import('../../src/app/layout');
    const markup = renderToStaticMarkup(
      await RootLayout({ children: <div>Storefront</div> })
    );

    expect(markup).toContain('tenant-branding-bootstrap');
    expect(markup).toContain('--primary-color');
  });

  test('generateMetadata resolves branding with the current locale', async () => {
    const layoutModule = await import('../../src/app/layout');
    const metadata = await layoutModule.generateMetadata();

    expect(getStorefrontBrandingSnapshot).toHaveBeenCalledWith('en');
    expect(metadata.title).toBe('Tenant Store');
    expect(metadata.description).toBe('Tenant storefront description');
    expect(metadata.icons).toEqual({
      icon: [{ url: 'https://example.com/favicon.ico' }],
    });
  });
});
