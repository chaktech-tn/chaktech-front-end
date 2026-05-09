'use client';
import { useTranslations } from 'next-intl';

import CartArea from "@components/cart/cart-area";
import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export default function Cart() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  
  return (
    <Wrapper>
      <Header style_2={true} />
      <CartBreadcrumb title={t('myCart')} subtitle={tCommon('cart')} />
      <CartArea />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
