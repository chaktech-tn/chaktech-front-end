"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BuyNowModal from "@components/common/modals/buy-now-modal";
import { SocialShare } from "@components/social";
import { HeartTwo, CartTwo } from "@svg/index";
// internal
import { add_cart_product } from "src/redux/features/cartSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";

import ProductDetailsCategories from "./product-details-categories";
import ProductDetailsPrice from "./product-details-price";
import ProductDetailsTags from "./product-details-tags";
import ProductQuantity from "./product-quantity";
import TrustBadges from "./trust-badges";
import QuickCodForm from "./quick-cod-form";


const ProductDetailsArea = ({ product }) => {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const {
    _id,
    image,
    relatedImages,
    title,
    quantity,
    originalPrice,
    discount,
    tags,
    sku,
  } = product || {};
  const [activeImg, setActiveImg] = useState(
    image || "/assets/img/placeholder/product-placeholder.svg"
  );
  const [imgError, setImgError] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (image) {
      setActiveImg(image);
      setImgError(false);
    } else {
      setActiveImg("/assets/img/placeholder/product-placeholder.svg");
    }
  }, [image]);

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { orderQuantity } = useSelector((state) => state.cart);
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const cssStyles = `
    .stitch-product-section {
      padding: 3rem 0;
      background-color: #ffffff;
      font-family: 'Inter', sans-serif;
    }

    .stitch-product-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    @media (min-width: 640px) {
      .stitch-product-container {
        padding: 0 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .stitch-product-container {
        padding: 0 2rem;
      }
    }

    .stitch-product-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .stitch-product-layout {
        grid-template-columns: repeat(12, 1fr);
        gap: 3rem;
      }
    }

    /* Left Column (Images) */
    .stitch-product-gallery {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      .stitch-product-gallery {
        grid-column: span 7 / span 7;
      }
    }

    .stitch-product-main-view {
      position: relative;
      width: 100%;
      background-color: #ffffff;
      border-radius: 1rem;
      border: 1px solid #f3f4f6;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      aspect-ratio: 4/3;
    }

    @media (min-width: 640px) {
      .stitch-product-main-view {
        aspect-ratio: 1/1;
      }
    }

    @media (min-width: 1024px) {
      .stitch-product-main-view {
        aspect-ratio: 4/3;
      }
    }

    .stitch-product-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stitch-badge-discount {
      background-color: #ee6d0a;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      display: inline-block;
    }
  
    .stitch-badge-new {
      background-color: #222529;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      display: inline-block;
    }

    .stitch-main-image {
      object-fit: contain;
      width: 100%;
      height: 100%;
      max-height: 500px;
      transition: transform 0.5s;
    }

    .stitch-product-main-view:hover .stitch-main-image {
      transform: scale(1.05);
    }

    .stitch-thumbnail-row {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    .stitch-thumbnail-row::-webkit-scrollbar {
      display: none;
    }

    .stitch-thumbnail-btn {
      flex-shrink: 0;
      width: 5rem;
      height: 5rem;
      border-radius: 0.75rem;
      padding: 0.5rem;
      background-color: white;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s;
    }

    @media (min-width: 640px) {
      .stitch-thumbnail-btn {
        width: 6rem;
        height: 6rem;
      }
    }

    .stitch-thumbnail-btn.active {
      border-color: #ee6d0a; /* Primary orange */
    }

    .stitch-thumbnail-btn:hover:not(.active) {
      border-color: #d1d5db;
    }

    .stitch-thumbnail-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Right Column (Info) */
    .stitch-product-info {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    @media (min-width: 1024px) {
      .stitch-product-info {
        grid-column: span 5 / span 5;
      }
    }

    .stitch-product-info-inner {
      position: sticky;
      top: 6rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .stitch-product-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stitch-product-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #222529;
      line-height: 1.25;
      margin: 0;
    }

    @media (min-width: 640px) {
      .stitch-product-title {
        font-size: 1.875rem;
      }
    }

    @media (min-width: 1024px) {
      .stitch-product-title {
        font-size: 2.25rem;
      }
    }

    .stitch-product-stock-status {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #16a34a; /* Green */
    }

    .stitch-product-price-box {
      padding: 1.25rem;
      background-color: rgba(243, 244, 246, 0.5); /* neutral-light with opacity */
      border-radius: 0.75rem;
      border: 1px solid #f3f4f6;
    }

    .stitch-price-row {
      display: flex;
      align-items: flex-end;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .stitch-current-price {
      font-size: 2.25rem;
      font-weight: 700;
      color: #ee6d0a;
      line-height: 1;
    }

    .stitch-old-price {
      font-size: 1.25rem;
      color: #9ca3af;
      text-decoration: line-through;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }

    .stitch-product-action-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .stitch-product-action-row {
        flex-direction: row;
      }
    }

    .stitch-btn-primary {
      flex: 1;
      height: 3.25rem;
      background-color: #ee6d0a;
      color: white;
      font-weight: 700;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(238, 109, 10, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
    }

    .stitch-btn-primary:hover {
      background-color: #d05c05;
      transform: translateY(-0.125rem);
    }

    .stitch-btn-wishlist {
      height: 3.25rem;
      width: 3.25rem;
      flex-shrink: 0;
      background: rgba(238, 109, 10, 0.1);
      border: 1px solid rgba(238, 109, 10, 0.2);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ee6d0a;
      transition: all 0.2s;
      cursor: pointer;
    }

    .stitch-btn-wishlist:hover, .stitch-btn-wishlist.active {
      background: rgba(238, 109, 10, 0.2);
    }
      
    .stitch-divider {
      height: 1px;
      background-color: #f3f4f6;
      width: 100%;
      margin: 0;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="stitch-product-section">
        <div className="stitch-product-container">
          <div className="stitch-product-layout">
            
            {/* Left Column: Image Gallery */}
            <div className="stitch-product-gallery">
              <div className="stitch-product-main-view group">
                <div className="stitch-product-badges">
                  {discount > 0 && (
                    <span className="stitch-badge-discount">-{discount}%</span>
                  )}
                  {/* <span className="stitch-badge-new">Nouveau</span> */}
                </div>
                
                <Image
                  className="stitch-main-image"
                  src={
                    imgError
                      ? "/assets/img/placeholder/product-placeholder.svg"
                      : activeImg || "/assets/img/placeholder/product-placeholder.svg"
                  }
                  alt={`${title} | ChakTech Tunisie`}
                  width={960}
                  height={1125}
                  priority={!imgError}
                  onError={() => {
                    if (!imgError) {
                      setImgError(true);
                      setActiveImg("/assets/img/placeholder/product-placeholder.svg");
                    }
                  }}
                  unoptimized={
                    imgError ||
                    (typeof activeImg === "string" && activeImg.includes("i.ibb.co"))
                  }
                />
              </div>

              {relatedImages && relatedImages.length > 0 && (
                <div className="stitch-thumbnail-row">
                  {relatedImages.map((img, i) => (
                    <button
                      key={i}
                      className={`stitch-thumbnail-btn ${activeImg === img ? 'active' : ''}`}
                      onClick={() => {
                        if (img) {
                          setActiveImg(img);
                          setImgError(false);
                        }
                      }}
                    >
                      <Image
                        className="stitch-thumbnail-img"
                        src={
                          imageErrors[img]
                            ? "/assets/img/placeholder/product-placeholder.svg"
                            : img || "/assets/img/placeholder/product-placeholder.svg"
                        }
                        alt={`${title} thumbnail ${i + 1}`}
                        width={110}
                        height={110}
                        onError={() => {
                          if (!imageErrors[img]) {
                            setImageErrors((prev) => ({ ...prev, [img]: true }));
                          }
                        }}
                        unoptimized={
                          imageErrors[img] ||
                          (typeof img === "string" && img.includes("i.ibb.co"))
                        }
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Information */}
            <div className="stitch-product-info">
              <div className="stitch-product-info-inner">

                <div className="stitch-product-header">
                  <h1 className="stitch-product-title">{title}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="stitch-product-stock-status">
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>check_circle</span>
                      En stock ({quantity})
                    </div>
                  </div>
                </div>

                {/* Legacy features integrated into Stitch Layout */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px",
                  backgroundColor: "#fef3c7", border: "1px solid #fbbf24", borderRadius: "6px",
                  fontSize: "14px", fontWeight: "500", color: "#92400e"
                }}>
                  <span>⚡</span>
                  <span><strong>Order within 2 hours</strong> for delivery tomorrow</span>
                </div>
                
                <p className="text-gray-500 mb-0">{t("promoText")}</p>

                {/* Pricing Box */}
                <div className="stitch-product-price-box">
                  <div className="stitch-price-row">
                    <span className="stitch-current-price">
                      {originalPrice - (originalPrice * (discount || 0)) / 100} TND
                    </span>
                    {discount > 0 && (
                      <span className="stitch-old-price">{originalPrice} TND</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 mb-0">Paiement à la livraison disponible</p>
                </div>

                {/* Quantity Stepper Custom Integration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#222529' }}>Quantité:</span>
                  <ProductQuantity />
                </div>

                <div className="stitch-divider"></div>

                {/* Main Actions */}
                <div className="stitch-product-action-row">
                  <button onClick={() => setShowBuyNowModal(true)} className="stitch-btn-primary" style={{backgroundColor: '#22c55e', boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)'}}>
                    Acheter Maintenant
                  </button>
                  <button onClick={() => handleAddProduct(product)} className="stitch-btn-primary">
                    <i className="fa-regular fa-shopping-bag"></i> Ajouter au panier
                  </button>
                  <button onClick={() => handleAddWishlist(product)} className={`stitch-btn-wishlist ${isWishlistAdded ? "active" : ""}`}>
                    <i className="fa-solid fa-heart"></i>
                  </button>
                </div>
                
                <div className="stitch-divider"></div>

                {/* Quick COD Form & TrustBadges */}
                <QuickCodForm product={product} quantity={orderQuantity || 1} />
                
                <div className="mt-2">
                  <TrustBadges />
                </div>

                {/* Meta details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <strong style={{ color: '#222529' }}>SKU:</strong> <span>{sku}</span>
                  </div>
                  <ProductDetailsCategories name={product?.category?.name} />
                  <ProductDetailsTags tag={tags} />
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ fontWeight: 600, color: '#222529', marginRight: '0.5rem' }}>Partager:</span>
                  <SocialShare />
                </div>

              </div>
            </div>

          </div>
        </div>

        <BuyNowModal show={showBuyNowModal} onHide={() => setShowBuyNowModal(false)} product={product} />
      </section>
    </>
  );
};

export default ProductDetailsArea;
