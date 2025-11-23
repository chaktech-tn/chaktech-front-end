"use client";
import React from "react";
import ProductListBlock from "./ProductListBlock";

// FeaturedProductsBlock is essentially the same as ProductListBlock
// but with different default settings
const FeaturedProductsBlock = ({ block }) => {
  const enhancedBlock = {
    ...block,
    content: {
      ...block.content,
      sortBy: block.content?.sortBy || "popular",
    },
    settings: {
      ...block.settings,
      layout: block.settings?.layout || "grid",
      columns: block.settings?.columns || 4,
    },
  };

  return <ProductListBlock block={enhancedBlock} />;
};

export default FeaturedProductsBlock;

