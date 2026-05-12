"use client";
import React from "react";
import Link from "next/link";

const ShopwisePromos = () => {
  return (
    <section className="shopwise-promos py-5">
      <div className="container">
        {/* Top Banner */}
        <div className="promo-banner rounded-4 p-5 mb-4 position-relative overflow-hidden shadow-sm d-flex align-items-center" style={{ backgroundColor: "#f4f9fc", minHeight: "350px" }}>
          <div className="content position-relative z-1 w-50">
            <span className="text-primary fw-bold mb-2 d-block">Apple iPhone 14 Pro</span>
            <h2 className="display-5 fw-bold mb-3">UP TO 30% OFF</h2>
            <p className="text-muted mb-4">Experience the power of the new iPhone 14 Pro with stunning features and performance.</p>
            <Link href="/shop" className="btn btn-primary rounded-pill px-4 fw-bold" style={{ backgroundColor: "#007bff", border: "none" }}>Shop Now</Link>
          </div>
          <div className="image-wrapper position-absolute end-0 bottom-0 p-4">
            <img 
              src="https://chaktech.tn/wp-content/uploads/2025/07/2.webp" 
              alt="iPhone" 
              className="img-fluid" 
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="promo-banner rounded-4 p-4 shadow-sm d-flex align-items-center justify-content-between border-0" style={{ backgroundColor: "#e2f9f2", minHeight: "220px" }}>
              <div className="content">
                <span className="text-muted small fw-bold mb-1 d-block">Added New Treds</span>
                <h4 className="fw-bold mb-3">Workout At Home</h4>
                <Link href="/shop" className="text-primary text-decoration-none fw-bold" style={{ color: "#00b2a9 !important" }}>Shop Now</Link>
              </div>
              <img 
                src="https://chaktech.tn/wp-content/uploads/2025/06/Ventilateur-LEXICAL-20-Box-Fan-–-Noir-300x300.png" 
                alt="Promo 1" 
                className="img-fluid" 
                style={{ maxHeight: "150px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="promo-banner rounded-4 p-4 shadow-sm d-flex align-items-center justify-content-between border-0" style={{ backgroundColor: "#fff0e5", minHeight: "220px" }}>
              <div className="content">
                <span className="text-muted small fw-bold mb-1 d-block">Get Limit Offer</span>
                <h4 className="fw-bold mb-3">Up to 40% off</h4>
                <Link href="/shop" className="text-primary text-decoration-none fw-bold" style={{ color: "#ff7d1a !important" }}>Shop Now</Link>
              </div>
              <img 
                src="https://chaktech.tn/wp-content/uploads/2025/05/store_01J9X614YMCZZCQRSW14VWAHDQ_assets_1728900606397-1-300x300.webp" 
                alt="Promo 2" 
                className="img-fluid" 
                style={{ maxHeight: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .promo-banner {
          transition: transform 0.3s ease;
        }
        .promo-banner:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default ShopwisePromos;
