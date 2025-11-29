"use client";
// internal
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import OldNewPrice from "@components/products/old-new-price";
import ProductCategories from "@components/products/product-categories";
import ProductTags from "@components/products/product-tags";
import Quantity from "@components/products/quantity";
import SocialLinks from "@components/social";
import { Compare, CartTwo, Times, HeartTwo } from "@svg/index";
import {
  add_cart_product,
  initialOrderQuantity,
} from "src/redux/features/cartSlice";
import { handleModalShow } from "src/redux/features/productSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";

import BuyNowModal from "./buy-now-modal";

const ProductModal = () => {
  const { product, isShow } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const {
    _id,
    slug,
    image,
    relatedImages,
    title,
    tags,
    SKU,
    price,
    discount,
    originalPrice,
    sku,
  } = product || {};
  const productUrl = slug ? `/product/${slug}` : `/product-details/${_id}`;
  const [activeImg, setActiveImg] = useState(image);
  const [imgError, setImgError] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const dispatch = useDispatch();
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);

  if (!product) return null;

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // initial Order Quantity
  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };
  // handle modal close
  const handleModalClose = () => {
    dispatch(handleModalShow());
    dispatch(initialOrderQuantity());
  };



  return (
    <Modal
      show={isShow}
      onHide={() => dispatch(handleModalShow())}
      className="product__modal"
      centered={true}
    >
      <div className="product__modal-wrapper">
        <div className="product__modal-close">
          <button
            className="product__modal-close-btn"
            type="button"
            onClick={() => handleModalClose()}
          >
            <Times />
          </button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="product__modal-thumb-wrapper">
              <div className="product__details-thumb-tab mr-40">
                <div className="product__details-thumb-content w-img">
                  <div className="tab-content" id="nav-tabContent">
                    <div className="active-img">
                      <Image
                        priority
                        src={
                          imgError
                            ? "/assets/img/placeholder/product-placeholder.svg"
                            : activeImg ||
                              "/assets/img/placeholder/product-placeholder.svg"
                        }
                        alt={t("title")}
                        width={510}
                        height={485}
                        style={{ width: "100%", height: "100%" }}
                        onError={() => {
                          if (!imgError) {
                            setImgError(true);
                          }
                        }}
                        onLoad={(e) => {
                          if (e.target.naturalWidth === 0) {
                            setImgError(true);
                          }
                        }}
                        unoptimized={
                          imgError || activeImg?.includes("i.ibb.co")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="product__details-thumb-nav tp-tab">
                  <nav>
                    <div className="nav nav-tabs justify-content-sm-between">
                      {relatedImages.map((img, i) => (
                        <button
                          key={i}
                          className={`nav-link ${
                            img === activeImg ? "active" : ""
                          }`}
                          onClick={() => {
                            setActiveImg(img);
                            setImgError(false);
                          }}
                        >
                          <Image
                            priority
                            src={
                              imageErrors[img]
                                ? "/assets/img/placeholder/product-placeholder.svg"
                                : img ||
                                  "/assets/img/placeholder/product-placeholder.svg"
                            }
                            alt={t("title")}
                            width={90}
                            height={90}
                            style={{ width: "100%", height: "100%" }}
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
                              imageErrors[img] || img?.includes("i.ibb.co")
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product__details-wrapper">
              <h3 className="product__details-title">{title}</h3>
              <p className="mt-20">{t("promoText")}</p>
              {/* Price */}
              <OldNewPrice originalPrice={originalPrice} discount={discount} />
              {/* Price */}

              {/* quantity */}
              <Quantity />
              {/* quantity */}
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
                <Link href={productUrl}>
                  <button type="button" className="product-action-btn">
                    <i className="fa-solid fa-link"></i>
                    <span className="product-action-tooltip">
                      Product Details
                    </span>
                  </button>
                </Link>
              </div>
              <div className="product__details-sku product__details-more">
                <p>SKU:</p>
                <span>{sku}</span>
              </div>
              {/* Product Categories */}
              <ProductCategories />
              {/* Product Categories */}

              {/* Tags */}
              <ProductTags tag={tags} />
              {/* Tags */}
              <div className="product__details-share">
                <span>Share:</span>
                <SocialLinks />
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
    </Modal>
  );
};

export default ProductModal;
