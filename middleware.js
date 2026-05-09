import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Use 'as-needed' for SEO (default locale has no prefix)
  localeDetection: true,
});

export default function middleware(request) {
  // Add pathname to headers for SEO metadata generation
  const pathname = request.nextUrl.pathname;
  
  // Handle locale-only paths (e.g., /en, /ar) - redirect to homepage with cookie
  const localeOnlyMatch = pathname.match(/^\/(en|ar|fr)$/);
  if (localeOnlyMatch) {
    const locale = localeOnlyMatch[1];
    if (locales.includes(locale)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      
      // Use 307 redirect (temporary) to preserve method and ensure cookie is set
      const response = NextResponse.redirect(url, { status: 307 });
      // Set locale cookie - next-intl reads from cookies when localeDetection is enabled
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
      response.headers.set('x-pathname', '/');
      return response;
    }
  }
  
  // Handle locale-prefixed paths (e.g., /en/shop, /ar/cart)
  const localePathMatch = pathname.match(/^\/(en|ar|fr)(\/.+)$/);
  if (localePathMatch) {
    const locale = localePathMatch[1];
    const pathAfterLocale = localePathMatch[2];
    
    if (locales.includes(locale)) {
      const url = request.nextUrl.clone();
      url.pathname = pathAfterLocale;
      
      // Use 307 redirect (temporary) to preserve method
      const response = NextResponse.redirect(url, { status: 307 });
      // Set locale cookie
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
      response.headers.set('x-pathname', pathAfterLocale);
      return response;
    }
  }
  
  // Let next-intl middleware handle other routes
  const response = intlMiddleware(request);
  
  if (response instanceof NextResponse) {
    response.headers.set('x-pathname', pathname);
  }
  
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

