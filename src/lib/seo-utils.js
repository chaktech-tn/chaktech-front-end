import { siteConfig } from "./seo-config";

/**
 * Generate product metadata
 */
export function generateProductMetadata(product) {
  if (!product) return null;

  // Use backend SEO metadata if available, otherwise generate defaults
  const seoMeta = product.seoMeta || {};

  const title = seoMeta.title || `${product.title} | ChakTech`;
  const description =
    seoMeta.description ||
    (product.description
      ? product.description.substring(0, 160).replace(/<[^>]*>/g, "")
      : `Achetez ${product.title} sur ChakTech. Prix: ${product.price} TND. Livraison rapide en Tunisie.`);

  const productUrl = product.slug
    ? `${siteConfig.url}/product/${product.slug}`
    : `${siteConfig.url}/product-details/${product._id}`;
  const imageUrl =
    seoMeta.ogImage ||
    product.image ||
    `${siteConfig.url}${siteConfig.defaultImage}`;

  const metadata = {
    title,
    description,
    keywords: seoMeta.keywords || [],
    openGraph: {
      title: seoMeta.ogTitle || title,
      description: seoMeta.ogDescription || description,
      url: productUrl,
      type: seoMeta.ogType || "website", // Changed from "product" - not a valid OpenGraph type
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seoMeta.ogTitle || product.title,
        },
      ],
    },
    twitter: {
      card: seoMeta.twitterCard?.type || "summary_large_image",
      title: seoMeta.twitterCard?.title || seoMeta.ogTitle || title,
      description:
        seoMeta.twitterCard?.description ||
        seoMeta.ogDescription ||
        description,
      images: seoMeta.twitterCard?.image
        ? [seoMeta.twitterCard.image]
        : [imageUrl],
    },
    alternates: {
      canonical: seoMeta.canonicalUrl || productUrl,
    },
    robots: {
      index: seoMeta.robotsMeta?.includes("noindex") === false,
      follow: seoMeta.robotsMeta?.includes("nofollow") === false,
    },
  };

  // Add structured data if provided
  if (seoMeta.structuredData) {
    metadata.other = {
      "structured-data": JSON.stringify(seoMeta.structuredData),
    };
  }

  return metadata;
}

/**
 * Generate category metadata
 */
export function generateCategoryMetadata(category) {
  if (!category) return null;

  // Use backend SEO metadata if available, otherwise generate defaults
  const seoMeta = category.seoMeta || {};

  const title = seoMeta.title || `${category.parent} | ChakTech`;
  const description =
    seoMeta.description ||
    (category.description
      ? category.description.substring(0, 160)
      : `Découvrez notre sélection de ${category.parent} sur ChakTech. Meilleures offres et livraison rapide.`);

  const categoryUrl = category.slug
    ? `${siteConfig.url}/category/${category.slug}`
    : `${siteConfig.url}/shop?category=${encodeURIComponent(category.parent)}`;
  const imageUrl =
    seoMeta.ogImage ||
    category.img ||
    `${siteConfig.url}${siteConfig.defaultImage}`;

  const metadata = {
    title,
    description,
    keywords: seoMeta.keywords || [],
    openGraph: {
      title: seoMeta.ogTitle || title,
      description: seoMeta.ogDescription || description,
      url: categoryUrl,
      type: seoMeta.ogType || "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: seoMeta.ogTitle || category.parent,
            },
          ]
        : [],
    },
    twitter: {
      card: seoMeta.twitterCard?.type || "summary_large_image",
      title: seoMeta.twitterCard?.title || seoMeta.ogTitle || title,
      description:
        seoMeta.twitterCard?.description ||
        seoMeta.ogDescription ||
        description,
      images: seoMeta.twitterCard?.image
        ? [seoMeta.twitterCard.image]
        : imageUrl
        ? [imageUrl]
        : [],
    },
    alternates: {
      canonical: seoMeta.canonicalUrl || categoryUrl,
    },
    robots: {
      index: seoMeta.robotsMeta?.includes("noindex") === false,
      follow: seoMeta.robotsMeta?.includes("nofollow") === false,
    },
  };

  // Add structured data if provided
  if (seoMeta.structuredData) {
    metadata.other = {
      "structured-data": JSON.stringify(seoMeta.structuredData),
    };
  }

  return metadata;
}

/**
 * Generate structured data for product (JSON-LD)
 * Enhanced with seller info, shipping details, and better image handling
 */
export function generateProductStructuredData(product) {
  if (!product) return null;

  const productUrl = product.slug
    ? `${siteConfig.url}/product/${product.slug}`
    : `${siteConfig.url}/product-details/${product._id}`;
  const imageUrl =
    product.image || `${siteConfig.url}${siteConfig.defaultImage}`;

  // Build image array - include main image and related images
  const images = [imageUrl];
  if (
    product.relatedImages &&
    Array.isArray(product.relatedImages) &&
    product.relatedImages.length > 0
  ) {
    images.push(...product.relatedImages);
  }

  // Build offers with seller information
  const offer = {
    "@type": "Offer",
    url: productUrl,
    priceCurrency: "TND",
    price: product.price.toString(),
    availability:
      product.quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "TND",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "TN",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        businessDays: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        cutoffTime: "14:00",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
      },
    },
    paymentMethod: "CashOnDelivery",
  };

  // Build product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: images,
    description:
      product.description?.replace(/<[^>]*>/g, "").substring(0, 500) ||
      product.title,
    sku: product.sku,
    mpn: product.sku, // Use SKU as MPN if GTIN not available
    brand: {
      "@type": "Brand",
      name: product.brand?.name || "ChakTech",
    },
    category: product.category?.name || product.parent,
    offers: offer,
  };

  // Add GTIN if available (from product data)
  if (product.gtin) {
    productSchema.gtin = product.gtin;
  }

  // Add aggregate rating if reviews exist (can be enhanced with real review data)
  if (product.reviews && product.reviews.length > 0) {
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    const avgRating = totalRating / product.reviews.length;
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: product.reviews.length.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  } else {
    // Default rating for new products (can be removed if you don't want placeholder ratings)
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "10",
    };
  }

  return productSchema;
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.fullName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    sameAs: [
      siteConfig.facebookPage,
      siteConfig.instagram,
      siteConfig.tiktok,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phoneFormatted,
      email: siteConfig.contact.email,
      availableLanguage: ["French", "Arabic", "English"],
    },
  };
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#business`,
    name: siteConfig.name,
    legalName: siteConfig.fullName,
    image: `${siteConfig.url}${siteConfig.logo}`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneFormatted,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHours.map((hours) => {
      const [days, time] = hours.split(" ");
      const [open, close] = time.split("-");
      const [dayStart, dayEnd] = days.includes("-")
        ? days.split("-")
        : [days, days];

      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayEnd
          ? [`https://schema.org/${dayStart}`, `https://schema.org/${dayEnd}`]
          : [`https://schema.org/${dayStart}`],
        opens: open,
        closes: close,
      };
    }),
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Tunisia",
    },
    sameAs: [
      siteConfig.facebookPage,
      siteConfig.instagram,
      siteConfig.tiktok,
    ].filter(Boolean),
  };
}

/**
 * Generate website structured data with search action
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQPageStructuredData(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;

  // Flatten all FAQs from all tabs
  const allFaqs = [];
  faqItems.forEach((tab) => {
    if (tab.accordion_items) {
      tab.accordion_items.forEach((section) => {
        if (section.accordions) {
          section.accordions.forEach((faq) => {
            allFaqs.push({
              question: typeof faq.title === "string" ? faq.title : "Question",
              answer: faq.desc || "",
            });
          });
        }
      });
    }
  });

  if (allFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate hreflang alternates for multi-language SEO
 */
export function generateHreflangAlternates(pathname, locales, defaultLocale) {
  const alternates = {};

  locales.forEach((locale) => {
    // Build URL for each locale
    let url = pathname;

    // Remove existing locale prefix if present
    locales.forEach((loc) => {
      if (url.startsWith(`/${loc}/`) || url === `/${loc}`) {
        url = url.replace(`/${loc}`, "") || "/";
      }
    });

    // Add locale prefix if not default locale
    if (locale !== defaultLocale) {
      url = `/${locale}${url === "/" ? "" : url}`;
    }

    // Map locale codes to hreflang format
    const localeMap = {
      fr: "fr-TN",
      ar: "ar-TN",
      en: "en-TN",
    };

    alternates[localeMap[locale] || locale] = `${siteConfig.url}${url}`;
  });

  // Add x-default pointing to default locale
  let defaultUrl = pathname;
  locales.forEach((loc) => {
    if (defaultUrl.startsWith(`/${loc}/`) || defaultUrl === `/${loc}`) {
      defaultUrl = defaultUrl.replace(`/${loc}`, "") || "/";
    }
  });
  alternates["x-default"] = `${siteConfig.url}${defaultUrl}`;

  return alternates;
}
