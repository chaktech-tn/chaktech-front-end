'use client';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import React from "react";

import logo from "@assets/img/categories/chaktech-logo.webp";
import shape from "@assets/img/shape/offcanvas-shape-1.png";
import LiveSearchForm from "@components/forms/live-search-form";
import SocialLinks from "@components/social";
import contactInfo from "@config/contact";
// internal

import MobileMenus from "./mobile-menus";

// import LanguageSwitcher from "@components/language-switcher"; // Removed - keeping FR as default language

const OffCanvas = ({ isOffCanvasOpen, setIsOffCanvasOpen }) => {
  const t = useTranslations('offcanvas');
  
  return (
    <React.Fragment>
      <div
        className={`offcanvas__area offcanvas__area-1 ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__shape">
            <Image className="offcanvas__shape-1" src={shape} alt="shape" />
          </div>
          <div className="offcanvas__close">
            <button
              onClick={() => setIsOffCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image src={logo} alt="ChakTech Logo" width={112} height={42} />
                </Link>
              </div>
            </div>
            {/* Mobile Search in Off-Canvas */}
            <div style={{ marginBottom: "30px", padding: "0 10px" }}>
              <div style={{ marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: 0,
                    marginBottom: "8px",
                    color: "#111",
                  }}
                >
                  {t('search') || "Rechercher"}
                </h3>
              </div>
              <div style={{ position: "relative", zIndex: 10 }}>
                <LiveSearchForm isMobile={true} />
              </div>
            </div>
            <div className="mobile-menu-3 fix mb-40 menu-counter mean-container d-lg-none">
              <div className="mean-bar">
                {/* MobileMenus start*/}
                <MobileMenus />
                {/* MobileMenus end*/}
              </div>
            </div>
            {/* Language switcher removed - keeping FR as default language */}
            <div className="offcanvas__social" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 className="offcanvas__social-title" style={{ marginBottom: "12px" }}>{t('followUs')}</h3>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                <SocialLinks />
              </div>
            </div>
            <div className="offcanvas__contact">
              <p className="offcanvas__contact-call">
                <a href={`tel:${contactInfo.phone.tel}`}>{contactInfo.phone.formatted}</a>
              </p>
              <p className="offcanvas__contact-mail">
                <a href={`mailto:${contactInfo.email.primary}`}>{contactInfo.email.primary}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* overlay */}
      <div
        onClick={() => setIsOffCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* overlay */}
    </React.Fragment>
  );
};

export default OffCanvas;
