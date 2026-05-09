import { cookies } from 'next/headers';
import { getRequestConfig, setRequestLocale } from 'next-intl/server';

import { locales, defaultLocale } from '../../i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // First check cookie (user preference)
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  let locale;
  
  // Prioritize cookie if it exists and is valid
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Fall back to requestLocale (from URL or next-intl detection)
    locale = await requestLocale;
    
    // If still no valid locale, use default
    if (!locale || !locales.includes(locale)) {
      locale = defaultLocale;
    }
  }

  // Enable static rendering
  setRequestLocale(locale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

