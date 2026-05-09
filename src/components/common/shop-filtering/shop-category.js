import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { formatCategoryName } from "@utils/formatCategoryName";


import ErrorMessage from "@components/error-message/error";
import ShopCategoryLoader from "@components/loader/shop-category-loader";


const CATEGORY_ICONS = {
  "telephonie": "📱", "informatique": "💻", "impression": "🖨️", "accessoires": "🎮",
  "smartwatch": "⌚", "electromenager": "🏠", "tv": "📺", "son": "🔊", "reseaux": "🌐",
  "securite": "🔒", "beaute": "💄", "bien-etre": "✨", "bagagerie": "🧳", "sport": "⚽",
  "loisirs": "🎯", "jeux": "🎮", "maison": "🏡", "bureau": "📋",
};

function getCategoryIcon(category) {
  if (category?.icon) return category.icon;
  const categorySlug = category?.parent || category;
  if (!categorySlug || typeof categorySlug !== "string") return "📦";
  const lower = categorySlug.toLowerCase().replace(/[_\s]/g, "-");
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "📦";
}

// internal
import { useGetCategoriesQuery } from "src/redux/features/categoryApi";

const ShopCategory = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const router = useRouter();
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <ShopCategoryLoader loading={isLoading}/>
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMessage message="There was an error" />;
  }

  if (!isLoading && !isError && categories?.categories?.length === 0) {
    content = <ErrorMessage message="No Category found!" />;
  }

  if (!isLoading && !isError && categories?.categories?.length > 0) {
    const category_items = categories.categories;
    content = (
      <div className="ck-sleek-categories">
        <style>{`
          .ck-sleek-categories {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .ck-cat-item {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.2s ease;
          }
          .ck-cat-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: transparent;
            cursor: pointer;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
          }
          .ck-cat-header:hover {
            background: #f9fafb;
          }
          .ck-cat-item.active .ck-cat-header {
            background: #fff5f0;
            border-left-color: #ff8a00;
          }
          .ck-cat-name {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .ck-cat-item.active .ck-cat-name {
            color: #ff8a00;
            font-weight: 600;
          }
          .ck-cat-icon {
            font-size: 16px;
            opacity: 0.7;
          }
          .ck-chevron {
            font-size: 12px;
            color: #9ca3af;
            transition: transform 0.3s ease;
          }
          .ck-cat-item.active .ck-chevron {
            transform: rotate(180deg);
            color: #ff8a00;
          }
          .ck-subcat-list {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
            background: #f9fafb;
          }
          .ck-cat-item.active .ck-subcat-list {
            max-height: 400px;
          }
          .ck-subcat-item {
            padding: 8px 16px 8px 44px;
            display: block;
            width: 100%;
            text-align: left;
            border: none;
            background: transparent;
            font-size: 13px;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.15s;
          }
          .ck-subcat-item:hover {
            color: #ff8a00;
            padding-left: 48px;
          }
          .ck-sidebar-title {
            font-size: 12px;
            font-weight: 700;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            padding-left: 4px;
          }
        `}</style>

        <div className="ck-sidebar-title">Catégories</div>

        <div className="ck-cat-list-container">
          {category_items.map((category, i) => (
            <div
              key={category._id}
              className={`ck-cat-item ${activeCategory === category.parent ? "active" : ""}`}
            >
              <div 
                className="ck-cat-header"
                onClick={() => setActiveCategory(activeCategory === category.parent ? null : category.parent)}
              >
                <div className="ck-cat-name">
                  <span className="ck-cat-icon">{getCategoryIcon(category)}</span>
                  {formatCategoryName(category.parent)}
                </div>
                <div className="ck-chevron">▼</div>
              </div>

              <div className="ck-subcat-list">
                {category.children.map((item, j) => (
                  <button
                    key={j}
                    className="ck-subcat-item"
                    onClick={() =>
                      router.push(
                        `/shop?category=${encodeURIComponent(item.toLowerCase().replace("&", "").split(" ").join("-"))}`
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="accordion-item">
      <div className="sidebar__widget-content">
        <div className="categories">
          <div id="accordion-items">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
