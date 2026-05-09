"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import CheckoutArea from "@components/checkout/checkout-area";
import CouponArea from "@components/checkout/coupon-area";
import CheckoutProgressBar from "@components/checkout/checkout-progress-bar";
import ShopCta from "@components/cta";
import useCartInfo from "@hooks/use-cart-info";
import useCheckoutSubmit from "@hooks/use-checkout-submit";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import { trackBeginCheckout } from "@utils/posthog";
import { getOrCreateSessionToken } from "@utils/sessionToken";

// internal
import { useGetCheckoutByTokenQuery } from "src/redux/features/abandonedCheckout/abandonedCheckoutApi";
import { setSessionToken } from "src/redux/features/abandonedCheckout/abandonedCheckoutSlice";
import { add_cart_product } from "src/redux/features/cartSlice";

export default function CheckoutMainArea() {
  const checkout_data = useCheckoutSubmit();
  const { cart_products } = useSelector((state) => state.cart);
  const { total: cartTotal } = useCartInfo();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");

  const recoveryToken = searchParams?.get("recovery_token");
  const { data: recoveryData } = useGetCheckoutByTokenQuery(recoveryToken || "", { skip: !recoveryToken });

  useEffect(() => {
    const sessionToken = recoveryToken || getOrCreateSessionToken();
    if (sessionToken) {
      dispatch(setSessionToken(sessionToken));
    }
  }, [dispatch, recoveryToken]);

  useEffect(() => {
    if (recoveryData?.data && recoveryData.data.cartContents) {
      recoveryData.data.cartContents.forEach((item) => {
        const isInCart = cart_products.some((p) => p._id === item._id);
        if (!isInCart) {
          dispatch(add_cart_product(item));
        }
      });
    }
  }, [recoveryData, cart_products, dispatch]);

  useEffect(() => {
    if (cart_products.length > 0) {
      const total = checkout_data.cartTotal || cartTotal || 0;
      trackBeginCheckout(cart_products, total, "standard_page");
    }
  }, []);

  return (
    <Wrapper>
      <Header style_2={true} />
      <CheckoutProgressBar />
      <CartBreadcrumb title={t("title")} subtitle={t("title")} />
      {cart_products.length === 0 ? (
        <div className="text-center pt-80 pb-80">
          <h3 className="py-2">{tCart("empty")}</h3>
          <Link href="/shop" className="tp-btn">
            {tCart("goToShop")}
          </Link>
        </div>
      ) : (
        <>
          <CouponArea {...checkout_data} />
          <CheckoutArea {...checkout_data} recoveryData={recoveryData?.data} />
        </>
      )}
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
