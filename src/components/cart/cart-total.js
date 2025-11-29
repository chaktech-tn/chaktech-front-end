'use client';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import React from "react";

import useCartInfo from "@hooks/use-cart-info";
import useCurrency from "@hooks/use-currency";
// internal

const CartTotal = () => {
  const { total } = useCartInfo();
  const { formatPrice } = useCurrency();
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  
  return (
    <div className="cart-page-total">
      <h2>{t('cartTotals')}</h2>
      <ul className="mb-20">
        <li>
          {t('subtotal')} <span>{formatPrice(total)}</span>
        </li>
        <li>
          {t('total')} <span>{formatPrice(total)}</span>
        </li>
      </ul>
      <Link href="/checkout" className="tp-btn cursor-pointer">
        {t('proceedToCheckout')}
      </Link>
    </div>
  );
};

export default CartTotal;
