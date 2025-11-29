// internal
import BlockRenderer from "@components/content-blocks/BlockRenderer";
import ShopCta from "@components/cta";
import HeroBanner from "@components/hero-banner";
import OfferPopularProduct from "@components/offer-product";
import ShopProducts from "@components/products";
import ShopBanner from "@components/shop-banner";
import ShopCategoryArea from "@components/shop-category/shop-category";
import ShopFeature from "@components/shop-feature";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import React from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

async function getHomepageBlocks(locale = "fr") {
  try {
    const response = await fetch(
      `${API_BASE_URL}/content-blocks/homepage/${locale}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    // Suppress connection errors when backend is not running
    const isConnectionError =
      error?.cause?.code === "ECONNREFUSED" ||
      error?.message?.includes("fetch failed") ||
      error?.code === "ECONNREFUSED";

    if (!isConnectionError) {
      console.error("Error fetching homepage blocks:", error);
    }
    return [];
  }
}

async function getHomepageSEO(locale = "fr") {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pages/homepage/${locale}`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.success && data.data?.seoMeta) {
      return data.data.seoMeta;
    }
    return null;
  } catch (error) {
    // Suppress connection errors when backend is not running
    const isConnectionError =
      error?.cause?.code === "ECONNREFUSED" ||
      error?.message?.includes("fetch failed") ||
      error?.code === "ECONNREFUSED";

    if (!isConnectionError) {
      console.error("Error fetching homepage SEO:", error);
    }
    return null;
  }
}

export async function generateMetadata() {
  const seoMeta = await getHomepageSEO("fr");
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001";

  if (seoMeta) {
    return {
      title: seoMeta.title || "Accueil",
      description:
        seoMeta.description ||
        "ChakTech - Votre destination pour l'électronique en Tunisie",
      keywords: seoMeta.keywords || [
        "électronique Tunisie",
        "smartphone Tunisie",
        "e-commerce Tunisie",
      ],
      alternates: {
        canonical: seoMeta.canonicalUrl || `${baseUrl}`,
      },
      openGraph: {
        title:
          seoMeta.ogTitle || seoMeta.title || "ChakTech - E-commerce Tunisie",
        description: seoMeta.ogDescription || seoMeta.description || "",
        images: seoMeta.ogImage ? [{ url: seoMeta.ogImage }] : [],
        type: seoMeta.ogType || "website",
        url: baseUrl,
      },
      twitter: {
        card: seoMeta.twitterCard?.type || "summary_large_image",
        title: seoMeta.twitterCard?.title || seoMeta.ogTitle || seoMeta.title,
        description:
          seoMeta.twitterCard?.description ||
          seoMeta.ogDescription ||
          seoMeta.description,
        images: seoMeta.twitterCard?.image
          ? [seoMeta.twitterCard.image]
          : seoMeta.ogImage
          ? [seoMeta.ogImage]
          : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Accueil",
    description:
      "ChakTech - Votre destination pour l'électronique en Tunisie. Découvrez notre large sélection de smartphones, ordinateurs, accessoires et produits high-tech aux meilleurs prix.",
    keywords: [
      "électronique Tunisie",
      "smartphone Tunisie",
      "e-commerce Tunisie",
      "high-tech",
    ],
    openGraph: {
      title: "ChakTech - E-commerce Tunisie | Électronique et High-Tech",
      description:
        "Votre destination pour l'électronique en Tunisie. Smartphones, ordinateurs, accessoires et plus encore.",
      type: "website",
    },
  };
}

const HomeShop = async () => {
  const blocks = await getHomepageBlocks("fr");
  const hasDynamicBlocks = blocks && blocks.length > 0;

  return (
    <Wrapper>
      <Header />
      {/* Use dynamic blocks if available, otherwise use static components */}
      {hasDynamicBlocks ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <>
          <HeroBanner />
          <ShopCategoryArea />
          <ShopProducts />
          <OfferPopularProduct />
          <ShopBanner />
          <ShopFeature />
          <ShopCta />
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

export default HomeShop;
