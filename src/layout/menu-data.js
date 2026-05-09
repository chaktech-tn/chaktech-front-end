'use client';
import { useTranslations } from 'next-intl';

const useMenuData = () => {
  const t = useTranslations('menu');
  
  return [
    {
      id: 1,
      title: t('home'),
      link: '/',
    },
    {
      id: 2,
      title: t('shop'),
      link: '/shop',
      hasDropdown: true,
    },
    {
      id: 3,
      title: t('blog'),
      link: '/blog'
    },
    {
      id: 4,
      title: t('about'),
      link: '/about'
    },
    {
      id: 5,
      title: t('contact'),
      link: '/contact'
    },
  ];
}

export default useMenuData;
