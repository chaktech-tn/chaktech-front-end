import useCurrency from "@hooks/use-currency";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { remove_product } from "src/redux/features/cartSlice";

const SingleCartItem = ({ item }) => {
  const { _id, slug, image, originalPrice, title, orderQuantity, discount } =
    item || {};
  const productUrl = slug ? `/product/${slug}` : `/product-details/${_id}`;
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();

  // handle remove cart
  const handleRemoveProduct = (prd) => {
    dispatch(remove_product(prd));
  };
  return (
    <div className="cartmini__widget-item">
      {image && (
        <div className="cartmini__thumb">
          <Link href={productUrl}>
            <Image src={image} alt={`${title} | ChakTech Tunisie`} width={70} height={90} />
          </Link>
        </div>
      )}
      <div className="cartmini__content">
        <h5>
          <Link href={productUrl}>{title}</Link>
        </h5>
        <div className="cartmini__price-wrapper">
          {!discount && (
            <span className="cartmini__price">{formatPrice(originalPrice * orderQuantity, 0)}</span>
          )}
          {discount > 0 && (
            <span className="cartmini__price">
              {formatPrice((originalPrice - (originalPrice * discount) / 100) * orderQuantity, 0)}
            </span>
          )}
          <span className="cartmini__quantity">x{orderQuantity}</span>
        </div>
      </div>
      <button
        className="cartmini__del"
        onClick={() => handleRemoveProduct(item)}
      >
        <i className="fal fa-times"></i>
      </button>
    </div>
  );
};

export default SingleCartItem;
