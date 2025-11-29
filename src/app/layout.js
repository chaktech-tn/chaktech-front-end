import MainProvider from "@components/provider/main-provider";
import "./globals.scss";
import StructuredData from '@components/seo/structured-data';
import FacebookPixel from '@components/tracking/FacebookPixel';
import {
  Poppins,
  Inter,
  Oswald,
  Rajdhani,
  Roboto,
  Space_Grotesk,
  Syne,
} from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-poppins",
});
const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: ["--tp-ff-inter", "--tp-ff-body", "--tp-ff-p"],
});
const oswald = Oswald({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-oswald",
});
const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-rajdhani",
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
});
const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
});
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--tp-ff-syne",
});

import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale , setRequestLocale } from 'next-intl/server';

import { locales, defaultLocale } from '../../i18n';
import { defaultMetadata, siteConfig } from '../lib/seo-config';
import { generateHreflangAlternates } from '../lib/seo-utils';

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  // Generate hreflang alternates
  const alternates = generateHreflangAlternates(pathname, locales, defaultLocale);
  
  return {
    ...defaultMetadata,
    alternates: {
      languages: alternates,
    },
  };
}

export default async function RootLayout({ children }) {
  // Get locale - this will use the request config which reads from cookie
  const locale = await getLocale();
  
  // Enable static rendering
  setRequestLocale(locale);
  
  // Load messages for the locale
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error('Error loading messages for locale:', locale, error);
    // Fallback to default locale messages
    messages = await getMessages({ locale: defaultLocale });
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={locale === 'ar' ? 'rtl' : ''} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${oswald.variable} ${rajdhani.variable} ${roboto.variable} ${space.variable} ${syne.variable}`}
        suppressHydrationWarning
      >
        <StructuredData />
        <FacebookPixel />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MainProvider>{children}</MainProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
