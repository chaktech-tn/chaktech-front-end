"use client";
// internal
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

import logo from "@assets/img/categories/chaktech-logo.webp";
const LIVE_LOGO = "https://chaktech.tn/wp-content/uploads/2024/07/logo-e1720102834942.webp";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import LiveSearchForm from "@components/forms/live-search-form";
import CategoriesMegaMenu from "@components/menu/categories-mega-menu";
import useCartInfo from "@hooks/use-cart-info";
import useSticky from "@hooks/use-sticky";
import useSiteSettings from "@hooks/useSiteSettings";
import { Cart, Heart, User, Search } from "@svg/index";
import { useMenu } from "@hooks/useMenu";
import NavLink from "@components/nav-link";

const Header = () => {
  const locale = useLocale();
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
  const catBtnRef = useRef(null);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);
  const { settings } = useSiteSettings(locale);
  const { menu } = useMenu("header", locale);
  const { menu: topMenu } = useMenu("top-bar", locale);

  const menuItems = (menu?.items || [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const logoUrl = settings?.logo?.url || LIVE_LOGO || logo;
  const logoAlt = settings?.logo?.altText || "ChakTech Logo";

  const closeCatMenu = useCallback(() => setIsCatMenuOpen(false), []);

  return (
    <>
      <header className={`ck-header-v2 ${sticky ? "header-sticky" : ""}`}>
        {/* Top Bar */}
        <div className="ck-top-bar py-2 border-bottom bg-light d-none d-lg-block">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-4">
                <div className="dropdown small text-muted">
                  English <i className="fa-light fa-angle-down ms-1"></i>
                </div>
                <div className="dropdown small text-muted">
                  USD <i className="fa-light fa-angle-down ms-1"></i>
                </div>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <Link href="/wishlist" className="small text-muted text-decoration-none">Wishlist</Link>
                <Link href="/login" className="small text-muted text-decoration-none">Login</Link>
                <Link href="/register" className="small text-muted text-decoration-none">Register</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Bar (Logo, Search, Icons) */}
        <div className="ck-middle-bar py-3 bg-white border-bottom">
          <div className="container">
            <div className="row align-items-center g-3">
              <div className="col-lg-3 col-6">
                <Link href="/">
                  <Image src={logoUrl} alt={logoAlt} width={140} height={45} style={{ objectFit: "contain" }} priority />
                </Link>
              </div>
              
              <div className="col-lg-6 d-none d-lg-block">
                <div className="header-search-form">
                  <LiveSearchForm />
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="d-flex justify-content-end align-items-center gap-3 gap-md-4">
                  <Link href="/user-dashboard" className="header-action-item text-dark text-decoration-none d-flex align-items-center gap-2">
                    <div className="icon-wrap position-relative">
                      {userInfo?.imageURL ? (
                        <Image src={userInfo.imageURL} alt="user" width={24} height={24} className="rounded-circle" />
                      ) : <User />}
                    </div>
                    <span className="d-none d-xl-block small fw-bold">Account</span>
                  </Link>

                  <Link href="/wishlist" className="header-action-item text-dark text-decoration-none position-relative">
                    <Heart />
                    {wishlist.length > 0 && (
                      <span className="badge-count">{wishlist.length}</span>
                    )}
                  </Link>

                  <button onClick={() => setIsCartOpen(true)} className="header-action-item text-dark border-0 bg-transparent position-relative">
                    <Cart />
                    {quantity > 0 && (
                      <span className="badge-count">{quantity}</span>
                    )}
                  </button>

                  <button onClick={() => setIsOffCanvasOpen(true)} className="d-lg-none border-0 bg-transparent text-dark">
                    <i className="fa-light fa-bars fs-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Categories, Nav) */}
        <div className="ck-bottom-bar bg-white d-none d-lg-block shadow-sm">
          <div className="container">
            <div className="d-flex align-items-center">
              {/* Categories Button */}
              <div className="categories-dropdown me-4" ref={catBtnRef}>
                <button 
                  className="btn btn-primary rounded-0 py-3 px-4 d-flex align-items-center gap-3 border-0 fw-bold"
                  style={{ backgroundColor: "var(--primary-color)", width: "240px" }}
                  onClick={() => setIsCatMenuOpen(!isCatMenuOpen)}
                >
                  <i className="fa-light fa-bars"></i>
                  <span>ALL CATEGORIES</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="main-nav flex-grow-1">
                <ul className="list-unstyled d-flex gap-4 mb-0 py-3">
                  {menuItems.map((item, i) => (
                    <li key={i}>
                      <NavLink href={item.url} className="text-decoration-none text-dark fw-bold small text-uppercase hover-primary">
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Secondary Link */}
              <div className="secondary-nav">
                <Link href="/contact" className="text-decoration-none text-muted small fw-bold">
                  SELL ON CHAKTECH
                </Link>
              </div>
            </div>
          </div>
        </div>

        <CategoriesMegaMenu isOpen={isCatMenuOpen} onClose={closeCatMenu} anchorRef={catBtnRef} />
      </header>

      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsOffCanvasOpen={setIsOffCanvasOpen} />

      <style jsx>{`
        .header-sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          animation: slideDown 0.3s ease-out;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .badge-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary-color);
          color: white;
          font-size: 10px;
          font-weight: bold;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border: 2px solid white;
        }
        .hover-primary:hover {
          color: var(--primary-color) !important;
        }
        .ck-bottom-bar {
          border-top: 1px solid #f0f0f0;
        }
      `}</style>
    </>
  );
};

export default Header;
