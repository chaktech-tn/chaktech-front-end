'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import LoadMore from '@svg/load-more';

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