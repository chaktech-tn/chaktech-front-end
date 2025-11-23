import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import Footer from "@layout/footer";
import { generateBreadcrumbStructuredData } from "@lib/seo-utils";
import { siteConfig } from "@lib/seo-config";

async function getBlogBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
    const res = await fetch(`${apiUrl}/api/blog/slug/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: "Article introuvable | ChakTech Blog",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  const title = blog.seoMeta?.title || `${blog.title} | ChakTech Blog`;
  const description = blog.seoMeta?.description || blog.excerpt || blog.content.substring(0, 160).replace(/<[^>]*>/g, '');
  const blogUrl = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = blog.featuredImage || `${siteConfig.url}${siteConfig.defaultImage}`;

  return {
    title,
    description,
    keywords: blog.seoMeta?.keywords || [blog.category, ...(blog.tags || [])],
    authors: [{ name: blog.author?.name || "ChakTech" }],
    openGraph: {
      title,
      description,
      url: blogUrl,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author?.name || "ChakTech"],
      tags: blog.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return (
      <Wrapper>
        <Header style_2={true} />
        <section className="blog__area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Article introuvable</h1>
                <p>L'article que vous recherchez n'existe pas.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Wrapper>
    );
  }

  // Generate Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: blog.featuredImage ? [blog.featuredImage] : [],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      "@type": "Person",
      name: blog.author?.name || "ChakTech",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    description: blog.excerpt || blog.content.substring(0, 200).replace(/<[^>]*>/g, ''),
    articleSection: blog.category,
    keywords: blog.tags?.join(', ') || '',
  };

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Accueil", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: blog.title, url: `${siteConfig.url}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Wrapper>
        <Header style_2={true} />
        <article className="blog__detail-area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="blog__detail-content">
                  <div className="blog__meta mb-30">
                    <span>{new Date(blog.publishedAt).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    {blog.category && <span>{blog.category}</span>}
                    {blog.views > 0 && <span>{blog.views} vues</span>}
                  </div>
                  <h1 className="blog__detail-title mb-30">{blog.title}</h1>
                  {blog.featuredImage && (
                    <div className="blog__detail-thumb mb-40">
                      <img 
                        src={blog.featuredImage} 
                        alt={blog.title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  )}
                  <div 
                    className="blog__detail-text"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog__tags mt-40">
                      <h4>Tags:</h4>
                      <div className="blog__tag-list">
                        {blog.tags.map((tag, i) => (
                          <a key={i} href={`/blog/tag/${tag}`} className="blog__tag">
                            {tag}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </Wrapper>
    </>
  );
}

