'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import React from 'react';

import CategoryMenu from '@components/menu/category-menu';
import { useMenu } from '@hooks/useMenu';

const defaultMenuItems = [
  { label: 'Accueil', url: '/', type: 'internal', order: 0, isActive: true },
  { label: 'Boutique', url: '/shop', type: 'category', order: 1, isActive: true },
  { label: 'Blog', url: '/blog', type: 'internal', order: 2, isActive: true },
  { label: 'À propos', url: '/about', type: 'internal', order: 3, isActive: true },
  { label: 'Contact', url: '/contact', type: 'internal', order: 4, isActive: true },
];

const Menus = () => {
  const locale = useLocale();
  const { menu, isLoading } = useMenu('header', locale);
  
  // Fallback to a safe storefront navigation if no backend menu exists yet
  const menuItems = menu?.items?.length ? menu.items : defaultMenuItems;
  
  if (isLoading) {
    return <ul />;
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
            {item.children.map((child, childIndex) =>
              renderMenuItem(child, childIndex)
            )}
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
