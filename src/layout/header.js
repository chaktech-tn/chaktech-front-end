"use client";
// internal
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

import logo from "@assets/img/categories/chaktech-logo.webp";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import LiveSearchForm from "@components/forms/live-search-form";
import CategoriesMegaMenu from "@components/menu/categories-mega-menu";
import useCartInfo from "@hooks/use-cart-info";
import useSticky from "@hooks/use-sticky";
import useSiteSettings from "@hooks/useSiteSettings";
import { Cart, Heart, Search, User } from "@svg/index";
import { useMenu } from "@hooks/useMenu";
import NavLink from "@components/nav-link";

const Header = ({ style_2 = false }) => {
  const locale = useLocale();
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
  const catBtnRef = useRef(null);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);
  const { settings } = useSiteSettings(locale);
  const { menu, isLoading: menuLoading } = useMenu("header", locale);
  const { menu: topMenu } = useMenu("top-bar", locale);

  const topMenuItems = (topMenu?.items || [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const menuItems = (menu?.items || [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const logoUrl = settings?.logo?.url || logo;
  const logoAlt = settings?.logo?.altText || "ChakTech Logo";

  const closeCatMenu = useCallback(() => setIsCatMenuOpen(false), []);

  const isScrolled = sticky;

  return (
    <>
      <style>{`
        /* ── Header ── */
        .ck-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          transition: box-shadow 0.3s;
        }
        .ck-header.scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.12);
        }

        /* ── Top bar ── */
        .ck-topbar {
          background: #2b2b2b;
          color: #ccc;
          font-size: 12px;
          padding: 6px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Main bar ── */
        .ck-mainbar {
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.3s;
        }
        .ck-mainbar-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* ── Logo ── */
        .ck-logo { flex-shrink: 0; margin-right: 28px; }
        .ck-logo img { height: 40px; width: auto; display: block; }

        /* ── Categories button ── */
        .ck-cat-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          height: 72px;
          background: #e8430a;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s;
          user-select: none;
        }
        .ck-cat-btn:hover, .ck-cat-btn[aria-expanded="true"] {
          background: #c73a09;
        }
        .ck-cat-btn .ck-cat-bars {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ck-cat-btn .ck-cat-bars span {
          display: block;
          height: 2px;
          width: 18px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
        .ck-cat-btn[aria-expanded="true"] .ck-cat-bars span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .ck-cat-btn[aria-expanded="true"] .ck-cat-bars span:nth-child(2) {
          opacity: 0;
        }
        .ck-cat-btn[aria-expanded="true"] .ck-cat-bars span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── Desktop nav ── */
        .ck-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0 16px;
          padding: 0;
          list-style: none;
        }
        .ck-nav a {
          display: flex;
          align-items: center;
          height: 72px;
          padding: 0 16px;
          font-size: 13.5px;
          font-weight: 600;
          color: #2b2b2b;
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .ck-nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 3px;
          background: #e8430a;
          border-radius: 2px 2px 0 0;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        .ck-nav a:hover { color: #e8430a; }
        .ck-nav a:hover::after { transform: scaleX(1); }
        .ck-nav a.active { color: #e8430a; }
        .ck-nav a.active::after { transform: scaleX(1); }

        /* ── Vente Flash pill ── */
        .ck-nav .vente-flash-link {
          color: #e8430a;
        }
        .ck-nav .vente-flash-link span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fff5f0;
          border: 1px solid #ffd4c2;
          border-radius: 20px;
          padding: 3px 12px;
          font-size: 12.5px;
        }
        .ck-nav .vente-flash-link:hover span {
          background: #e8430a;
          border-color: #e8430a;
          color: #fff;
        }
        .ck-nav .vente-flash-link::after { display: none; }

        /* ── Mega Menu & Dropdown Support ── */
        .ck-nav-mega-menu > li { position: static; }
        .ck-nav-mega-menu .ck-mega-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #fff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          padding: 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
          transform: translateY(10px);
        }
        .ck-nav-mega-menu > li:hover .ck-mega-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .ck-nav-dropdown-menu .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          min-width: 220px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 15px 0;
          border-radius: 0 0 12px 12px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.25s;
        }
        .ck-nav-dropdown-menu > li:hover .submenu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* ── Search ── */
        .ck-search-wrap {
          flex-shrink: 1;
          min-width: 200px;
          max-width: 320px;
          width: 100%;
          position: relative;
          z-index: 999;
          margin-left: 20px;
        }

        /* ── Action icons ── */
        .ck-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .ck-action-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #2b2b2b;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        .ck-action-btn:hover {
          background: #fff5f0;
          color: #e8430a;
        }
        .ck-action-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #e8430a;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 10px;
          min-width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          line-height: 1;
        }

        /* ── Hamburger (mobile) ── */
        .ck-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          cursor: pointer;
          margin-left: 4px;
        }
        .ck-hamburger span {
          display: block;
          height: 2px;
          width: 20px;
          background: #2b2b2b;
          border-radius: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .ck-nav, .ck-cat-btn, .ck-search-wrap { display: none !important; }
          .ck-hamburger { display: flex !important; }
          .ck-mainbar-inner { padding: 0 16px; }
        }
        @media (max-width: 575px) {
          .ck-actions .ck-action-btn:not(.always-show) { display: none; }
        }

        /* ── Mobile search overlay ── */
        .ck-search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 16px 16px;
        }
        .ck-search-box {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 560px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          position: relative;
          animation: searchSlideDown 0.25s ease-out;
        }
        @keyframes searchSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className={`ck-header ${isScrolled ? "scrolled" : ""}`} id="header-sticky">
        {/* Dynamic Top Bar (Announcement) */}
        {topMenuItems.length > 0 && (
          <div className="ck-top-announcement bg-slate-900 text-white overflow-hidden py-2 relative z-[1001]">
            <div className="flex animate-marquee whitespace-nowrap gap-10 items-center justify-center min-w-full">
              {topMenuItems.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.url} 
                  className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-orange-500 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  {item.label}
                </Link>
              ))}
            </div>
            <style jsx>{`
              .animate-marquee {
                display: inline-flex;
                animation: marquee 30s linear infinite;
              }
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        )}

        {/* ── Main bar ── */}
        <div className="ck-mainbar">
          <div className="ck-mainbar-inner">
            {/* Logo */}
            <div className="ck-logo">
              <Link href="/">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={112}
                  height={40}
                  priority
                  style={{ objectFit: "contain", width: "auto", height: "40px" }}
                  unoptimized
                />
              </Link>
            </div>

            {/* Categories button (desktop) */}
            <button
              ref={catBtnRef}
              className="ck-cat-btn"
              aria-expanded={isCatMenuOpen}
              aria-haspopup="true"
              aria-controls="categories-mega-menu"
              onClick={() => setIsCatMenuOpen((v) => !v)}
              type="button"
            >
              <span className="ck-cat-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              CATÉGORIES
            </button>

            {/* Desktop nav */}
            <ul className={`ck-nav ck-nav-${menu?.layoutType || 'horizontal-bars'}`}>
              {(menuItems.length > 0 ? menuItems : [
                { label: "Accueil", url: "/" },
                { label: "Vente Flash", url: "/shop?category=vente-flash" },
                { label: "Contacts", url: "/contact" }
              ]).map((item, i) => {
                const hasChildren = item.children?.length > 0;
                const isVenteFlash = item.label?.toLowerCase().includes("vente") || item.url?.includes("vente");
                
                return (
                  <li key={i} className={hasChildren ? "has-dropdown" : ""}>
                    {isVenteFlash ? (
                      <NavLink href={item.url} className="vente-flash-link">
                        <span>⚡ {item.label}</span>
                      </NavLink>
                    ) : (
                      <NavLink href={item.url}>
                        {item.label}
                        {hasChildren && <span className="dropdown-arrow" style={{ fontSize: '8px', marginLeft: '6px', opacity: 0.5 }}>▼</span>}
                      </NavLink>
                    )}

                    {hasChildren && (
                      <div className={menu?.layoutType === 'mega-menu' ? 'ck-mega-dropdown' : 'submenu'}>
                        {menu?.layoutType === 'mega-menu' ? (
                          <div className="mega-menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                            {item.children.map((col, cIdx) => (
                              <div key={cIdx} className="mega-menu-col">
                                <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: '#111', marginBottom: '15px', letterSpacing: '0.05em' }}>
                                  {col.label}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {(col.children || []).map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <Link href={sub.url} style={{ fontSize: '13px', color: '#666', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="submenu-list" style={{ listStyle: 'none', padding: '15px 0', margin: 0 }}>
                            {item.children.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <Link href={sub.url} style={{ display: 'block', padding: '8px 25px', fontSize: '13px', color: '#444', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Desktop search */}
            <div className="ck-search-wrap">
              <LiveSearchForm />
            </div>

            {/* Action icons */}
            <div className="ck-actions">
              {/* Mobile search toggle */}
              <button
                type="button"
                className="ck-action-btn d-lg-none always-show"
                onClick={() => setIsMobileSearchOpen(true)}
                aria-label="Rechercher"
              >
                <Search />
              </button>

              {/* User */}
              {userInfo?.imageURL ? (
                <Link href="/user-dashboard" className="ck-action-btn" aria-label="Mon compte">
                  <Image
                    src={userInfo.imageURL}
                    alt="user img"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </Link>
              ) : userInfo?.name ? (
                <Link href="/user-dashboard" className="ck-action-btn" aria-label="Mon compte">
                  <span style={{ fontWeight: 700, fontSize: 14, color: "inherit" }}>
                    {userInfo.name[0].toUpperCase()}
                  </span>
                </Link>
              ) : (
                <Link href="/login" className="ck-action-btn" aria-label="Se connecter">
                  <User />
                </Link>
              )}

              {/* Wishlist */}
              <Link href="/wishlist" className="ck-action-btn" aria-label="Mes favoris">
                <Heart />
                {wishlist.length > 0 && (
                  <span className="ck-action-badge">{wishlist.length}</span>
                )}
              </Link>

              {/* Cart */}
              <button
                type="button"
                className="ck-action-btn always-show"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label="Mon panier"
              >
                <Cart />
                {quantity > 0 && (
                  <span className="ck-action-badge">{quantity}</span>
                )}
              </button>

              {/* Hamburger */}
              <button
                type="button"
                className="ck-hamburger"
                onClick={() => setIsOffCanvasOpen(true)}
                aria-label="Menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        {/* ── Categories mega-menu ── */}
        <CategoriesMegaMenu
          isOpen={isCatMenuOpen}
          onClose={closeCatMenu}
          anchorRef={catBtnRef}
        />
      </header>

      {/* Cart sidebar */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      {/* Off-canvas (mobile) */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsOffCanvasOpen={setIsOffCanvasOpen} />

      {/* Mobile search overlay */}
      {isMobileSearchOpen && (
        <div
          className="ck-search-overlay"
          onClick={() => setIsMobileSearchOpen(false)}
        >
          <div className="ck-search-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Fermer"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#f3f4f6",
                border: "none",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 18,
                color: "#444",
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, marginTop: 4 }}>
              Rechercher des produits
            </h3>
            <div style={{ position: "relative", zIndex: 10001 }}>
              <LiveSearchForm isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
