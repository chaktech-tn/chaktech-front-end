'use client';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import React from "react";

const empty_img = "/assets/img/product/cartmini/empty-cart.png";

const EmptyCart = ({ search_prd = false }) => {
  const t = useTranslations('cart');
  
  return (
    <div className="cartmini__empty text-center">
      <Image src={empty_img} alt={t('emptyCart')} width={283} height={171} />
      <p>{search_prd ? t('productNotFound') : t('emptyCart')}</p>
      {!search_prd && (
        <Link href="/shop" className="tp-btn">
          {t('goToShop')}
        </Link>
      )}
    </div>
  );
};

export default EmptyCart;
