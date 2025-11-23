"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Search from "@svg/search";
import { useLazySearchProductsQuery } from "src/redux/features/productApi";

const LiveSearchForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("hero");
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchProducts, { data: searchData, isLoading: isSearching }] =
    useLazySearchProductsQuery();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceTimer = useRef(null);
  const [imageErrors, setImageErrors] = useState({});

  // Debounced search function
  const debouncedSearch = useCallback(
    (query) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        if (query && query.trim().length > 0) {
          searchProducts({ q: query, limit: 8 });
          setShowResults(true);
        } else {
          setShowResults(false);
        }
      }, 300); // 300ms debounce delay
    },
    [searchProducts]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim().length > 0) {
      debouncedSearch(value);
    } else {
      setShowResults(false);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const encodedQuery = encodeURIComponent(searchText.trim());
      router.push(`/search?query=${encodedQuery}`);
      setSearchText("");
      setShowResults(false);
    }
  };

  // Handle product click
  const handleProductClick = () => {
    setShowResults(false);
    setSearchText("");
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Add CSS for animations and scrollbar
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes liveSearchSpin {
        to { transform: rotate(360deg); }
      }
      .live-search-dropdown::-webkit-scrollbar {
        width: 6px;
      }
      .live-search-dropdown::-webkit-scrollbar-track {
        background: #f9fafb;
        border-radius: 12px;
      }
      .live-search-dropdown::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 12px;
      }
      .live-search-dropdown::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const products = searchData?.products || [];

  return (
    <div style={{ position: "relative", width: "100%" }} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div
          className="header__search-input-13 d-none d-xxl-block"
          style={{ position: "relative" }}
        >
          <input
            onChange={handleInputChange}
            value={searchText}
            type="text"
            placeholder={t("searchPlaceholder")}
            onFocus={() => {
              if (searchText.trim().length > 0 && products.length > 0) {
                setShowResults(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              } else if (e.key === "Escape") {
                setShowResults(false);
              }
            }}
            autoComplete="off"
          />
          <button type="submit" onClick={handleSubmit}>
            <Search />
          </button>
        </div>
      </form>

      {/* Live Search Results Dropdown */}
      {showResults && searchText.trim().length > 0 && (
        <div
          ref={resultsRef}
          className="live-search-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
            zIndex: 1000,
            maxHeight: "500px",
            overflowY: "auto",
            marginTop: "8px",
            overflowX: "hidden",
          }}
        >
          {isSearching ? (
            <div
              style={{
                padding: "32px 20px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #e5e7eb",
                  borderTopColor: "#3b82f6",
                  borderRadius: "50%",
                  animation: "liveSearchSpin 0.6s linear infinite",
                }}
              ></div>
              {t("searching") || "Searching..."}
            </div>
          ) : products.length > 0 ? (
            <>
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                  fontWeight: "600",
                  fontSize: "13px",
                  color: "#374151",
                  letterSpacing: "0.025em",
                  textTransform: "uppercase",
                }}
              >
                {products.length}{" "}
                {products.length === 1
                  ? t("result") || "result"
                  : t("results") || "results"}
              </div>
              <div style={{ padding: "8px 0" }}>
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug || product._id}`}
                    onClick={handleProductClick}
                    className="live-search-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "14px 18px",
                      textDecoration: "none",
                      color: "#111827",
                      transition: "all 0.2s ease",
                      backgroundColor: "#fff",
                      borderBottom:
                        index < products.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        marginRight: "14px",
                        flexShrink: 0,
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={
                          imageErrors[product._id]
                            ? "/assets/img/placeholder/product-placeholder.svg"
                            : product.image ||
                              "/assets/img/placeholder/product-placeholder.svg"
                        }
                        alt={product.title}
                        width={64}
                        height={64}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={() => {
                          if (!imageErrors[product._id]) {
                            setImageErrors((prev) => ({
                              ...prev,
                              [product._id]: true,
                            }));
                          }
                        }}
                        onLoad={(e) => {
                          if (e.target.naturalWidth === 0) {
                            setImageErrors((prev) => ({
                              ...prev,
                              [product._id]: true,
                            }));
                          }
                        }}
                        unoptimized={
                          imageErrors[product._id] ||
                          product.image?.includes("i.ibb.co")
                        }
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          marginBottom: "6px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#111827",
                          lineHeight: "1.4",
                        }}
                      >
                        {product.title}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          marginBottom: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {product.brand?.name && (
                          <span
                            style={{
                              padding: "2px 8px",
                              backgroundColor: "#f3f4f6",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#4b5563",
                            }}
                          >
                            {product.brand.name}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#dc2626",
                            display: "flex",
                            alignItems: "baseline",
                            gap: "4px",
                          }}
                        >
                          <span>{product.originalPrice.toFixed(2)}</span>
                          <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            TND
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        marginLeft: "12px",
                        color: "#9ca3af",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </div>
                  </Link>
                ))}
              </div>
              {products.length >= 8 && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderTop: "1px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3b82f6",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                      e.currentTarget.style.color = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#3b82f6";
                    }}
                  >
                    {t("viewAllResults") || "View all results"} →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              <div
                style={{ fontSize: "48px", marginBottom: "12px", opacity: 0.3 }}
              >
                🔍
              </div>
              <div
                style={{
                  fontWeight: "500",
                  marginBottom: "4px",
                  color: "#374151",
                }}
              >
                {t("noResults") || "No products found"}
              </div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                Try a different search term
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveSearchForm;
