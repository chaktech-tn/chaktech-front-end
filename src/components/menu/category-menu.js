'use client';

import React from 'react';
import Link from 'next/link';
import { useGetCategoriesQuery } from 'src/redux/features/categoryApi';
import ShopCategoryLoader from '@components/loader/shop-category-loader';
import { formatCategoryName } from '@utils/formatCategoryName';

const CategoryMenu = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  
  if (isLoading) {
    return <ShopCategoryLoader loading={isLoading} />;
  }
  
  if (isError || !categoriesData?.categories) {
    return null;
  }
  
  const categories = categoriesData.categories || [];
  
  return (
    <>
      {categories.map((category, i) => (
        <li key={category._id || i} className="has-dropdown category-menu-item">
          <Link href={`/shop?category=${encodeURIComponent(category.parent)}`}>
            {formatCategoryName(category.parent)}
          </Link>
          {category.children && category.children.length > 0 && (
            <ul className="submenu">
              {category.children.map((child, j) => (
                <li key={j}>
                  <Link href={`/shop?category=${encodeURIComponent(category.parent)}&subcategory=${encodeURIComponent(child)}`}>
                    {formatCategoryName(child)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default CategoryMenu;

