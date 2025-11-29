import ShopDetailsMainArea from "@components/product-details/product-details-area-main";
import { siteConfig } from "@lib/seo-config";
import { generateProductMetadata, generateProductStructuredData, generateBreadcrumbStructuredData } from "@lib/seo-utils";

async function getProduct(id) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.chaktech.tn';
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
      <ShopDetailsMainArea id={id} />
    </>
  );
};

export default ProductDetailsPage;
