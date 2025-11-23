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
    <div ref={wrapperRef} className="city-selector-wrapper" style={{ position: 'relative' }}>
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
        className={`input w-full ${error ? 'border-red-500' : ''}`}
        required={required}
        autoComplete="off"
        style={{
          width: '100%',
          padding: '10px 15px',
          border: error ? '1px solid #ef4444' : '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      
      {showDropdown && searchTerm.length > 0 && (
        <div 
          className="city-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginTop: '4px'
          }}
        >
          {filteredCities.length > 0 && filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={(e) => handleCitySelect(city, e)}
              onMouseDown={(e) => e.preventDefault()}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                borderBottom: index < filteredCities.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              {city}
            </div>
          ))}
          {filteredCities.length === 0 && searchTerm.length > 0 && (
            <div style={{ padding: '10px 15px', color: '#666', fontSize: '14px' }}>
              No matching city found
            </div>
          )}
          <div
            onClick={(e) => handleAddCustom(e)}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
              borderTop: filteredCities.length > 0 ? '1px solid #ddd' : 'none',
              fontWeight: '500',
              color: '#22c55e'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f9f9f9'}
          >
            + Add "{searchTerm}" as custom city
          </div>
        </div>
      )}

      {isCustomCity && searchTerm && (
        <div style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
          ✓ Custom city: {searchTerm}
        </div>
      )}
    </div>
  );
};

export default CitySelector;

