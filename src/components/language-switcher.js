"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, defaultLocale } from "../../i18n";
import { useState, useRef, useEffect } from "react";

const localeFlags = {
  fr: "🇫🇷",
  ar: "🇹🇳",
  en: "🇬🇧",
};

const localeCodes = {
  fr: "FR",
  ar: "AR",
  en: "EN",
};

export default function LanguageSwitcher({ style_2 = false }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    // Get current URL without any locale prefix
    const currentUrl = new URL(window.location.href);
    let path = currentUrl.pathname;

    // Remove any locale prefix from path
    locales.forEach((loc) => {
      if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
        path = path.replace(`/${loc}`, "") || "/";
      }
    });

    // Ensure path starts with /
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    // Set the locale cookie
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

    // Reload to the current path (without locale prefix)
    // The middleware and request config will read the cookie and serve the correct locale
    window.location.href = path + currentUrl.search;
  };

  return (
    <div
      className="language-switcher"
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="language-switcher-btn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "8px 12px",
          background: style_2 ? "transparent" : "rgba(0, 0, 0, 0.05)",
          border: style_2
            ? "1px solid rgba(0, 0, 0, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "6px",
          color: style_2 ? "#000" : "#000",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
          minWidth: "70px",
          whiteSpace: "nowrap",
          lineHeight: "1",
        }}
      >
        <span style={{ fontSize: "16px", lineHeight: "1" }}>
          {localeFlags[locale]}
        </span>
        <span style={{ lineHeight: "1" }}>{localeCodes[locale]}</span>
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "4px", flexShrink: 0 }}
        >
          <path
            d="M1 1L4 4L7 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "8px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "120px",
            zIndex: 1000,
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={(e) => switchLocale(loc, e)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background:
                  locale === loc ? "rgba(0, 0, 0, 0.05)" : "transparent",
                border: "none",
                color: locale === loc ? "#000" : "#666",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: locale === loc ? "600" : "400",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (locale !== loc) {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)";
                  e.currentTarget.style.color = "#000";
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== loc) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#666";
                }
              }}
            >
              <span style={{ fontSize: "18px" }}>{localeFlags[loc]}</span>
              <span>{localeCodes[loc]}</span>
              {locale === loc && (
                <span style={{ marginLeft: "auto", fontSize: "12px" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
