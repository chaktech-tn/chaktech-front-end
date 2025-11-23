'use client';
import React from "react";
import { useTranslations } from 'next-intl';
// internal
import { Dots, Lists } from "@svg/index";
import NiceSelect from "@ui/NiceSelect";

export function ShowingResult({ show, total }) {
  const t = useTranslations('shop');
  
  return (
    <div className="shop__result">
      <p>{t('showingResults', { show, total })}</p>
    </div>
  );
}

export function ShopShortTab({ handleTab }) {
  return (
    <div className="shop__sort-item">
      <div className="shop__sort-tab tp-tab">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => handleTab('grid')}
              className="nav-link active"
              id="nav-grid-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-grid"
              type="button"
              role="tab"
              aria-controls="nav-grid"
              aria-selected="true"
              tabIndex='-1'
            >
              <Dots />
            </button>
            <button
              onClick={() => handleTab('lists')}
              className="nav-link"
              id="nav-list-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-list"
              type="button"
              role="tab"
              aria-controls="nav-list"
              aria-selected="false"
              tabIndex='-1'
            >
              <Lists />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function ShopShortSelect({shortHandler}) {
  const t = useTranslations('shop');
  
  return (
    <div className="shop__sort-item">
      <div className="shop__sort-select">
        <NiceSelect
          options={[
            { value: "Short Filtering", text: t('shortFiltering') },
            { value: "Latest Product", text: t('latestProduct') },
            { value: "Price low to high", text: t('priceLowToHigh') },
            { value: "Price high to low", text: t('priceHighToLow') },
          ]}
          defaultCurrent={0}
          onChange={shortHandler}
          name={t('sortByLatest')}
        />
      </div>
    </div>
  );
}
