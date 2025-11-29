import { siteConfig } from '@lib/seo-config';

// Force dynamic rendering for sitemap
export const dynamic = 'force-dynamic';

async function getAllProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
    }
    const res = await fetch(`${apiUrl}/products/show`, {
      next: { revalidate: 3600 }, // Revalidate every hour instead of no-store
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
}

async function getAllCategories() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
    }
    const res = await fetch(`${apiUrl}/category/show`, {
      next: { revalidate: 3600 }, // Revalidate every hour instead of no-store
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data?.result || [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

async function getAllBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
    }
    const res = await fetch(`${apiUrl}/blog/all?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour instead of no-store
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    return [];
  }
}

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-return`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  const products = await getAllProducts();
  const productPages = products
    .filter((product) => product.slug) // Only include products with slugs
    .map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : product.createdAt ? new Date(product.createdAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  
  // Also include product-details pages for products without slugs (fallback)
  const productDetailsPages = products
    .filter((product) => !product.slug && product._id)
    .map((product) => ({
      url: `${baseUrl}/product-details/${product._id}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : product.createdAt ? new Date(product.createdAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // Category pages (if you have category-specific pages)
  const categories = await getAllCategories();
  const categoryPages = categories.map((category) => {
    const categorySlug = category.parent.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return {
      url: `${baseUrl}/category/${categorySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  // Blog posts
  const blogs = await getAllBlogs();
  const blogPages = blogs
    .filter((blog) => blog.slug && blog.status === 'published')
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticPages, ...productPages, ...productDetailsPages, ...categoryPages, ...blogPages];
}

