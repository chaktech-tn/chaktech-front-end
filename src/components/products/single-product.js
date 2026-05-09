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
      <style jsx>{`
        .ck-product-card {
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #f3f4f6;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .ck-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.04);
          border-color: #e5e7eb;
        }
        .ck-product-img-wrapper {
          position: relative;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          background: #fff;
          overflow: hidden;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ck-product-img-wrapper img {
          transition: transform 0.5s ease;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .ck-product-card:hover .ck-product-img-wrapper img {
          transform: scale(1.05);
        }
        .ck-product-content {
          padding: 0 16px 16px 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .ck-product-title {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: #111827;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 40px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ck-product-title:hover {
          color: #ff8a00;
        }
        .ck-product-price-wrapper {
          margin-top: auto;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .ck-price-current {
          font-size: 18px;
          font-weight: 700;
          color: #ff8a00;
        }
        .ck-price-old {
          font-size: 13px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-left: 8px;
        }
        .ck-product-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 10;
        }
        .ck-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .ck-badge-discount {
          background: #ef4444;
          color: white;
        }
        .ck-badge-new {
          background: #3b82f6;
          color: white;
        }
        .ck-product-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        .ck-product-card:hover .ck-product-actions {
          opacity: 1;
          transform: translateX(0);
        }
        .ck-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          color: #4b5563;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .ck-action-btn:hover {
          background: #ff8a00;
          color: white;
          transform: scale(1.1);
        }
        .ck-action-btn.active {
          background: #ef4444;
          color: white;
        }
        .ck-btn-group {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }
        .ck-btn {
          flex: 1;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }
        .ck-btn-primary {
          background: #22c55e;
          color: white;
        }
        .ck-btn-primary:hover {
          background: #16a34a;
        }
        .ck-btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }
        .ck-btn-secondary:hover {
          background: #ff8a00;
          color: white;
        }
      `}</style>
      
      <div className="ck-product-card mb-30">
        {/* Badges */}
        {discount > 0 && (
          <div className="ck-product-badges">
            <span className={`ck-badge ${discountPrd ? 'ck-badge-discount' : 'ck-badge-new'}`}>
              {discountPrd ? `-${discount}%` : t("sale")}
            </span>
            {!discountPrd && (
              <span className="ck-badge ck-badge-discount">
                {`-${discount}%`}
              </span>
            )}
          </div>
        )}

        {/* Hover Actions */}
        <div className="ck-product-actions">
          <button
            type="button"
            className={`ck-action-btn ${isWishlistAdded ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddWishlist(product);
            }}
            title={t("addToWishlist")}
          >
            <HeartTwo />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleQuickView(product);
            }}
            type="button"
            className="ck-action-btn"
            title={t("quickView")}
          >
            <Eye />
          </button>
          <Link
            href={productUrl}
            className="ck-action-btn"
            title={t("productDetails")}
          >
            <i className="fa-solid fa-link"></i>
          </Link>
        </div>

        {/* Image */}
        <div
          className="ck-product-img-wrapper"
          onClick={(e) => {
            if (!e.target.closest(".ck-action-btn") && !e.target.closest(".ck-btn")) {
              router.push(productUrl);
            }
          }}
        >
          <Image
            src={imgError ? "/assets/img/placeholder/product-placeholder.svg" : imgSrc}
            alt={`${title} - ${product?.brand?.name || ""} - ${product?.category?.name || ""} | ChakTech Tunisie`}
            width={960}
            height={1125}
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
        </div>

        {/* Content */}
        <div className="ck-product-content">
          <Link href={productUrl} prefetch={true} className="ck-product-title">
            {title}
          </Link>
          
          <div className="ck-product-price-wrapper">
            {discount > 0 ? (
              <>
                <span className="ck-price-current">
                  {formatPrice(
                    Number(originalPrice) - (Number(originalPrice) * Number(discount)) / 100,
                    2
                  )}
                </span>
                <span className="ck-price-old">
                  {formatPrice(originalPrice, 2)}
                </span>
              </>
            ) : (
              <span className="ck-price-current">
                {formatPrice(originalPrice, 2)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="ck-btn-group">
            {isAddedToCart ? (
              <Link href="/cart" className="ck-btn ck-btn-secondary">
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
                  className="ck-btn ck-btn-secondary"
                  title={t("addToCart")}
                >
                  <CartTwo />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowBuyNowModal(true);
                  }}
                  type="button"
                  className="ck-btn ck-btn-primary"
                >
                  {tCommon("buyNow")}
                </button>
              </>
            )}
          </div>
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
