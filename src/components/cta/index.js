'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
// internal
import bg from "@assets/img/cta/13/cta-bg-1.jpg";

const ShopCta = () => {
  const t = useTranslations('cta');
  
  // handleSubmit
  const handleSubmit = e => {
    e.preventDefault();
  }
  return (
    <section
      className="cta__area pt-50 pb-50 p-relative include-bg jarallax"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container">
        <div className="cta__inner-13 white-bg">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="cta__content-13">
                <h3 className="cta__title-13">
                  {t('title').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < t('title').split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="cta__form-13">
                <form onSubmit={handleSubmit}>
                  <div className="cta__input-13">
                    <input type="email" placeholder={t('emailPlaceholder')} />
                    <button type="submit" className="tp-btn">
                      {t('subscribe')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCta;
