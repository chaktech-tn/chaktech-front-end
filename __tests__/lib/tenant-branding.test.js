import { buildStorefrontMetadata } from '../../src/lib/tenant-branding';

describe('buildStorefrontMetadata', () => {
  test('maps siteName and faviconUrl into Next metadata', () => {
    const metadata = buildStorefrontMetadata({
      siteName: 'Tenant Store',
      faviconUrl: 'https://example.com/favicon.ico',
      description: 'Tenant storefront description',
    });

    expect(metadata.title).toBe('Tenant Store');
    expect(metadata.description).toBe('Tenant storefront description');
    expect(metadata.icons).toEqual({
      icon: [{ url: 'https://example.com/favicon.ico' }],
    });
  });
});
