"use client";
import { useTranslations } from "next-intl";
import React, { useState, useMemo, useEffect } from "react";

// internal
import { useGetShowingProductsQuery } from "src/redux/features/productApi";

import ProductPlaceholderGrid from "./product-placeholder";
import SingleProduct from "./single-product";
// internal

const ShopProducts = () => {
  const t = useTranslations("shop");
  const tCommon = useTranslations("common");
  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useGetShowingProductsQuery();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching products:", JSON.stringify(error, null, 2));
    }
  }, [isError, error]);

  // Normalize products data - handle different response structures
  const normalizedProducts = useMemo(() => {
    if (!products) return null;
    // Backend returns {success: true, products: [...]}
    if (products.products && Array.isArray(products.products)) {
      return products.products;
    }
    // Fallback: if products is directly an array
    if (Array.isArray(products)) {
      return products;
    }
    return null;
  }, [products]);
  const [activeTab, setActiveTab] = useState("top-rated");

  // tab items with translations
  const tabs = useMemo(
    () => [
      { value: "top-rated", label: t("topRated") },
      { value: "best-selling", label: t("bestSelling") },
      { value: "latest-product", label: t("latestProduct") },
    ],
    [t]
  );

  // handle tab product
  const handleTabProduct = (value) => {
    setActiveTab(value);
  };

  // decide what to render
  let content = null;

  // Show product placeholders when loading OR when there's ANY error (like Facebook)
  // This provides better UX - users see placeholders instead of error messages
  if (isLoading || isError) {
    content = <ProductPlaceholderGrid count={8} />;
  }

  // Show products if we have normalized data
  if (
    !isLoading &&
    !isError &&
    normalizedProducts &&
    normalizedProducts.length > 0
  ) {
    const show_prd = normalizedProducts.filter(
      (item) => item.itemInfo === activeTab
    );

    // If no products match the active tab, show all products instead
    const productsToShow = show_prd.length > 0 ? show_prd : normalizedProducts;

    content = productsToShow.map((product) => (
      <div key={product._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <SingleProduct product={product} />
      </div>
    ));
  }

  // Show empty state only if we have data but it's empty
  if (
    !isLoading &&
    !isError &&
    normalizedProducts &&
    normalizedProducts.length === 0
  ) {
    content = (
      <div className="col-12">
        <div
          style={{
            padding: "60px 20px",
            textAlign: "center",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              marginBottom: "20px",
              opacity: 0.5,
            }}
          >
            📦
          </div>
          <h3
            style={{
              color: "#666",
              fontSize: "24px",
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            {t("noProductsFound") || "No Products Found"}
          </h3>
          <p
            style={{
              color: "#999",
              fontSize: "16px",
            }}
          >
            {t("noProductsDescription") ||
              "There are no products available at the moment."}
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <section className={`product__popular-area pb-20`}>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="section__title-wrapper-13 mb-35">
                <h3 className="section__title-13">{t("popularProducts")}</h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="product__tab tp-tab  mb-35">
                <ul
                  className="nav nav-tabs justify-content-md-end"
                  id="productTab"
                >
                  {tabs.map((tab, i) => (
                    <li
                      key={i}
                      className="nav-item"
                      onClick={() => handleTabProduct(tab.value)}
                    >
                      <button
                        className={`nav-link text-capitalize ${
                          activeTab === tab.value ? "active" : ""
                        }`}
                        id="top-tab"
                        type="button"
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="product__tab-wrapper">
            <div className="row">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopProducts;
