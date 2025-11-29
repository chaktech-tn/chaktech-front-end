import useCartInfo from "@hooks/use-cart-info";
import useCurrency from "@hooks/use-currency";
import { trackViewCart } from "@utils/posthog";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// internal
import EmptyCart from "./empty-cart";
import SingleCartItem from "./single-cart-item";


const CartSidebar = ({ isCartOpen, setIsCartOpen }) => {
  const { cart_products } = useSelector((state) => state.cart);
  const {total} = useCartInfo();
  const { formatPrice } = useCurrency();
  const hasTrackedRef = useRef(false);

  // Track view cart when sidebar opens
  useEffect(() => {
    if (isCartOpen && cart_products.length > 0 && !hasTrackedRef.current) {
      trackViewCart(cart_products, total);
      hasTrackedRef.current = true;
    }
    // Reset tracking when cart closes
    if (!isCartOpen) {
      hasTrackedRef.current = false;
    }
  }, [isCartOpen, cart_products, total]);

  return (
    <React.Fragment>
      <div className={`cartmini__area ${isCartOpen ? "cartmini-opened" : ""}`}>
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper ">
            <div className="cartmini__top p-relative">
              <div className="cartmini__title">
                <h4>Shopping cart</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => setIsCartOpen(false)}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            {cart_products.length > 0 && (
              <div className="cartmini__widget">
                {cart_products.map((item, i) => (
                  <SingleCartItem key={i} item={item} />
                ))}
              </div>
            )}
            {/* <!-- if no item in cart --> */}
            {cart_products.length === 0 && (
              <EmptyCart/>
            )}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-30">
              <h4>Subtotal:</h4>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link href="/cart" className="tp-btn mb-10 w-100">
                <span></span> view cart
              </Link>
              <Link href="/checkout" className="tp-btn-border w-100 cursor-pointer">
                <span></span> checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`body-overlay ${isCartOpen ? "opened" : ""}`}
      ></div>
    </React.Fragment>
  );
};

export default CartSidebar;
