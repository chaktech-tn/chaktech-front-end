import { siteConfig } from '@lib/seo-config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/user-dashboard/',
          '/checkout/',
          '/order/',
          '/cart/',
          '/wishlist/',
          '/login/',
          '/register/',
          '/forgot-password/',
          '/forgot/',
          '/email-verify/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

