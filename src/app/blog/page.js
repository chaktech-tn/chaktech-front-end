import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import { siteConfig } from "@lib/seo-config";

// Force dynamic rendering for blog page
export const dynamic = 'force-dynamic';

async function getAllBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
    }
    const res = await fetch(`${apiUrl}/blog/all?limit=12&page=1`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return { blogs: [], pagination: {} };
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], pagination: {} };
  }
}

export const metadata = {
  title: "Blog | ChakTech",
  description: "Découvrez nos articles sur les dernières tendances technologiques, guides d'achat et conseils pour smartphones, PC portables et électroménager en Tunisie.",
  openGraph: {
    title: "Blog | ChakTech - Actualités et Guides High-Tech",
    description: "Restez informé des dernières tendances technologiques et trouvez les meilleurs conseils pour vos achats électroniques.",
    type: "website",
  },
};

export default async function BlogPage() {
  const { data: blogs } = await getAllBlogs();

  return (
    <Wrapper>
      <Header style_2={true} />
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="section__title-wrapper-13 mb-50 text-center">
                <h2 className="section__title-13">Blog ChakTech</h2>
                <p>Actualités, guides et conseils sur l'électronique en Tunisie</p>
              </div>
            </div>
          </div>
          <div className="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-lg-4 col-md-6 mb-50">
                  <article className="blog__item">
                    {blog.featuredImage && (
                      <div className="blog__thumb w-img">
                        <a href={`/blog/${blog.slug}`}>
                          <img 
                            src={blog.featuredImage} 
                            alt={blog.title}
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    )}
                    <div className="blog__content">
                      <div className="blog__meta">
                        <span>{new Date(blog.publishedAt).toLocaleDateString('fr-FR')}</span>
                        {blog.category && <span>{blog.category}</span>}
                      </div>
                      <h3 className="blog__title">
                        <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                      </h3>
                      {blog.excerpt && (
                        <p>{blog.excerpt}</p>
                      )}
                      <a href={`/blog/${blog.slug}`} className="blog__link">
                        Lire la suite <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center">Aucun article de blog disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </Wrapper>
  );
}

