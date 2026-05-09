"use client";
import React, { useState } from "react";

import ShopBreadcrumb from "@components/common/breadcrumb/shop-breadcrumb";
import ShopCta from "@components/cta";
import ProductPlaceholderGrid from "@components/products/product-placeholder";
import ShopArea from "@components/shop/shop-area";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

// internal
import { useGetShowingProductsQuery } from "src/redux/features/productApi";

export default function ShopMainArea({
  Category,
  category,
  brand,
  priceMin,
  max,
  priceMax,
  color,
}) {
  const {
    data: products,
    isError,
    isLoading,

  } = useGetShowingProductsQuery();

  // Debug: Log the data structure (remove in production)

  const [shortValue, setShortValue] = useState("");

  // selectShortHandler
  const selectShortHandler = (e) => {
    setShortValue(e.value);
  };

  // decide what to render
  let content = null;

  // Show product placeholders when loading OR when there's ANY error (like Facebook)
  // This provides better UX - users see placeholders instead of error messages
  if (isLoading || isError) {
    content = <ProductPlaceholderGrid count={12} />;
  }

  if (!isLoading && !isError && products?.products?.length === 0) {
    // Show placeholders for empty state too
    content = <ProductPlaceholderGrid count={12} />;
  }

  if (!isLoading && !isError && products?.products?.length > 0) {
    const all_products = products.products;
    let product_items = all_products;

    if (Category) {
      product_items = product_items.filter(
        (product) =>
          product.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
          Category
      );
    }
    if (category) {
      if (category === "vente-flash") {
        product_items = product_items.filter((product) => product.discount > 0);
      } else {
        product_items = product_items.filter(
          (product) =>
            product.children
              ?.toLowerCase()
              .replace("&", "")
              .split(" ")
              .join("-") === category
        );
      }
    }
    if (brand) {
      product_items = product_items.filter(
        (product) =>
          product.brand.name
            .toLowerCase()
            .replace("&", "")
            .split(" ")
            .join("-") === brand
      );
    }
    if (color) {
      product_items = product_items.filter((product) =>
        product.colors.includes(color)
      );
    }
    if (priceMin || max || priceMax) {
      product_items = product_items.filter((product) => {
        const price = Number(product.originalPrice);
        const minPrice = Number(priceMin);
        const maxPrice = Number(max);
        if (!priceMax && priceMin && max) {
          return price >= minPrice && price <= maxPrice;
        }
        if (priceMax) {
          return price >= priceMax;
        }
      });
    }
    // selectShortHandler
    if (shortValue === "Short Filtering") {
      product_items = all_products;
    }
    // Latest Product
    if (shortValue === "Latest Product") {
      product_items = all_products.filter(
        (product) => product.itemInfo === "latest-product"
      );
    }
    // Price low to high
    if (shortValue === "Price low to high") {
      product_items = all_products
        .slice()
        .sort((a, b) => Number(a.originalPrice) - Number(b.originalPrice));
    }
    // Price high to low
    if (shortValue === "Price high to low") {
      product_items = all_products
        .slice()
        .sort((a, b) => Number(b.originalPrice) - Number(a.originalPrice));
    }

    content = (
      <ShopArea
        products={product_items}
        all_products={all_products}
        shortHandler={selectShortHandler}
      />
    );
  }

  return (
    <Wrapper>
      <Header style_2={true} />
      <ShopBreadcrumb />
      
      {category === "vente-flash" && (
        <div className="container mt-20 mb-30">
          <div style={{
            background: "linear-gradient(135deg, #ff4e00 0%, #ff8a00 100%)",
            borderRadius: "20px",
            padding: "40px 30px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(255, 78, 0, 0.2)"
          }}>
            <div>
              <h2 style={{ color: "white", fontSize: "36px", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                <span>⚡</span> Vente Flash
              </h2>
              <p style={{ margin: "10px 0 0 0", fontSize: "16px", opacity: 0.9 }}>
                Profitez des meilleures réductions du moment ! Offres limitées.
              </p>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              padding: "15px 25px",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              Jusqu'à -50%
            </div>
          </div>
        </div>
      )}
      {content}
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
