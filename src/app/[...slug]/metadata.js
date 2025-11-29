/* eslint-disable */
export function generateMetadata(page) {
  const seoMeta = page.seoMeta || {};
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001";

  const metadata = {
    title: seoMeta.title || page.title || "Page",
    description: seoMeta.description || "",
    keywords: seoMeta.keywords || [],
    alternates: {
      canonical: seoMeta.canonicalUrl || `${baseUrl}/${page.slug}`,
    },
    robots: {
      index: seoMeta.robotsMeta?.includes("index") !== false,
      follow: seoMeta.robotsMeta?.includes("follow") !== false,
    },
    openGraph: {
      title: seoMeta.ogTitle || seoMeta.title || page.title,
      description: seoMeta.ogDescription || seoMeta.description || "",
      images: seoMeta.ogImage
        ? [
            {
              url: seoMeta.ogImage,
              width: 1200,
              height: 630,
              alt: seoMeta.ogTitle || page.title,
            },
          ]
        : [],
      type: seoMeta.ogType || "website",
      url: `${baseUrl}/${page.slug}`,
    },
    twitter: {
      card: seoMeta.twitterCard?.type || "summary_large_image",
      title: seoMeta.twitterCard?.title || seoMeta.ogTitle || page.title,
      description:
        seoMeta.twitterCard?.description ||
        seoMeta.ogDescription ||
        seoMeta.description ||
        "",
      images: seoMeta.twitterCard?.image
        ? [seoMeta.twitterCard.image]
        : seoMeta.ogImage
        ? [seoMeta.ogImage]
        : [],
    },
  };

  // Add structured data if available
  if (seoMeta.structuredData) {
    metadata.other = {
      "structured-data": JSON.stringify(seoMeta.structuredData),
    };
  }

  return metadata;
}

