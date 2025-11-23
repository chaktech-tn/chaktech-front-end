"use client";
import React from "react";
import HeroBlock from "./blocks/HeroBlock";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";
import ProductListBlock from "./blocks/ProductListBlock";
import CategoryGridBlock from "./blocks/CategoryGridBlock";
import CustomHTMLBlock from "./blocks/CustomHTMLBlock";
import FeaturedProductsBlock from "./blocks/FeaturedProductsBlock";
import TestimonialsBlock from "./blocks/TestimonialsBlock";
import NewsletterSignupBlock from "./blocks/NewsletterSignupBlock";
import BannerBlock from "./blocks/BannerBlock";
import CTABlock from "./blocks/CTABlock";

const BlockRenderer = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks
        .filter((block) => block.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((block, index) => {
          switch (block.type) {
            case "hero":
              return <HeroBlock key={block._id || index} block={block} />;
            case "text":
              return <TextBlock key={block._id || index} block={block} />;
            case "image":
              return <ImageBlock key={block._id || index} block={block} />;
            case "product-list":
              return (
                <ProductListBlock key={block._id || index} block={block} />
              );
            case "category-grid":
              return (
                <CategoryGridBlock key={block._id || index} block={block} />
              );
            case "custom-html":
              return (
                <CustomHTMLBlock key={block._id || index} block={block} />
              );
            case "featured-products":
              return (
                <FeaturedProductsBlock key={block._id || index} block={block} />
              );
            case "testimonials":
              return (
                <TestimonialsBlock key={block._id || index} block={block} />
              );
            case "newsletter-signup":
              return (
                <NewsletterSignupBlock key={block._id || index} block={block} />
              );
            case "banner":
              return <BannerBlock key={block._id || index} block={block} />;
            case "cta":
              return <CTABlock key={block._id || index} block={block} />;
            default:
              console.warn(`Unknown block type: ${block.type}`);
              return null;
          }
        })}
    </>
  );
};

export default BlockRenderer;

