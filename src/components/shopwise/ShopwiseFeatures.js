"use client";
import React from "react";

const ShopwiseFeatures = () => {
  const features = [
    {
      id: 1,
      icon: "fa-light fa-truck-fast",
      title: "Free Shipping",
      desc: "For all orders over $99"
    },
    {
      id: 2,
      icon: "fa-light fa-rotate-left",
      title: "14 Day Returns",
      desc: "Money back guarantee"
    },
    {
      id: 3,
      icon: "fa-light fa-headset",
      title: "24/7 Online Support",
      desc: "Dedicated support team"
    },
    {
      id: 4,
      icon: "fa-light fa-credit-card",
      title: "Safe Payment",
      desc: "100% secure payment"
    }
  ];

  return (
    <section className="shopwise-features py-4 bg-white border-bottom border-top">
      <div className="container">
        <div className="row g-4">
          {features.map((feature) => (
            <div key={feature.id} className="col-lg-3 col-sm-6">
              <div className="feature-item d-flex align-items-center gap-3 p-3">
                <div 
                  className="feature-icon d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: "50px", 
                    height: "50px", 
                    backgroundColor: "rgba(var(--primary-color-rgb, 232, 67, 10), 0.1)",
                    color: "var(--primary-color, #e8430a)",
                    fontSize: "1.25rem"
                  }}
                >
                  <i className={feature.icon}></i>
                </div>
                <div className="feature-content">
                  <h6 className="mb-0 fw-bold">{feature.title}</h6>
                  <p className="mb-0 text-muted small">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .feature-item {
          transition: transform 0.3s ease;
        }
        .feature-item:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
};

export default ShopwiseFeatures;
