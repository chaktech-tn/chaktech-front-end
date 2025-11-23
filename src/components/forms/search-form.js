'use client';
import React, { useState } from "react";
import Search from "@svg/search";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';

const SearchForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('hero');
  const [searchText, setSearchText] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      // Encode the search query properly
      const encodedQuery = encodeURIComponent(searchText.trim());
      // Navigate to search page
      router.push(`/search?query=${encodedQuery}`);
      setSearchText("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="header__search-input-13 d-none d-xxl-block">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          placeholder={t('searchPlaceholder')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          <Search />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
