"use client";
// internal
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import logo from "@assets/img/categories/chaktech-logo.webp";
import OffCanvas from "@components/common/off-canvas";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import LiveSearchForm from "@components/forms/live-search-form";
import useCartInfo from "@hooks/use-cart-info";
import useSticky from "@hooks/use-sticky";
import { useSiteSettings } from "@hooks/useSiteSettings";
import { Cart, Heart, Search, User } from "@svg/index";

import Menus from "./menus";

const Header = ({ style_2 = false }) => {
  const locale = useLocale();
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);
  const { settings } = useSiteSettings(locale);

  // Use dynamic logo or fallback to default
  const logoUrl = settings?.logo?.url || logo;
  const logoAlt = settings?.logo?.altText || "ChakTech Logo";
  return (
    <>
      <header>
        <div className={`header__area ${style_2 ? "" : "header__transparent"}`}>
          <div
            className={`header__bottom-13 header__padding-7 header__black-3 header__bottom-border-4 ${
              style_2 ? "header__bottom-13-white" : ""
            } header__sticky ${sticky ? "header-sticky" : ""}`}
            id="header-sticky"
            style={{
              backgroundColor: sticky
                ? "rgba(255, 255, 255, 0.95)"
                : "transparent",
              backdropFilter: sticky ? "blur(10px)" : "none",
            }}
          >
            <div className="container-fluid">
              <div className="mega-menu-wrapper p-relative">
                <div className="row align-items-center" style={{ margin: 0 }}>
                  {/* Logo - Responsive sizing */}
                  <div className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6">
                    <div className="logo" style={{ 
                      display: "flex", 
                      alignItems: "center",
                      height: "100%",
                      minHeight: "60px"
                    }}>
                      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                        <Image
                          src={logoUrl}
                          alt={logoAlt}
                          width={112}
                          height={42}
                          priority
                          style={{ 
                            objectFit: "contain",
                            maxWidth: "100%",
                            height: "auto",
                            width: "auto",
                            maxHeight: "42px"
                          }}
                          unoptimized
                        />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Main Menu - Hidden on mobile/tablet */}
                  <div className="col-xxl-6 col-xl-7 col-lg-6 d-none d-lg-block">
                    <div className="main-menu main-menu-13 pl-45 main-menu-ff-space">
                      <nav id="mobile-menu-3">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  
                  {/* Right Side Actions - Responsive */}
                  <div className="col-xxl-5 col-xl-3 col-lg-3 col-md-8 col-sm-7 col-6">
                    <div
                      className="header__bottom-right-13 d-flex justify-content-end align-items-center"
                      style={{
                        flexWrap: "nowrap",
                        gap: "6px",
                        width: "100%",
                        justifyContent: "flex-end",
                        paddingLeft: "0",
                      }}
                    >
                      {/* Desktop Search */}
                      <div
                        className="header__search-13 d-none d-lg-block"
                        style={{
                          flexShrink: 1,
                          minWidth: "200px",
                          maxWidth: "280px",
                          width: "100%",
                          position: "relative",
                          zIndex: 9999,
                          marginRight: "8px",
                        }}
                      >
                        <LiveSearchForm />
                      </div>
                      
                      {/* Mobile/Tablet Search Button */}
                      <div
                        className="d-lg-none"
                        style={{ flexShrink: 0 }}
                      >
                        <button
                          onClick={() => setIsMobileSearchOpen(true)}
                          type="button"
                          style={{
                            background: "transparent",
                            border: "none",
                            padding: "10px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: style_2 ? "#fff" : "#111",
                            minWidth: "44px",
                            minHeight: "44px",
                            borderRadius: "4px",
                            transition: "background-color 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          aria-label="Search"
                        >
                          <Search />
                        </button>
                      </div>
                      
                      {/* User Actions - Visible on sm and up */}
                      <div
                        className="header__action-13 d-none d-sm-flex"
                        style={{ 
                          flexShrink: 0,
                          gap: "4px",
                        }}
                      >
                        <ul
                          style={{
                            display: "flex",
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            gap: "6px",
                            alignItems: "center",
                          }}
                        >
                          {userInfo?.imageURL ? (
                            <li>
                              <Link 
                                href="/user-dashboard"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minWidth: "44px",
                                  minHeight: "44px",
                                }}
                              >
                                <Image
                                  src={userInfo.imageURL}
                                  alt="user img"
                                  width={35}
                                  height={35}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Link>
                            </li>
                          ) : userInfo?.name ? (
                            <li>
                              <Link 
                                href="/user-dashboard"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minWidth: "44px",
                                  minHeight: "44px",
                                }}
                              >
                                <h2 className="text-uppercase tp-user-login-avater" style={{ margin: 0 }}>
                                  {userInfo.name[0]}
                                </h2>
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link 
                                href="/login"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minWidth: "44px",
                                  minHeight: "44px",
                                  padding: "8px",
                                }}
                              >
                                <User />
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link 
                              href="/wishlist"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: "44px",
                                minHeight: "44px",
                                padding: "8px",
                                position: "relative",
                              }}
                            >
                              <Heart />
                              {wishlist.length > 0 && (
                                <span className="tp-item-count">
                                  {wishlist.length}
                                </span>
                              )}
                            </Link>
                          </li>
                          <li>
                            <button
                              className="cartmini-open-btn"
                              onClick={() => setIsCartOpen(!isCartOpen)}
                              type="button"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: "44px",
                                minHeight: "44px",
                                padding: "8px",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              <Cart />
                              {quantity > 0 && (
                                <span className="tp-item-count">{quantity}</span>
                              )}
                            </button>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Mobile Actions - Only cart on very small screens */}
                      <div className="d-sm-none">
                        <button
                          className="cartmini-open-btn"
                          onClick={() => setIsCartOpen(!isCartOpen)}
                          type="button"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "44px",
                            minHeight: "44px",
                            padding: "8px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            position: "relative",
                            color: style_2 ? "#fff" : "#111",
                          }}
                        >
                          <Cart />
                          {quantity > 0 && (
                            <span className="tp-item-count">{quantity}</span>
                          )}
                        </button>
                      </div>
                      
                      {/* Hamburger Menu - Hidden on desktop */}
                      <div className="header__hamburger d-lg-none" style={{ flexShrink: 0, marginLeft: "4px" }}>
                        <button
                          onClick={() => setIsOffCanvasOpen(true)}
                          type="button"
                          className="hamburger-btn hamburger-btn-black offcanvas-open-btn"
                          style={{
                            minWidth: "44px",
                            minHeight: "44px",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Menu"
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* cart mini area start */}
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {/* cart mini area end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsOffCanvasOpen={setIsOffCanvasOpen}
      />
      {/* off canvas end */}

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 10000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "60px",
            padding: "16px",
            overflowY: "auto",
          }}
          onClick={() => setIsMobileSearchOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "600px",
              padding: "24px",
              paddingTop: "50px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              position: "relative",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              type="button"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#f3f4f6",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.2s ease",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e7eb";
                e.currentTarget.style.color = "#111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#666";
              }}
              aria-label="Close search"
            >
              ×
            </button>
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: 0,
                  marginBottom: "8px",
                  color: "#111",
                }}
              >
                Rechercher des produits
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  margin: 0,
                }}
              >
                Tapez pour rechercher des produits
              </p>
            </div>
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
