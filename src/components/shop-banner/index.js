'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
// internal
import electromenager_banner from '@assets/img/banners/electromenager-banner.webp';
import pc_portable_banner from '@assets/img/banners/pc-portable-banner.jpg';
import { RightArrow } from '@svg/index';

const ShopBanner = () => {
  const t = useTranslations('banner');
  const tFooter = useTranslations('footer');
  
  return (
    <section className="banner__area">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
            <div className="banner__item p-relative">
              <Link href="/shop?category=Electromenager">
                <Image 
                  src={electromenager_banner} 
                  alt={tFooter('appliances')} 
                  width={600}
                  height={400}
                  className="banner__img"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <div className="banner__content banner__content-overlay">
                  <span>{tFooter('appliances')}</span>
                  <h3 className="banner__title">
                    {t('viewAll')}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
            <div className="banner__item p-relative">
              <Link href="/shop?category=Informatique">
                <Image 
                  src={pc_portable_banner} 
                  alt={tFooter('laptops')} 
                  width={600}
                  height={400}
                  className="banner__img"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <div className="banner__content banner__content-overlay">
                  <span>{tFooter('laptops')}</span>
                  <h3 className="banner__title">
                    {t('viewAll')}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;