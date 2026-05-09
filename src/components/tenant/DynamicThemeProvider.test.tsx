import React from 'react';
import { render } from '@testing-library/react';
import DynamicThemeProvider from './DynamicThemeProvider';

describe('Storefront DynamicThemeProvider', () => {
  afterEach(() => {
    document.documentElement.style.removeProperty('--primary-color');
    document.documentElement.style.removeProperty('--secondary-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--logo-url');
    document.documentElement.style.removeProperty('--favicon-url');
    document.documentElement.style.removeProperty('--site-name');
  });

  test('injects branding CSS variables into the document root', () => {
    render(
      <DynamicThemeProvider
        branding={{
          primaryColor: '#654321',
          secondaryColor: '#123456',
          accentColor: '#abcdef',
          logoUrl: 'https://example.com/logo.png',
          faviconUrl: 'https://example.com/favicon.ico',
          siteName: 'Tenant Store',
        }}
      >
        <div>Storefront</div>
      </DynamicThemeProvider>
    );

    expect(document.documentElement.style.getPropertyValue('--primary-color')).toBe('#654321');
    expect(document.documentElement.style.getPropertyValue('--secondary-color')).toBe('#123456');
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#abcdef');
    expect(document.documentElement.style.getPropertyValue('--logo-url')).toBe('url(https://example.com/logo.png)');
    expect(document.documentElement.style.getPropertyValue('--favicon-url')).toBe('url(https://example.com/favicon.ico)');
    expect(document.documentElement.style.getPropertyValue('--site-name')).toBe('Tenant Store');
  });
});
