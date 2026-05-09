'use client';
import React from "react";

// Single coupon placeholder card (skeleton loader)
const CouponPlaceholder = () => {
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
      <div className="col-xl-6">
        <div className="product__coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
          <span className="product__coupon-border"></span>
          
          {/* Left side: Logo and content */}
          <div className="product__coupon-item-left d-sm-flex align-items-center">
            {/* Logo placeholder */}
            <div className="product__coupon-thumb">
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
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
            </div>
            
            {/* Content placeholder */}
            <div className="product__coupon-content">
              {/* Title placeholder */}
              <div
                className="placeholder-pulse"
                style={{
                  height: '24px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  width: '70%',
                  marginBottom: '15px',
                }}
              />
              
              {/* Discount percentage placeholder */}
              <div
                className="placeholder-pulse"
                style={{
                  height: '28px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  width: '50%',
                  marginBottom: '15px',
                  animationDelay: '0.2s'
                }}
              />
              
              {/* Timer placeholder */}
              <div
                className="placeholder-pulse"
                style={{
                  height: '40px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  width: '80%',
                  animationDelay: '0.4s'
                }}
              />
            </div>
          </div>
          
          {/* Right side: Status and coupon code */}
          <div className="product__coupon-item-right pl-20">
            {/* Status placeholder */}
            <div className="product__coupon-status mb-10 d-flex align-items-center">
              <div
                className="placeholder-pulse"
                style={{
                  height: '20px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  width: '100px',
                  marginBottom: '10px',
                }}
              />
            </div>
            
            {/* Coupon code button placeholder */}
            <div className="product__coupon-date">
              <div
                className="placeholder-pulse"
                style={{
                  height: '50px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  width: '150px',
                  animationDelay: '0.3s'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Coupon placeholder grid
const CouponPlaceholderGrid = ({ count = 2 }) => {
  return (
    <div className="row">
      {Array.from({ length: count }).map((_, index) => (
        <CouponPlaceholder key={index} />
      ))}
    </div>
  );
};

export default CouponPlaceholderGrid;
export { CouponPlaceholder };

