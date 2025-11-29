'use client';
import Brands from "@components/brands";
import BreadcrumbTwo from "@components/common/breadcrumb/breadcrumb-2";
import { useTranslations } from 'next-intl';
import React from 'react';

// internal
import AboutFaqs from "./about-faqs";
import AboutGallery from "./about-gallery";
import Services from "./services";
import TextArea from "./text-area";


const About = () => {
  const t = useTranslations('about');
  
  return (
    <>
      <BreadcrumbTwo
        subtitle={t('subtitle')}
        title={
          <>
            {t('title').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t('title').split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </>
        }
      />
      <TextArea />
      <Services />
      <AboutGallery />
      <AboutFaqs />
      <Brands />
    </>
  );
};

export default About;
