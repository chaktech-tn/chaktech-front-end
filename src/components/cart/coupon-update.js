'use client';
import React, { useState } from "react";
import { notifyError } from "@utils/toast";

const CouponUpdateCart = () => {
  const [code, setCode] = useState("");

  const handleApplyCoupon = () => {
    if (!code) {
      notifyError("Please enter a coupon code");
      return;
    }
    // TODO: Connect coupon API integration in Phase 2
    notifyError("Invalid coupon code");
  };

  return (
    <div className="coupon-all">
      <div className="coupon">
        <input
          id="coupon_code"
          className="input-text"
          name="coupon_code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          type="text"
        />
        <button
          onClick={handleApplyCoupon}
          className="tp-btn tp-btn-black"
          name="apply_coupon"
          type="button"
        >
          Apply coupon
        </button>
      </div>
      <div className="coupon2">
        <button
          className="tp-btn tp-btn-black"
          name="update_cart"
          type="button"
        >
          Update cart
        </button>
      </div>
    </div>
  );
};

export default CouponUpdateCart;
