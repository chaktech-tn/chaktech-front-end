'use client';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { Search } from "@svg/index";
// internal

const ShopModel = ({ all_products }) => {
  const all_brands = [...new Set(all_products.map((prd) => prd.brand?.name))];
  const [brands, setBrands] = useState(all_brands);
  const [isChecked, setIsChecked] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get("brand");

  // handle brand
  const handleBrand = (value) => {
    if (isChecked === value) {
      setIsChecked("");
      router.push(`/shop`);
    } else {
      setIsChecked(value);
      router.push(
        `/shop?brand=${value
          .toLowerCase()
          .replace("&", "")
          .split(" ")
          .join("-")}`
      );
    }
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      const searchBrands = all_brands.filter((b) =>
        b.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setBrands(searchBrands);
    } else {
      setBrands(all_brands);
    }
  };

  // handle search value
  const handleSearchValue = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <div className="accordion" id="shop_model">
      <div className="accordion-item">
        <h2 className="accordion-header" id="model__widget">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#model_widget_collapse"
            aria-expanded="true"
            aria-controls="model_widget_collapse"
          >
            Marques
          </button>
        </h2>
        <div
          id="model_widget_collapse"
          className="accordion-collapse collapse show"
          aria-labelledby="model__widget"
          data-bs-parent="#shop_model"
        >
          <div className="accordion-body">
            <div className="shop__widget-search pt-10 pb-25">
              <form onSubmit={handleSubmit}>
                <div className="shop__widget-search-input">
                  <input
                    onChange={handleSearchValue}
                    type="text"
                    placeholder="Search brands"
                  />
                  <button type="submit">
                    <Search />
                  </button>
                </div>
              </form>
            </div>
            <div
              className="shop__widget-list"
              style={{
                height: brands.length > 2 && "120px",
                overflowY: "auto",
              }}
            >
              {brands.map((brand, i) => {
                const isActive = activeBrand === brand.toLowerCase().replace("&", "").split(" ").join("-");
                return (
                  <label key={i} className="ck-custom-checkbox" onClick={() => handleBrand(brand)} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    marginBottom: "12px"
                  }}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      readOnly
                      style={{ display: "none" }}
                    />
                    <div style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      border: isActive ? "1px solid #ff8a00" : "1px solid #d1d5db",
                      background: isActive ? "#ff8a00" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s"
                    }}>
                      {isActive && (
                        <div style={{
                          width: "4px",
                          height: "8px",
                          border: "solid white",
                          borderWidth: "0 2px 2px 0",
                          transform: "rotate(45deg)",
                          marginTop: "-2px"
                        }}></div>
                      )}
                    </div>
                    <span style={{
                      fontSize: "14px",
                      color: isActive ? "#111827" : "#4b5563",
                      fontWeight: isActive ? "500" : "400",
                      transition: "color 0.2s"
                    }}>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModel;
