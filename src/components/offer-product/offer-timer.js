'use client';
import React from "react";
import { useTimer } from "react-timer-hook";
import { useTranslations } from 'next-intl';

const OfferTimer = ({expiryTimestamp}) => {
  const t = useTranslations('coupon');
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });
  return (
    <div
      className="product__coupon-countdown"
      data-countdown=""
    >
      <div className="product__coupon-countdown-inner">
        <ul>
          <li>
            <span data-days="">{days}</span> {t('day')}
          </li>
          <li>
            <span data-hours="">{hours}</span> {t('hrs')}
          </li>
          <li>
            <span data-minutes="">{minutes}</span> {t('min')}
          </li>
          <li>
            <span data-seconds="">{seconds}</span> {t('sec')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OfferTimer;
