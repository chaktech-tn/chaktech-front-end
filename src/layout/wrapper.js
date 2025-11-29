'use client';
import ProductModal from "@components/common/modals/product-modal";
import BackToTopCom from "@components/common/scroll-to-top";
import {ToastContainer} from '@utils/toast';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal
import { get_cart_products } from "src/redux/features/cartSlice";
import { get_coupons } from "src/redux/features/coupon/couponSlice";
import { get_shipping } from "src/redux/features/order/orderSlice";
import { get_wishlist_products } from "src/redux/features/wishlist-slice";

const Wrapper = ({ children }) => {
  const { product,isShow } = useSelector(state => state.product)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_wishlist_products());
    dispatch(get_cart_products());
    dispatch(get_coupons());
    dispatch(get_shipping());
  }, [dispatch]);
  return (
    <>
      {/* Removed loading bar - using placeholders instead for better UX */}
      {children}

      <BackToTopCom />
      <ToastContainer/>
      {isShow && <ProductModal product={product} />}
    </>
  );
};

export default Wrapper;
