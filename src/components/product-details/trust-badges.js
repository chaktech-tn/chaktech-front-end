'use client';
import React from "react";

const TrustBadges = () => {
  const badges = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free delivery on all orders',
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Easy returns within 30 days',
    },
    {
      icon: '🛡️',
      title: 'Official Warranty',
      description: 'Genuine products with warranty',
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Safe and secure checkout',
    },
  ];

  return (
    <div className="product__trust-badges mt-4">
      <div className="row g-3">
        {badges.map((badge, index) => (
          <div key={index} className="col-6 col-md-3">
            <div 
              className="trust-badge-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '24px', marginBottom: '8px' }}>
                {badge.icon}
              </span>
              <strong style={{ fontSize: '13px', color: '#111827', marginBottom: '4px' }}>
                {badge.title}
              </strong>
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {badge.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;

