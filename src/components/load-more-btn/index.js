'use client';
import LoadMore from '@svg/load-more';
import { useTranslations } from 'next-intl';
import React from 'react';

const LoadMoreBtn = ({handleLoadMore}) => {
  const t = useTranslations('search');
  
  return (
    <div className={`portfolio__load-more text-center`}>
      <button
        id="tp-load-more"
        type="button"
        onClick={handleLoadMore}
        className="tp-load-more-btn load-more mt-30 mb-50"
      >
        <LoadMore />
        {t('loadMorePost')}
      </button>
    </div>
  );
};

export default LoadMoreBtn;