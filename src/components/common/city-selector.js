'use client';
import React, { useState, useRef, useEffect } from 'react';

import { allCities } from '@data/tunisian-cities';

const CitySelector = ({ value, onChange, onBlur, error, placeholder, required }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSearchTerm(value);
      // Check if the value is a custom city (not in the list)
      setIsCustomCity(!allCities.includes(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsCustomCity(false);

    if (term.length > 0) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 10); // Limit to 10 results
      setFilteredCities(filtered);
      // Show dropdown if there are results OR if user typed something (for custom city option)
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }

    onChange(term);
  };

  const handleCitySelect = (city, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSearchTerm(city);
    setShowDropdown(false);
    setIsCustomCity(false);
    onChange(city);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      const filtered = allCities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setFilteredCities(filtered);
      setShowDropdown(true);
    }
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsCustomCity(true);
    setShowDropdown(false);
    // Keep the current search term as custom city
    onChange(searchTerm);
  };

  return (
    <div ref={wrapperRef} className="city-selector-wrapper">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={(e) => {
          // Small delay to allow dropdown click to register
          setTimeout(() => {
            setShowDropdown(false);
            if (onBlur) onBlur(e);
          }, 200);
        }}
        placeholder={placeholder || "Search or enter city name"}
        className={`city-selector-input ${error ? 'has-error' : ''}`}
        required={required}
        autoComplete="off"
      />

      {showDropdown && searchTerm.length > 0 && (
        <div className="city-dropdown">
          {filteredCities.length > 0 && filteredCities.map((city, index) => (
            <button
              key={index}
              type="button"
              className="city-dropdown__item"
              onClick={(e) => handleCitySelect(city, e)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {city}
            </button>
          ))}
          {filteredCities.length === 0 && searchTerm.length > 0 && (
            <div className="city-dropdown__empty">
              No matching city found
            </div>
          )}
          <button
            type="button"
            className="city-dropdown__custom"
            onClick={(e) => handleAddCustom(e)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {`+ Add "${searchTerm}" as custom city`}
          </button>
        </div>
      )}

      {isCustomCity && searchTerm && (
        <div className="city-selector-custom-pill">
          <span className="city-selector-custom-pill__check">✓</span>
          <span>{`Custom city: ${searchTerm}`}</span>
        </div>
      )}
    </div>
  );
};

export default CitySelector;

