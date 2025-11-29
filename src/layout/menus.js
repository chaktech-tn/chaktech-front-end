'use client';

import CategoryMenu from '@components/menu/category-menu';
import { useMenu } from '@hooks/useMenu';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import React from 'react';

const Menus = () => {
  const locale = useLocale();
  const { menu, isLoading } = useMenu('header', locale);
  
  // Fallback to default menu if loading or no menu
  const menuItems = menu?.items || [];
  
  if (isLoading) {
    return (
      <ul>
        <li>Loading...</li>
      </ul>
    );
  }
  
  const renderMenuItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <li 
        key={index} 
        className={hasChildren ? 'has-dropdown' : ''}
      >
        <Link 
          href={item.url}
          target={item.openInNewTab ? '_blank' : undefined}
          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <ul className="submenu">
            {item.children.map((child, childIndex) => (
              <li key={childIndex}>
                {renderMenuItem(child, childIndex)}
              </li>
            ))}
          </ul>
        )}
        {/* Special handling for Shop menu with categories */}
        {item.type === 'category' && item.url === '/shop' && (
          <ul className="submenu">
            <CategoryMenu />
          </ul>
        )}
      </li>
    );
  };
  
  return (
    <ul>
      {menuItems
        .filter(item => item.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((item, i) => renderMenuItem(item, i))}
    </ul>
  );
};

export default Menus;

