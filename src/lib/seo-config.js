// SEO Configuration for ChakTech
export const defaultMetadata = {
  title: "ChakTech - E-commerce Tunisie",
  description: "Découvrez un large choix de PC Portables, Smartphones, Electroménager et Produits High-tech aux meilleurs prix en Tunisie. Livraison rapide à domicile sur tout le territoire Tunisien.",
  keywords: "ChakTech, e-commerce Tunisie, smartphones, PC portable, électroménager, high-tech, Tunisie",
  openGraph: {
    title: "ChakTech - E-commerce Tunisie",
    description: "Découvrez un large choix de PC Portables, Smartphones, Electroménager et Produits High-tech aux meilleurs prix en Tunisie",
    url: "https://chaktech.tn",
    siteName: "ChakTech",
    locale: "fr_FR",
    type: "website",
    alternateLocale: ["ar_TN", "en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChakTech - E-commerce Tunisie",
    description: "Découvrez un large choix de PC Portables, Smartphones, Electroménager et Produits High-tech aux meilleurs prix en Tunisie",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Site configuration for structured data
export const siteConfig = {
  name: "ChakTech",
  fullName: "Chaker Technologie",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chaktech.tn",
  logo: "/assets/img/logo/chaktech-logo.svg",
  defaultImage: "/assets/img/logo/chaktech-logo.svg",
  facebookPage: "https://www.facebook.com/ChakerTechnologie/",
  instagram: "https://www.instagram.com/chaktech.tn/",
  tiktok: "https://www.tiktok.com/@chaktech.tn",
  // Local Business Information
  address: {
    streetAddress: "Kelaat El Andaluus",
    addressLocality: "Kelaat El Andaluus",
    addressRegion: "Zaghouan",
    postalCode: "1121",
    addressCountry: "TN",
  },
  geo: {
    latitude: "36.0167", // Approximate coordinates for Kelaat El Andaluus
    longitude: "10.1167",
  },
  contact: {
    phone: "+21631330440",
    phoneFormatted: "+216 31 330 440",
    email: "contact@chaktech.tn",
  },
  openingHours: [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-13:00",
  ],
};

export default defaultMetadata;
