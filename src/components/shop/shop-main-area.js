"use client";
import { useState, useEffect } from "react";
import React from "react";
// internal
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import ShopBreadcrumb from "@components/common/breadcrumb/shop-breadcrumb";
import ShopArea from "@components/shop/shop-area";
import { useGetShowingProductsQuery } from "src/redux/features/productApi";
import ProductPlaceholderGrid from "@components/products/product-placeholder";

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
    error,
  } = useGetShowingProductsQuery();

  // Debug: Log the data structure (remove in production)
  React.useEffect(() => {
    if (products) {
      console.log("Shop Products data structure:", {
        hasProducts: !!products.products,
        productsCount: products?.products?.length || 0,
        success: products?.success,
        keys: Object.keys(products || {}),
      });
    }
    if (error) {
      // Suppress rate limit errors in development mode
      const suppressRateLimit =
        process.env.NEXT_PUBLIC_SUPPRESS_RATE_LIMIT_ERRORS === "true" ||
        process.env.NODE_ENV === "development";

      // Check if error is empty or should be suppressed
      const errorKeys = Object.keys(error || {});
      const isEmptyError = errorKeys.length === 0;
      const isRateLimit = error?.status === 429 || error?.isRateLimitError;
      const shouldSuppress =
        error?.suppressLog || (isRateLimit && suppressRateLimit);

      // Skip logging if error is empty, suppressed, or rate limit in dev mode
      if (isEmptyError || shouldSuppress) {
        return;
      }

      // Only log meaningful errors
      console.error("Shop Products error:", error);
    }
  }, [products, error]);
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
    let all_products = products.products;
    let product_items = all_products;

    if (Category) {
      product_items = product_items.filter(
        (product) =>
          product.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
          Category
      );
    }
    if (category) {
      product_items = product_items.filter(
        (product) =>
          product.children
            .toLowerCase()
            .replace("&", "")
            .split(" ")
            .join("-") === category
      );
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
      {content}
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
