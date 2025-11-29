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

  return (
    <section className="product__details-area pb-115">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-6">
            <div className="product__details-thumb-tab mr-70">
              <div className="product__details-thumb-content w-img">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "400px",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Image
                    src={
                      imgError
                        ? "/assets/img/placeholder/product-placeholder.svg"
                        : activeImg ||
                          "/assets/img/placeholder/product-placeholder.svg"
                    }
                    alt={`${title} - ${product?.brand?.name || ""} - ${
                      product?.category?.name || ""
                    } | ChakTech Tunisie`}
                    width={960}
                    height={1125}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "575px",
                      objectFit: "contain",
                      display: "block",
                    }}
                    onError={() => {
                      if (!imgError) {
                        setImgError(true);
                        setActiveImg(
                          "/assets/img/placeholder/product-placeholder.svg"
                        );
                      }
                    }}
                    onLoad={(e) => {
                      if (e.target.naturalWidth === 0) {
                        setImgError(true);
                        setActiveImg(
                          "/assets/img/placeholder/product-placeholder.svg"
                        );
                      }
                    }}
                    unoptimized={
                      imgError ||
                      (typeof activeImg === "string" &&
                        activeImg.includes("i.ibb.co"))
                    }
                    priority={!imgError}
                  />
                </div>
              </div>
              <div className="product__details-thumb-nav tp-tab">
                <nav>
                  <div className="d-flex justify-content-center flex-wrap">
                    {relatedImages && relatedImages.length > 0
                      ? relatedImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (img) {
                                setActiveImg(img);
                                setImgError(false);
                              }
                            }}
                            className={
                              activeImg === img ? "nav-link active" : ""
                            }
                            style={{
                              border:
                                activeImg === img
                                  ? "2px solid #3b82f6"
                                  : "2px solid transparent",
                              borderRadius: "4px",
                              overflow: "hidden",
                              padding: "2px",
                            }}
                          >
                            <Image
                              src={
                                imageErrors[img]
                                  ? "/assets/img/placeholder/product-placeholder.svg"
                                  : img ||
                                    "/assets/img/placeholder/product-placeholder.svg"
                              }
                              alt={`${title} - Image ${
                                i + 1
                              } | ChakTech Tunisie`}
                              width={110}
                              height={110}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              onError={() => {
                                if (!imageErrors[img]) {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [img]: true,
                                  }));
                                }
                              }}
                              onLoad={(e) => {
                                if (e.target.naturalWidth === 0) {
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [img]: true,
                                  }));
                                }
                              }}
                              unoptimized={
                                imageErrors[img] ||
                                (typeof img === "string" &&
                                  img.includes("i.ibb.co"))
                              }
                            />
                          </button>
                        ))
                      : null}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="product__details-wrapper">
              <div className="product__details-stock">
                <span>
                  {quantity} {t("inStock")}
                </span>
              </div>
              <h3 className="product__details-title">{title}</h3>

              {/* Urgency Indicator - Real delivery time estimate */}
              <div
                className="product__urgency-indicator mb-3"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fbbf24",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#92400e",
                }}
              >
                <span>⚡</span>
                <span>
                  <strong>Order within 2 hours</strong> for delivery tomorrow
                </span>
              </div>

              <p className="mt-20">{t("promoText")}</p>

              {/* Product Details Price */}
              <ProductDetailsPrice price={originalPrice} discount={discount} />
              {/* Product Details Price */}

              {/* quantity */}
              <ProductQuantity />
              {/* quantity */}

              {/* COD Badge - Required for Google Merchant Center */}
              <div
                className="product__cod-badge mb-3"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#f0f9ff",
                  border: "1px solid #0ea5e9",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#0369a1",
                }}
              >
                <span style={{ fontSize: "18px" }}>💵</span>
                <span>
                  <strong>Cash on Delivery Available</strong> - Pay when you
                  receive
                </span>
              </div>

              <div className="product__details-action d-flex flex-wrap align-items-center gap-2">
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className="product-add-cart-btn product-add-cart-btn-3"
                >
                  <CartTwo />
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowBuyNowModal(true)}
                  type="button"
                  className="product-buy-now-btn"
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {tCommon("buyNow")}
                </button>
                <button
                  onClick={() => handleAddWishlist(product)}
                  type="button"
                  className={`product-action-btn ${
                    isWishlistAdded ? "active" : ""
                  }`}
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    Add To Wishlist
                  </span>
                </button>
              </div>

              {/* Sticky Buy Now Button for Mobile */}
              <div
                className="product__sticky-buy-now d-md-none"
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  borderTop: "1px solid #e5e7eb",
                  padding: "12px 16px",
                  boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  display: "none", // Hidden by default, shown via CSS media query
                }}
              >
                <div className="container-fluid">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="product__sticky-price">
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#22c55e",
                        }}
                      >
                        {originalPrice -
                          (originalPrice * (discount || 0)) / 100}{" "}
                        TND
                      </span>
                      {discount > 0 && (
                        <span
                          style={{
                            fontSize: "14px",
                            textDecoration: "line-through",
                            color: "#6b7280",
                            marginLeft: "8px",
                          }}
                        >
                          {originalPrice} TND
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowBuyNowModal(true)}
                      type="button"
                      className="product-buy-now-btn-sticky"
                      style={{
                        backgroundColor: "#22c55e",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        flex: "1",
                        maxWidth: "200px",
                      }}
                    >
                      {tCommon("buyNow")}
                    </button>
                  </div>
                </div>
              </div>

              <style jsx>{`
                @media (max-width: 767.98px) {
                  .product__sticky-buy-now {
                    display: block !important;
                  }
                }
                @media (min-width: 768px) {
                  .product__sticky-buy-now {
                    display: none !important;
                  }
                }
              `}</style>
              <div className="product__details-sku product__details-more">
                <p>SKU:</p>
                <span>{sku}</span>
              </div>

              {/* Trust Badges - High Converting Product Page Element */}
              <TrustBadges />

              {/* ProductDetailsCategories */}
              <ProductDetailsCategories name={product?.category?.name} />
              {/* ProductDetailsCategories */}

              {/* Tags */}
              <ProductDetailsTags tag={tags} />
              {/* Tags */}

              <div className="product__details-share">
                <span>Share:</span>
                <SocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BuyNowModal
        show={showBuyNowModal}
        onHide={() => setShowBuyNowModal(false)}
        product={product}
      />
    </section>
  );
};

export default ProductDetailsArea;
