'use client';

import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from "react";

import MobileCategoryMenu from "@components/menu/mobile-category-menu";
import { useMenu } from "@hooks/useMenu";
// internal

const MobileMenus = () => {
  const locale = useLocale();
  const { menu: mobileMenu, isLoading: mobileLoading } = useMenu('mobile', locale);
  
  const [headerFallback, setHeaderFallback] = useState([]);
  const [headerLoading, setHeaderLoading] = useState(true);

  React.useEffect(() => {
    const fetchHeader = async () => {
       try {
         // Using window.location.hostname to construct dynamic base URL just like getRuntimeApiBaseUrl does
         const protocol = window.location.protocol;
         const hostname = window.location.hostname;
         const apiBaseUrl = (hostname.match(/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/) || hostname === 'localhost')
           ? `${protocol}//${hostname}:5001`
           : process.env.NEXT_PUBLIC_API_BASE_URL;

         const res = await fetch(`${apiBaseUrl}/menus/header/${locale}`);
         if (res.ok) {
           const data = await res.json();
           if (data?.success && data?.data?.items) {
             setHeaderFallback(data.data.items);
           }
         }
       } catch (err) {
         console.error("Failed to fetch fallback header menu", err);
       } finally {
         setHeaderLoading(false);
       }
    };
    fetchHeader();
  }, [locale]);
  
  const isLoading = mobileLoading || headerLoading;
  const menuItems = mobileMenu?.items?.length > 0 ? mobileMenu.items : headerFallback;
  
  const t = useTranslations('menu');
  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  if (isLoading) {
    return (
      <nav className="mean-nav">
        <ul>
          <li>Chargement...</li>
        </ul>
      </nav>
    );
  }

  const getMenuKey = (menu) => menu.label || menu.title || menu.url;
  const mapLink = (url) => {
    if (!url) return "/";
    return url;
  };

  return (
    <nav className="mean-nav">
      <ul>
        {menuItems
          .filter((item) => item?.isActive !== false)
          .sort((a, b) => (a?.order || 0) - (b?.order || 0))
          .map((menu, i) => (
          <React.Fragment key={i}>
            {(!menu.children || menu.children.length === 0) &&<li>
              <Link href={mapLink(menu.url)}>{menu.label}</Link>
            </li>}
            {menu.children && menu.children.length > 0 && (
              <li className="has-dropdown">
                <Link href={mapLink(menu.url)}>{menu.label}</Link>
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === getMenuKey(menu) ? "block" : "none",
                  }}
                >
                  {menu.type === 'category' || menu.label === t('shop') ? (
                    // Use dynamic categories from database for Shop menu
                    <MobileCategoryMenu />
                  ) : menu.children ? (
                    menu.children.map((sub, i) => (
                      <li key={i}>
                        <Link href={mapLink(sub.url)}>{sub.label}</Link>
                      </li>
                    ))
                  ) : null}
                </ul>
                <a
                  className={`mean-expand ${
                    navTitle === getMenuKey(menu) ? "mean-clicked" : ""
                  }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileMenu(getMenuKey(menu));
                  }}
                  style={{ fontSize: "18px" }}
                >
                  <i className="fal fa-plus"></i>
                </a>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenus;
