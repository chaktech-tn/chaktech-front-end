import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

import useCurrency from "@hooks/use-currency";
import {
  normalizeStorefrontImageUrl,
  shouldUseUnoptimizedImage,
} from "@utils/storefront-image";
// internal
import { add_cart_product, quantityDecrement, remove_product, set_quantity } from "src/redux/features/cartSlice";

const SingleCartItem = ({item}) => {
  const {_id, slug, image,title,originalPrice,orderQuantity=0} = item || {};
  const productUrl = slug ? `/product/${slug}` : `/product-details/${_id}`;
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  const normalizedImage = normalizeStorefrontImageUrl(
    image,
    typeof window !== "undefined" ? window.location.hostname : undefined
  );
  const unoptimized = shouldUseUnoptimizedImage(normalizedImage);

  const handleAddProduct = (prd) => dispatch(add_cart_product(prd));
  const handleDecrement = (prd) => dispatch(quantityDecrement(prd));
  const handleRemovePrd = (prd) => dispatch(remove_product(prd));

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      dispatch(set_quantity({ _id, quantity: '' }));
      return;
    }
    const quantity = parseInt(val, 10);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(set_quantity({ _id, quantity }));
    }
  }

  const handleBlur = () => {
    if (orderQuantity === '') {
      dispatch(set_quantity({ _id, quantity: 1 }));
    }
  }

  return (
    <div className="stitch-cart-item">
      {/* Product Info */}
      <div className="stitch-cart-item-info">
        <div className="stitch-cart-item-image">
          <Link href={productUrl}>
            <Image src={normalizedImage} alt={`${title} | ChakTech Tunisie`} width={96} height={96} style={{objectFit: 'contain', mixBlendMode: 'multiply'}} unoptimized={unoptimized} />
          </Link>
        </div>
        <div className="stitch-cart-item-details">
          <Link href={productUrl} className="stitch-cart-item-title">{title}</Link>
          <div className="stitch-cart-item-price-mobile">
            {formatPrice(originalPrice, 0)}
          </div>
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="stitch-cart-item-quantity-wrapper">
        <span className="stitch-cart-item-quantity-label">Quantité:</span>
        <div className="stitch-cart-stepper">
          <button onClick={()=> handleDecrement(item)} className="stitch-cart-stepper-btn">
            <i className="fa-light fa-minus"></i>
          </button>
          <input 
            type="number" 
            value={orderQuantity} 
            onChange={handleChange} 
            onBlur={handleBlur} 
            className="stitch-cart-stepper-input" 
          />
          <button onClick={()=> handleAddProduct(item)} className="stitch-cart-stepper-btn">
            <i className="fa-light fa-plus"></i>
          </button>
        </div>
      </div>

      {/* Price (Desktop) */}
      <div className="stitch-cart-item-price-desktop">
        <span>{formatPrice(originalPrice * (orderQuantity || 1), 0)}</span>
      </div>

      {/* Remove Action */}
      <div className="stitch-cart-item-remove-wrapper">
        <button onClick={()=> handleRemovePrd(item)} className="stitch-cart-item-remove-btn">
          <i className="fa-light fa-trash"></i>
          <span className="stitch-cart-item-remove-text">Supprimer</span>
        </button>
      </div>
    </div>
  );
};

export default SingleCartItem;
