import useCurrency from "@hooks/use-currency";
import React from "react";

const OldNewPrice = ({originalPrice,discount}) => {
  const { formatPrice } = useCurrency();
  
  const discountedPrice = Number(originalPrice) - (Number(originalPrice) * Number(discount)) / 100;
  
  return (
    <div className="product__price">
      <del className="product__ammount old-price">
        {formatPrice(originalPrice, 2)}
      </del>
      <span className="product__ammount new-price">
        {" "}
        {formatPrice(discountedPrice, 2)}
      </span>
    </div>
  );
};

export default OldNewPrice;
