'use client';

import { formatCategoryName } from '@utils/formatCategoryName';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useGetCategoriesQuery } from 'src/redux/features/categoryApi';

const MobileCategoryMenu = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  const [expandedCategory, setExpandedCategory] = useState('');
  const t = useTranslations('common');
  
  if (isLoading) {
    return <li>{t('loading') || 'Loading...'}</li>;
  }
  
  if (isError || !categoriesData?.categories || categoriesData.categories.length === 0) {
    return null;
  }
  
  const categories = categoriesData.categories || [];
  
  const toggleCategory = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory('');
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  return (
    <>
      {categories.map((category, i) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategory === category.parent;
        
        return (
          <li 
            key={category._id || i} 
            className={hasChildren ? 'has-dropdown category-menu-item' : 'category-menu-item'}
          >
            <Link href={`/shop?category=${encodeURIComponent(category.parent)}`}>
              {formatCategoryName(category.parent)}
            </Link>
            {hasChildren && (
              <>
                <ul 
                  className="submenu"
                  style={{
                    display: isExpanded ? 'block' : 'none',
                  }}
                >
                  {category.children.map((child, j) => (
                    <li key={j}>
                      <Link href={`/shop?category=${encodeURIComponent(category.parent)}&subcategory=${encodeURIComponent(child)}`}>
                        {formatCategoryName(child)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a
                  className={`mean-expand ${isExpanded ? 'mean-clicked' : ''}`}
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory(category.parent);
                  }}
                  style={{ fontSize: '18px' }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </>
            )}
          </li>
        );
      })}
    </>
  );
};

export default MobileCategoryMenu;

