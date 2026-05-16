import { locales } from './i18n';
import { NextResponse } from 'next/server';

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const localeOnlyMatch = pathname.match(/^\/(en|ar|fr)$/);
  if (localeOnlyMatch) {
    const locale = localeOnlyMatch[1];
    if (locales.includes(locale)) {
      const url = request.nextUrl.clone();
      url.pathname = '/';

      const response = NextResponse.redirect(url, { status: 307 });
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      response.headers.set('x-pathname', '/');
      return response;
    }
  }

  const localePathMatch = pathname.match(/^\/(en|ar|fr)(\/.+)$/);
  if (localePathMatch) {
    const locale = localePathMatch[1];
    const pathAfterLocale = localePathMatch[2];

    if (locales.includes(locale)) {
      const url = request.nextUrl.clone();
      url.pathname = pathAfterLocale;

      const response = NextResponse.redirect(url, { status: 307 });
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      response.headers.set('x-pathname', pathAfterLocale);
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
