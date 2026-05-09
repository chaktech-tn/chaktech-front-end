import { useRouter } from "next/navigation";
import React from "react";

// internal
import ShopCategory from "../../shop-filtering/shop-category";
import ShopColor from "../../shop-filtering/shop-color";
import ShopModel from "../../shop-filtering/shop-model";
import ShopPrice from "../../shop-filtering/shop-price";

const ShopSidebar = ({ all_products }) => {
  const router = useRouter();
  const handleReset = () => {
    router.push("/shop");
  };
  return (
    <div className={`shop__sidebar on-left`}>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_category">
          <ShopCategory />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <ShopModel all_products={all_products} />
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_color">
          <ShopColor all_products={all_products} />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_price">
          <ShopPrice />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion">
          <button 
            onClick={handleReset} 
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "16px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff8a00";
              e.currentTarget.style.color = "#ff8a00";
              e.currentTarget.style.background = "#fff5f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.background = "#fff";
            }}
          >
            <span><i className="fa-solid fa-rotate-right"></i> Réinitialiser les filtres</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
