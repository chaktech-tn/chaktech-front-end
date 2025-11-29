import { NextResponse } from 'next/server';

import { locales } from '../../../../i18n';

export async function POST(request) {
  try {
    const { locale } = await request.json();
    
    if (!locale || !locales.includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale' },
        { status: 400 }
      );
    }
    
    const response = NextResponse.json({ success: true, locale });
    
    // Set the locale cookie
    // next-intl uses 'NEXT_LOCALE' cookie name
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      httpOnly: false, // Allow client-side access
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set locale' },
      { status: 500 }
    );
  }
}

