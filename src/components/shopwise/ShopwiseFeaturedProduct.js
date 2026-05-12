"use client";
import React from "react";
import Link from "next/link";
import { useTimer } from "react-timer-hook";

const TimerDisplay = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => console.warn("Offer expired") 
  });

  const timeItems = [
    { label: "Day", value: days },
    { label: "Hours", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds }
  ];

  return (
    <div className="d-flex gap-3">
      {timeItems.map((item, i) => (
        <div key={i} className="text-center">
          <div 
            className="rounded-3 bg-white shadow-sm d-flex align-items-center justify-content-center fw-bold text-dark border"
            style={{ width: "65px", height: "65px", fontSize: "1.3rem" }}
          >
            {item.value.toString().padStart(2, "0")}
          </div>
          <span className="small text-muted mt-2 d-block fw-bold" style={{ fontSize: "0.75rem" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const ShopwiseFeaturedProduct = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 604800); // 1 week

  return (
    <section className="shopwise-featured py-5 mb-5" style={{ backgroundColor: "#f2f7ff" }}>
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="content">
              <span className="text-primary fw-bold mb-3 d-block letter-spacing-1" style={{ color: "#007bff" }}>EXCLUSIVE OFFER!</span>
              <h2 className="display-4 fw-black mb-4" style={{ color: "#333" }}>Enhance Your Music Experience</h2>
              <p className="text-muted mb-5 pe-lg-5" style={{ fontSize: "1.1rem" }}>Premium noise cancelling headphones with 40 hours of battery life and studio quality sound. Don't miss out on this limited time offer!</p>
              
              <div className="mb-5">
                <TimerDisplay expiryTimestamp={time} />
              </div>

              <Link href="/shop" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm" style={{ backgroundColor: "#ff324d", border: "none" }}>
                Shop Now
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-wrapper position-relative text-center">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" 
                alt="Headphones" 
                className="img-fluid floating-animation"
                style={{ maxHeight: "450px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fw-black { font-weight: 800; }
        .letter-spacing-1 { letter-spacing: 2px; }
        .floating-animation {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default ShopwiseFeaturedProduct;
