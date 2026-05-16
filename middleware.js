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
  const pathname = request.nextUrl.pathname;

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
