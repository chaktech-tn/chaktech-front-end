import Script from "next/script";
import ShopDetailsMainArea from "@components/product-details/product-details-area-main";
import { siteConfig } from "@lib/seo-config";
import { generateProductMetadata, generateProductStructuredData, generateBreadcrumbStructuredData } from "@lib/seo-utils";
import { serializeJsonLd } from "@/lib/serialize-json-ld";

async function getProduct(id) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
    }
    const res = await fetch(`${apiUrl}/products/${id}`, {
      cache: 'no-store', // or 'force-cache' for better performance
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return {
      title: "Produit introuvable | ChakTech",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  return generateProductMetadata(product);
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProduct(id);
  
  // Generate structured data
  const productStructuredData = product ? generateProductStructuredData(product) : null;
  const breadcrumbData = product ? generateBreadcrumbStructuredData([
    { name: "Accueil", url: siteConfig.url },
    { name: product.category?.name || "Produits", url: `${siteConfig.url}/shop` },
    { name: product.title, url: `${siteConfig.url}/product-details/${id}` },
  ]) : null;

  return (
    <>
      {productStructuredData && (
        <Script
          id={`ld-product-${id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(productStructuredData) }}
        />
      )}
      {breadcrumbData && (
        <Script
          id={`ld-breadcrumb-${id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }}
        />
      )}
      <ShopDetailsMainArea id={id} />
    </>
  );
};

export default ProductDetailsPage;
