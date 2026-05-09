'use client';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import EmptyCart from "@components/common/sidebar/cart-sidebar/empty-cart";
import useCartInfo from "@hooks/use-cart-info";
import { trackViewCart } from "@utils/posthog";

// internal
import CartTotal from "./cart-total";
import SingleCartItem from "./single-cart";
import CouponUpdateCart from "./coupon-update";


// cart items

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const t = useTranslations('common');
  const tCart = useTranslations('cart');

  // Track view cart on page load
  useEffect(() => {
    if (cart_products.length > 0) {
      trackViewCart(cart_products, total);
    }
  }, []); // Only track once on mount

  const cssStyles = `
    .stitch-cart-section {
      padding: 4rem 0;
      background-color: #f5f8f8;
      font-family: 'Inter', sans-serif;
    }

    .stitch-cart-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    @media (min-width: 768px) {
      .stitch-cart-container {
        padding: 0 2.5rem;
      }
    }

    .stitch-cart-breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      font-size: 0.875rem;
      margin-bottom: 2rem;
    }

    .stitch-cart-breadcrumbs a {
      color: #6b7280;
      font-weight: 500;
      transition: color 0.2s;
      text-decoration: none;
    }

    .stitch-cart-breadcrumbs a:hover {
      color: #ee6d0a;
    }

    .stitch-cart-breadcrumbs span {
      color: #9ca3af;
    }

    .stitch-cart-breadcrumbs .current {
      color: #222529;
      font-weight: 600;
    }

    .stitch-cart-header {
      font-size: 1.875rem;
      font-weight: 800;
      color: #222529;
      margin-bottom: 2rem;
      letter-spacing: -0.025em;
    }

    @media (min-width: 1024px) {
      .stitch-cart-header {
        font-size: 2.25rem;
      }
    }

    .stitch-cart-count {
      color: #9ca3af;
      font-weight: 500;
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }

    .stitch-cart-layout {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
    }

    @media (min-width: 1024px) {
      .stitch-cart-layout {
        flex-direction: row;
        gap: 3rem;
      }
    }

    .stitch-cart-items-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .stitch-cart-desktop-headers {
      display: none;
      justify-content: space-between;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (min-width: 768px) {
      .stitch-cart-desktop-headers {
        display: flex;
      }
    }

    /* Single Cart Item Styles */
    .stitch-cart-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background-color: white;
      border-radius: 0.75rem;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition: box-shadow 0.2s;
    }

    .stitch-cart-item:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    @media (min-width: 768px) {
      .stitch-cart-item {
        flex-direction: row;
      }
    }

    .stitch-cart-item-info {
      display: flex;
      width: 100%;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-info {
        width: 50%;
      }
    }

    .stitch-cart-item-image {
      flex-shrink: 0;
      background-color: #f9fafb;
      border-radius: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #f3f4f6;
      width: 6rem;
      height: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stitch-cart-item-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .stitch-cart-item-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #222529;
      text-decoration: none;
      margin-bottom: 0.25rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.2s;
    }

    .stitch-cart-item-title:hover {
      color: #ee6d0a;
    }

    .stitch-cart-item-price-mobile {
      font-weight: 700;
      color: #ee6d0a;
      margin-top: 0.25rem;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-price-mobile {
        display: none;
      }
    }

    .stitch-cart-item-quantity-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-quantity-wrapper {
        width: 16.666%;
        justify-content: center;
      }
    }

    .stitch-cart-item-quantity-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-quantity-label {
        display: none;
      }
    }

    .stitch-cart-stepper {
      display: flex;
      align-items: center;
      border: 1px solid #e5e7eb;
      border-radius: 9999px;
      height: 2.25rem;
      background-color: white;
      justify-content: space-between;
      min-width: 100px;
    }

    .stitch-cart-stepper-btn {
      width: 2.25rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      background: transparent;
      border: none;
      transition: all 0.2s;
      cursor: pointer;
    }

    .stitch-cart-stepper-btn:hover {
      color: #ee6d0a;
      background-color: #f9fafb;
    }

    .stitch-cart-stepper-btn:first-child {
      border-top-left-radius: 9999px;
      border-bottom-left-radius: 9999px;
    }

    .stitch-cart-stepper-btn:last-child {
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
    }

    .stitch-cart-stepper-input {
      width: 2.5rem;
      height: 100%;
      border: none;
      text-align: center;
      font-size: 0.875rem;
      font-weight: 600;
      color: #222529;
      background: transparent;
      padding: 0;
    }
    
    .stitch-cart-stepper-input:focus {
      outline: none;
    }

    .stitch-cart-item-price-desktop {
      display: none;
      width: 16.666%;
      justify-content: flex-end;
      font-size: 1.125rem;
      font-weight: 700;
      color: #222529;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-price-desktop {
        display: flex;
      }
    }

    .stitch-cart-item-remove-wrapper {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }

    @media (min-width: 768px) {
      .stitch-cart-item-remove-wrapper {
        width: 8.333%;
      }
    }

    .stitch-cart-item-remove-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #9ca3af;
      font-size: 0.875rem;
      font-weight: 500;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color 0.2s;
    }

    .stitch-cart-item-remove-btn:hover {
      color: #dc2626; /* Red for delete */
    }

    @media (min-width: 768px) {
      .stitch-cart-item-remove-text {
        display: none;
      }
    }

    .stitch-cart-summary-wrapper {
      width: 100%;
      flex-shrink: 0;
    }

    @media (min-width: 1024px) {
      .stitch-cart-summary-wrapper {
        width: 380px;
        position: sticky;
        top: 2rem;
      }
    }

    /* Wrap the legacy CartTotal to match the new dark-styled Stitch summary box slightly */
    .stitch-cart-summary-box {
      background-color: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #f3f4f6;
      padding: 1.5rem;
    }

    .stitch-continue-shopping {
      margin-top: 1.5rem;
      text-align: center;
    }

    .stitch-continue-shopping a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s;
    }

    .stitch-continue-shopping a:hover {
      color: #ee6d0a;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="stitch-cart-section">
        <div className="stitch-cart-container">
          
          <div className="stitch-cart-breadcrumbs">
            <Link href="/">Accueil</Link>
            <span className="fa-regular fa-chevron-right text-xs"></span>
            <span className="current">Mon Panier</span>
          </div>

          <h1 className="stitch-cart-header">
            Mon Panier
            {cart_products.length > 0 && (
              <span className="stitch-cart-count">({cart_products.length} {cart_products.length > 1 ? 'articles' : 'article'})</span>
            )}
          </h1>

          {cart_products.length > 0 ? (
            <div className="stitch-cart-layout">
              {/* Left Column: Cart Items */}
              <div className="stitch-cart-items-wrapper">
                <div className="stitch-cart-desktop-headers">
                  <div style={{ width: '50%' }}>Produit</div>
                  <div style={{ width: '16.666%', textAlign: 'center' }}>Quantité</div>
                  <div style={{ width: '16.666%', textAlign: 'right' }}>Prix</div>
                  <div style={{ width: '8.333%', textAlign: 'right' }}></div>
                </div>

                {cart_products.map((item, i) => (
                  <SingleCartItem key={i} item={item} />
                ))}

                <div className="mt-4">
                  <CouponUpdateCart />
                </div>
              </div>

              {/* Right Column: Order Summary (Wrapped existing CartTotal) */}
              <div className="stitch-cart-summary-wrapper">
                <div className="stitch-cart-summary-box">
                  <CartTotal />
                </div>
                
                <div className="stitch-continue-shopping">
                  <Link href="/shop">
                    <i className="fa-regular fa-arrow-left"></i> Continuer vos achats
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}

        </div>
      </section>
    </>
  );
};

export default CartArea;
