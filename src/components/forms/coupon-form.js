'use client';
import { useTranslations } from 'next-intl';
import React from "react";
import { useSelector } from "react-redux";

const CouponForm = ({handleCouponCode,couponRef}) => {
  const t = useTranslations('checkout');
  const { coupon_info } = useSelector((state) => state.coupon);
  return (
    <form onSubmit={handleCouponCode}>
      {coupon_info?.couponCode ? (
        <p>{t('couponApplied')}</p>
      ) : (
        <p className="checkout-coupon">
          <input ref={couponRef} type="text" placeholder={t('couponCode')} />
          <button className="tp-btn" type="submit">
            {t('applyCoupon')}
          </button>
        </p>
      )}
    </form>
  );
};

export default CouponForm;
