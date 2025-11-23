"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import Menus from "./menus";
import logo from "@assets/img/categories/chaktech-logo.jpg";
import { Cart, Heart, Search, User } from "@svg/index";
import useSticky from "@hooks/use-sticky";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import useCartInfo from "@hooks/use-cart-info";
import LiveSearchForm from "@components/forms/live-search-form";
import { useLocale } from "next-intl";
import { useSiteSettings } from "@hooks/useSiteSettings";

const Header = ({ style_2 = false }) => {
  const locale = useLocale();
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
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
            <div className="container-fluid" style={{ overflowX: "hidden" }}>
              <div className="mega-menu-wrapper p-relative">
                <div className="row align-items-center" style={{ margin: 0 }}>
                  <div className="col-xxl-1 col-xl-2 col-lg-4 col-md-4 col-sm-5 col-8">
                    <div className="logo">
                      <Link href="/">
                        <Image
                          src={logoUrl}
                          alt={logoAlt}
                          width={112}
                          height={42}
                          priority
                          style={{ objectFit: "contain" }}
                          unoptimized
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-7 d-none d-xl-block">
                    <div className="main-menu main-menu-13 pl-45 main-menu-ff-space">
                      <nav id="mobile-menu-3">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xxl-5 col-xl-3 col-lg-8 col-md-8 col-sm-7 col-4">
                    <div
                      className="header__bottom-right-13 d-flex justify-content-end align-items-center pl-30"
                      style={{
                        flexWrap: "wrap",
                        gap: "8px",
                        visibility: "visible",
                        opacity: 1,
                      }}
                    >
                      <div
                        className="header__search-13 d-none d-lg-block"
                        style={{
                          flexShrink: 1,
                          minWidth: "200px",
                          maxWidth: "280px",
                          width: "100%",
                        }}
                      >
                        <LiveSearchForm />
                      </div>
                      <div
                        className="header__action-13 d-none d-md-block"
                        style={{ flexShrink: 0 }}
                      >
                        <ul
                          style={{
                            display: "flex",
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            gap: "8px",
                          }}
                        >
                          <li className="d-xxl-none">
                            <a href="#">
                              <Search />
                            </a>
                          </li>
                          {userInfo?.imageURL ? (
                            <li>
                              <Link href="/user-dashboard">
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
                              <Link href="/user-dashboard">
                                <h2 className="text-uppercase tp-user-login-avater">
                                  {userInfo.name[0]}
                                </h2>
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link href="/login">
                                <User />
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link href="/wishlist">
                              <Heart />
                              <span className="tp-item-count">
                                {wishlist.length}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <button
                              className="cartmini-open-btn"
                              onClick={() => setIsCartOpen(!isCartOpen)}
                              type="button"
                            >
                              <Cart />
                              <span className="tp-item-count">{quantity}</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* Language switcher removed - keeping FR as default language */}
                      <div className="header__hamburger ml-20 ml-lg-30 d-xl-none">
                        <button
                          onClick={() => setIsOffCanvasOpen(true)}
                          type="button"
                          className="hamburger-btn hamburger-btn-black offcanvas-open-btn"
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
    </>
  );
};

export default Header;
