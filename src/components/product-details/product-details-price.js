import useCurrency from "@hooks/use-currency";
import React from "react";

const ProductDetailsPrice = ({ price, discount }) => {
  const { formatPrice } = useCurrency();
  
  const discountedPrice = Number(price) - (Number(price) * Number(discount)) / 100;
  
  return (
    <div className="product__details-price">
      {discount > 0 ? (
        <>
          <span className="product__details-ammount old-ammount">{formatPrice(price, 2)}</span>
          <span className="product__details-ammount new-ammount">
            {formatPrice(discountedPrice, 2)}
          </span>
          <span className="product__details-offer">-{discount}%</span>
        </>
      ) : (
        <>
          <span className="product__details-ammount new-ammount">{formatPrice(price, 2)}</span>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPrice;
