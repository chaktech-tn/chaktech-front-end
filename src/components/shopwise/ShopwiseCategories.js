"use client";
import React from "react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";

const ShopwiseCategories = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  
  // Real categories from chaktech.tn to use as fallback or for better icons
  const chaktechCats = [
    { name: "Téléphonie et Tablette", slug: "telephonie-et-tablette", icon: "📱" },
    { name: "Informatique", slug: "informatique", icon: "💻" },
    { name: "Impression", slug: "impression-impression", icon: "🖨️" },
    { name: "Accessoires", slug: "accessoires", icon: "🎧" },
    { name: "Smart Watch", slug: "smart-watch", icon: "⌚" },
    { name: "Electromenager", slug: "electromenager", icon: "🧊" },
    { name: "TV-Son", slug: "tv-son", icon: "📺" },
    { name: "Beauté", slug: "beaute-et-bien-etre", icon: "💄" },
    { name: "Bagagerie", slug: "bagagerie", icon: "💼" },
    { name: "Sport", slug: "sport-et-loisirs", icon: "⚽" }
  ];

  const categories = categoriesData?.result || chaktechCats;

  if (isLoading) return <div className="py-5 text-center">Loading categories...</div>;

  return (
    <section className="shopwise-categories py-5 bg-white border-bottom">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Browse By Category</h4>
          <Link href="/shop" className="text-muted text-decoration-none small fw-bold">View All &rarr;</Link>
        </div>
        
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center">
          {categories.slice(0, 10).map((cat, i) => (
            <div key={i} className="col">
              <Link 
                href={`/shop?category=${cat.slug || cat.name}`}
                className="category-card d-block text-center text-decoration-none p-3 rounded-4 border bg-light h-100"
              >
                <div className="icon-box mb-2 fs-2">
                  {cat.icon || "📦"}
                </div>
                <span className="small fw-bold text-dark d-block">
                  {cat.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-card {
          transition: all 0.3s ease;
          border-color: #eee;
        }
        .category-card:hover {
          background-color: #fff !important;
          border-color: var(--primary-color) !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .icon-box {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .category-card:hover .icon-box {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default ShopwiseCategories;
