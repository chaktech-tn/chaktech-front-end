'use client';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import React, { useState } from "react";

// internal
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";

import CouponPlaceholderGrid from "./coupon-placeholder";
import SingleCoupon from "./single-coupon";

const OfferPopularProduct = () => {
  const t = useTranslations('offer');
  const [copiedCode, setCopiedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  };

  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  
  // decide what to render
  let content = null;

  // Show coupon placeholders when loading OR when there's ANY error (like Facebook)
  // This provides better UX - users see placeholders instead of error messages
  if (isLoading || isError || !offerCoupons?.length) {
    content = <CouponPlaceholderGrid count={2} />;
  } else {
    const coupon_items = offerCoupons;
    content = (
      <div className="row">
        {coupon_items.map((coupon) => (
          <SingleCoupon
            key={coupon._id}
            coupon={coupon}
            handleCopied={handleCopied}
            copied={copied}
            copiedCode={copiedCode}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="product__coupon-area porduct__offer pt-120">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-md-6">
            <div className="section__title-wrapper-13 mb-35">
              <h3 className="section__title-13">{t('dealOfTheDay')}</h3>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="product__offer-btn mb-30 text-md-end">
              <Link href="/shop" className="tp-btn">
                {t('viewAllProducts')}
              </Link>
            </div>
          </div>
        </div>

        <div className="product__coupon-area pb-120">
          <div className="container">{content}</div>
        </div>
      </div>
    </section>
  );
};

export default OfferPopularProduct;
