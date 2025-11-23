'use client';
import { useTranslations } from 'next-intl';
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import CartArea from "@components/cart/cart-area";
import ShopCta from "@components/cta";

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
