"use client";
import React from "react";

const ShopwiseNewsletter = () => {
  return (
    <section className="shopwise-newsletter py-5">
      <div className="container">
        <div className="newsletter-box rounded-4 p-5 position-relative overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)" }}>
          <div className="row align-items-center position-relative z-1">
            <div className="col-lg-6 mb-4 mb-lg-0 text-white text-center text-lg-start">
              <h3 className="fw-bold mb-2" style={{ fontSize: "1.75rem" }}>Don't Miss Out Latest Trends & Offers</h3>
              <p className="mb-0 opacity-75">Subscribe to our newsletter and get updates on new arrivals!</p>
            </div>
            <div className="col-lg-6">
              <form className="bg-white p-2 rounded-pill shadow-sm d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control border-0 bg-transparent px-4" 
                  placeholder="Enter your email" 
                  required 
                  style={{ boxShadow: "none" }}
                />
                <button type="submit" className="btn btn-primary rounded-pill px-4 fw-bold" style={{ backgroundColor: "#202325", border: "none" }}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-25">
            <div className="rounded-circle bg-white position-absolute" style={{ width: "300px", height: "300px", top: "-150px", left: "-150px", opacity: 0.1 }}></div>
            <div className="rounded-circle bg-white position-absolute" style={{ width: "200px", height: "200px", bottom: "-100px", right: "50px", opacity: 0.1 }}></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fw-black { font-weight: 900; }
        .pointer-events-none { pointer-events: none; }
      `}</style>
    </section>
  );
};

export default ShopwiseNewsletter;
