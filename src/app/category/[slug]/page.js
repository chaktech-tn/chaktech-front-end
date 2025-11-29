import ShopMainArea from "@components/shop/shop-main-area";
import { siteConfig } from "@lib/seo-config";
import { generateCategoryMetadata } from "@lib/seo-utils";

async function getCategoryBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.chaktech.tn';
    const res = await fetch(`${apiUrl}/category/show`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    const categories = data?.result || [];
    // Find category by matching slug (slugified parent name)
    const category = categories.find((cat) => {
      const categorySlug = cat.parent.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return categorySlug === slug;
    });
    
    return category || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Catégorie introuvable | ChakTech",
      description: "La catégorie que vous recherchez n'existe pas.",
    };
  }

  const metadata = generateCategoryMetadata(category);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: `${siteConfig.url}/category/${slug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  // Use category parent name for filtering
  const categoryFilter = category?.parent || '';
  
  return (
    <ShopMainArea
      Category={categoryFilter}
      category={categoryFilter}
      brand={searchParams?.brand}
      priceMin={searchParams?.priceMin}
      max={searchParams?.max}
      priceMax={searchParams?.priceMax}
      color={searchParams?.color}
    />
  );
}

