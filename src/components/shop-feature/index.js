'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import {Payment, Refund, ShippingCar, Support} from "@svg/index";
// internal

// SingleFeature
function SingleFeature({ icon, title, subtitle }) {
  return (
    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
      <div className="features__item-13 d-flex align-items-start mb-40">
        <div className="features__icon-13">
          <span>{icon}</span>
        </div>
        <div className="features__content-13">
          <h3 className="features__title-13">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const ShopFeature = () => {
  const t = useTranslations('features');
  
  return (
    <>
      <section className="features__area pt-80 pb-20">
        <div className="container">
          <div className="row">
            <SingleFeature
              icon={<ShippingCar />}
              title={t('freeShipping')}
              subtitle={
                <>
                  {t('freeShippingDescription').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t('freeShippingDescription').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              }
            />
            <SingleFeature
              icon={<Refund/>}
              title={t('refund')}
              subtitle={
                <>
                  {t('refundDescription').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t('refundDescription').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              }
            />
            <SingleFeature
              icon={<Support />}
              title={t('support')}
              subtitle={
                <>
                  {t('supportDescription').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t('supportDescription').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              }
            />
            <SingleFeature
              icon={<Payment />}
              title={t('payment')}
              subtitle={
                <>
                  {t('paymentDescription').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t('paymentDescription').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopFeature;
