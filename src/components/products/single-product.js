"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BuyNowModal from "@components/common/modals/buy-now-modal";
import useCurrency from "@hooks/use-currency";
import { CartTwo, Eye, HeartTwo } from "@svg/index";
import { trackAddToCart } from "@utils/posthog";
// internal

import {
  add_cart_product,
  initialOrderQuantity,
} from "src/redux/features/cartSlice";
import { setProduct } from "src/redux/features/productSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";

import OldNewPrice from "./old-new-price";



const SingleProduct = ({ product, discountPrd = false }) => {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const { _id, slug, image, title, discount, originalPrice } =
    product || {};
  const productUrl = slug ? `/product/${slug}` : `/product-details/${_id}`;
  const router = useRouter();
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    image || "/assets/img/placeholder/product-placeholder.svg"
  );

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
    // Track add to cart event in PostHog
    const quantity = prd.orderQuantity || 1;
    trackAddToCart(prd, quantity);
  };
  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle quick view
  const handleQuickView = (prd) => {
    dispatch(initialOrderQuantity());
    dispatch(setProduct(prd));
  };

  return (
    <React.Fragment>
      <div className="product__item p-relative transition-3 mb-50">
        <div
          className="product__thumb w-img p-relative fix"
          style={{ position: "relative", cursor: "pointer" }}
          onClick={(e) => {
            // Only navigate if clicking on the image area, not on buttons
            if (
              !e.target.closest(".product__action") &&
              !e.target.closest(".product__add") &&
              !e.target.closest(".product__badge")
            ) {
              router.push(productUrl);
            }
          }}
        >
          <Link
            href={productUrl}
            prefetch={true}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
              pointerEvents: "auto",
            }}
            onClick={(e) => {
              // Prevent double navigation
              e.stopPropagation();
            }}
          >
            <Image
              src={
                imgError
                  ? "/assets/img/placeholder/product-placeholder.svg"
                  : imgSrc
              }
              alt={`${title} - ${product?.brand?.name || ""} - ${
                product?.category?.name || ""
              } | ChakTech Tunisie`}
              width={960}
              height={1125}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={() => {
                if (!imgError) {
                  setImgError(true);
                  setImgSrc("/assets/img/placeholder/product-placeholder.svg");
                }
              }}
              onLoad={(e) => {
                if (e.target.naturalWidth === 0) {
                  setImgError(true);
                  setImgSrc("/assets/img/placeholder/product-placeholder.svg");
                }
              }}
              unoptimized={imgError || imgSrc?.includes("i.ibb.co")}
              priority={false}
            />
          </Link>

          {discount > 0 && (
            <div className="product__badge d-flex flex-column flex-wrap">
              <span
                className={`product__badge-item ${
                  discountPrd ? "has-offer" : "has-new"
                }`}
              >
                {discountPrd ? `-${discount}%` : t("sale")}
              </span>
              {!discountPrd && (
                <span className={`product__badge-item has-offer`}>
                  {`-${discount}%`}
                </span>
              )}
            </div>
          )}

          <div
            className="product__action d-flex flex-column flex-wrap"
            style={{
              zIndex: 10,
              position: "absolute",
              top: "15px",
              right: "15px",
              pointerEvents: "auto",
            }}
          >
            <button
              type="button"
              className={`product-action-btn ${
                isWishlistAdded ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddWishlist(product);
              }}
            >
              <HeartTwo />
              <span className="product-action-tooltip">
                {t("addToWishlist")}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuickView(product);
              }}
              type="button"
              className="product-action-btn"
            >
              <Eye />
              <span className="product-action-tooltip">{t("quickView")}</span>
            </button>
            <Link
              href={productUrl}
              className="product-action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              <i className="fa-solid fa-link"></i>
              <span className="product-action-tooltip">
                {t("productDetails")}
              </span>
            </Link>
          </div>
          <div
            className="product__add transition-3 d-flex gap-2"
            style={{
              zIndex: 10,
              position: "absolute",
              bottom: "12px",
              left: "12px",
              right: "12px",
              pointerEvents: "auto",
              gap: "8px",
            }}
          >
            {isAddedToCart ? (
              <Link 
                href="/cart" 
                className="product-add-cart-btn flex-fill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                <CartTwo />
                {t("viewCart")}
              </Link>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddProduct(product);
                  }}
                  type="button"
                  className="product-add-cart-btn flex-fill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    fontSize: "13px",
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <CartTwo />
                  <span>{t("addToCart")}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowBuyNowModal(true);
                  }}
                  type="button"
                  className="product-buy-now-btn flex-fill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    fontSize: "13px",
                    fontWeight: "500",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#16a34a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#22c55e";
                  }}
                >
                  <span>{tCommon("buyNow")}</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="product__content">
          <h3 className="product__title">
            <Link
              href={productUrl}
              prefetch={true}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {title}
            </Link>
          </h3>
          {discount <= 0 && (
            <div className="product__price">
              <span className="product__ammount">
                {formatPrice(originalPrice, 2)}
              </span>
            </div>
          )}
          {discount > 0 && (
            <OldNewPrice originalPrice={originalPrice} discount={discount} />
          )}
        </div>
      </div>
      <BuyNowModal
        show={showBuyNowModal}
        onHide={() => setShowBuyNowModal(false)}
        product={product}
      />
    </React.Fragment>
  );
};

export default SingleProduct;
