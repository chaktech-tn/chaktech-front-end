"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
// internal

import { useDispatch } from "react-redux";

import useCurrency from "@hooks/use-currency";
import { CartTwo, Eye, HeartTwo } from "@svg/index";
import { initialOrderQuantity } from "src/redux/features/cartSlice";
import { setProduct } from "src/redux/features/productSlice";

import { RatingFull, RatingHalf } from "./rating";

const SingleListProduct = ({ product }) => {
  const t = useTranslations("product");
  const { _id, slug, image, title, price, discount } = product || {};
  const productUrl = slug ? `/product/${slug}` : `/product-details/${_id}`;
  const router = useRouter();
  // handle dispatch
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    image || "/assets/img/placeholder/product-placeholder.svg"
  );

  // handle quick view
  const handleQuickView = (prd) => {
    dispatch(initialOrderQuantity());
    dispatch(setProduct(prd));
  };

  return (
    <React.Fragment>
      <div className="product__list-item mb-30">
        <div className="row">
          <div className="col-xl-5 col-lg-5">
            <div
              className="product__thumb product__list-thumb p-relative fix m-img"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                // Only navigate if clicking on the image area, not on buttons
                if (
                  !e.target.closest(".product__badge") &&
                  !e.target.closest(".product__list-action")
                ) {
                  router.push(productUrl);
                }
              }}
            >
              <Link
                href={productUrl}
                prefetch={true}
                style={{ display: "block", width: "100%", height: "100%" }}
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
                  width={335}
                  height={325}
                  style={{
                    width: "335px",
                    height: "325px",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={() => {
                    if (!imgError) {
                      setImgError(true);
                      setImgSrc(
                        "/assets/img/placeholder/product-placeholder.svg"
                      );
                    }
                  }}
                  onLoad={(e) => {
                    if (e.target.naturalWidth === 0) {
                      setImgError(true);
                      setImgSrc(
                        "/assets/img/placeholder/product-placeholder.svg"
                      );
                    }
                  }}
                  unoptimized={imgError || imgSrc?.includes("i.ibb.co")}
                  priority={false}
                />
              </Link>
              {discount > 0 && (
                <div className="product__badge d-flex flex-column flex-wrap">
                  <span className={`product__badge-item has-new`}>sale</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="product__list-content">
              <div className="product__rating product__rating-2 d-flex">
                <RatingFull />
                <RatingFull />
                <RatingFull />
                <RatingFull />
                <RatingHalf />
              </div>

              <h3 className="product__list-title">
                <Link
                  href={productUrl}
                  prefetch={true}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {title}
                </Link>
              </h3>
              <div className="product__list-price">
                <span className="product__list-ammount">{formatPrice(price, 2)}</span>
              </div>
              <p>{t("promoText")}</p>

              <div className="product__list-action d-flex flex-wrap align-items-center">
                <button
                  type="button"
                  className="product-add-cart-btn product-add-cart-btn-2"
                >
                  <CartTwo />
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="product-action-btn product-action-btn-2"
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    Add To Wishlist
                  </span>
                </button>
                <button
                  onClick={() => handleQuickView(product)}
                  type="button"
                  className="product-action-btn"
                >
                  <Eye />
                  <span className="product-action-tooltip">Quick view</span>
                </button>

                <Link
                  href={productUrl}
                  prefetch={true}
                  className="product-action-btn product-action-btn-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <i className="fa-solid fa-link"></i>
                  <span className="product-action-tooltip">
                    Product Details
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleListProduct;
