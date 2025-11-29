import useCurrency from "@hooks/use-currency";
import React from "react";

const OrderSingleCartItem = ({ title, quantity, price }) => {
  const { formatPrice } = useCurrency();
  
  return (
    <tr className="cart_item">
      <td className="product-name">
        {title} <strong className="product-quantity"> × {quantity}</strong>
      </td>
      <td className="product-total text-end">
        <span className="amount">{formatPrice(price, 2)}</span>
      </td>
    </tr>
  );
};

export default OrderSingleCartItem;
