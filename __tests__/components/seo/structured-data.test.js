import React from 'react';

const { renderToStaticMarkup } = require('react-dom/server.node');

describe('StructuredData', () => {
  it('renders JSON-LD script tags for the default SEO payloads', async () => {
    const { default: StructuredData } = await import(
      '../../../src/components/seo/structured-data'
    );

    const markup = renderToStaticMarkup(<StructuredData />);
    const document = new DOMParser().parseFromString(markup, 'text/html');
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(3);
    expect(scripts[0].textContent).toContain('https://schema.org');
    expect(scripts[0].textContent).toContain('Organization');
    expect(scripts[1].textContent).toContain('WebSite');
    expect(scripts[2].textContent).toContain('LocalBusiness');
  });
});
