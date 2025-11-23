import ShopDetailsMainArea from "@components/product-details/product-details-area-main";
import { generateProductMetadata, generateProductStructuredData, generateBreadcrumbStructuredData } from "@lib/seo-utils";
import { siteConfig } from "@lib/seo-config";

async function getProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
    const res = await fetch(`${apiUrl}/api/products/slug/${slug}`, {
      cache: 'no-store', // or 'force-cache' for better performance
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Produit introuvable | ChakTech",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  return generateProductMetadata(product);
}

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  // Generate structured data
  const productStructuredData = product ? generateProductStructuredData(product) : null;
  const breadcrumbData = product ? generateBreadcrumbStructuredData([
    { name: "Accueil", url: siteConfig.url },
    { name: product.category?.name || "Produits", url: `${siteConfig.url}/shop` },
    { name: product.title, url: `${siteConfig.url}/product/${slug}` },
  ]) : null;

  return (
    <>
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />
      )}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      )}
      <ShopDetailsMainArea id={product?._id} slug={slug} />
    </>
  );
};

export default ProductPage;

