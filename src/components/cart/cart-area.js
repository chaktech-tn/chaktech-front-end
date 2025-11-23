'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslations } from 'next-intl';
// internal
import CartTotal from "./cart-total";
import SingleCartItem from "./single-cart";
import EmptyCart from "@components/common/sidebar/cart-sidebar/empty-cart";
import useCartInfo from "@hooks/use-cart-info";
import { trackViewCart } from "@utils/posthog";

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

  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {cart_products.length > 0 && (
              <form onSubmit={e => e.preventDefault()}>
                <div className="table-content table-responsive">
                  <div className="tp-continue-shopping">
                    <p>
                      <Link href="/shop">
                        {tCart('continueShopping')} <i className="fal fa-reply"></i>
                      </Link>
                    </p>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">{t('images')}</th>
                        <th className="cart-product-name">{t('product')}</th>
                        <th className="product-price">{t('unitPrice')}</th>
                        <th className="product-quantity">{t('quantity')}</th>
                        <th className="product-subtotal">{t('total')}</th>
                        <th className="product-remove">{t('remove')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart_products.map((item, i) => (
                        <SingleCartItem key={i} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="row justify-content-end">
                  <div className="col-md-5 mr-auto">
                    {/* cart total */}
                    <CartTotal />
                    {/* cart total */}
                  </div>
                </div>
              </form>
            )}
            {cart_products.length === 0 && <EmptyCart />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartArea;
