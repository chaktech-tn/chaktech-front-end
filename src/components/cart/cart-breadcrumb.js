'use client';
import Link from "next/link";
import { useTranslations } from 'next-intl';

const CartBreadcrumb = ({title,subtitle}) => {
  const t = useTranslations('breadcrumb');
  
  return (
    <section className="breadcrumb__area grey-bg p-relative include-bg pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-8 col-lg-10">
            <div className="breadcrumb__content text-center p-relative z-index-1">
              <h3 className="breadcrumb__title">{title}</h3>
              <div className="breadcrumb__list">
                <span>
                  <Link href="/">{t('home')}</Link>
                </span>
                <span className="dvdr">
                  <i className="fa-solid fa-circle-small"></i>
                </span>
                <span>{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartBreadcrumb;
