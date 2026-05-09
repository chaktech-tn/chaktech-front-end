'use client';
import React from "react";

// Single product placeholder card (skeleton loader)
const ProductPlaceholder = () => {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .placeholder-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .placeholder-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="product__item p-relative transition-3 mb-50">
        {/* Product Image Placeholder */}
        <div className="product__thumb w-img p-relative fix" style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Shimmer effect */}
            <div
              className="placeholder-shimmer"
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />
          </div>

        {/* Action buttons placeholder */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 10
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="placeholder-pulse"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Add to cart button placeholder */}
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            right: '15px',
            display: 'flex',
            gap: '10px',
            zIndex: 10
          }}
        >
          <div
            className="placeholder-pulse"
            style={{
              flex: 1,
              height: '45px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
            }}
          />
          <div
            className="placeholder-pulse"
            style={{
              flex: 1,
              height: '45px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              animationDelay: '0.2s'
            }}
          />
        </div>
      </div>

      {/* Product Content Placeholder */}
      <div className="product__content" style={{ marginTop: '15px' }}>
        {/* Title placeholder */}
        <div
          className="placeholder-pulse"
          style={{
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            marginBottom: '10px',
            width: '80%',
          }}
        />
        <div
          className="placeholder-pulse"
          style={{
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            marginBottom: '15px',
            width: '60%',
            animationDelay: '0.2s'
          }}
        />

        {/* Price placeholder */}
        <div
          className="placeholder-pulse"
          style={{
            height: '24px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            width: '40%',
            animationDelay: '0.4s'
          }}
        />
      </div>
    </div>
    </>
  );
};

// Product placeholder grid (like Facebook posts)
const ProductPlaceholderGrid = ({ count = 8 }) => {
  return (
    <div className="container">
      <div className="row">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <ProductPlaceholder />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPlaceholderGrid;
export { ProductPlaceholder };

