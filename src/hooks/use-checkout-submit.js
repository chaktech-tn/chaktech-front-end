"use client";
import * as dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@components/loader/loader";
import { trackMetaPixelEvent } from "@components/tracking/FacebookPixel";
import { trackOrderCompleted, trackFormError } from "@utils/posthog";
import { getOrCreateSessionToken } from "@utils/sessionToken";
import { notifyError, notifySuccess } from "@utils/toast";
import { generateEventId, getMetaCookies } from "@utils/trackingUtils";

//internal import
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";
import { set_coupon } from "src/redux/features/coupon/couponSlice";
import {
  useAddOrderMutation,
} from "src/redux/features/order/orderApi";
import { set_shipping } from "src/redux/features/order/orderSlice";

import useCartInfo from "./use-cart-info";


const useCheckoutSubmit = () => {
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  const [addOrder, {}] = useAddOrderMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [setCouponInfo] = useState({});
  const [cartTotal, setCartTotal] = useState("");
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [cardError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, [setCouponInfo]);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.originalPrice * currentValue.orderQuantity,
      0
    );
    let totalValue = "";
    const subTotal = Number((total + shippingCost).toFixed(2));
    const discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    discountAmount,
    cartTotal,
  ]);

  // Payment intent creation removed - COD only

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <Loader loading={isLoading} />;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    // setTotal(total + value);
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("country", shipping_info.country);
    setValue("zipCode", shipping_info.zipCode);
    setValue("email", shipping_info.email);
    setValue("contact", shipping_info.contact);
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    // Determine if this is a guest order
    const isGuestOrder = !user || !user._id;
    const sessionToken = getOrCreateSessionToken();
    
    // Get account creation preference (from form data or default false)
    const createAccount = data.createAccount === true || data.createAccount === "true";

    const orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      user: user?._id ? `${user._id}` : null,
      isGuestOrder: isGuestOrder,
      createAccount: createAccount,
      password: createAccount ? (data.password || null) : null,
      sessionToken: sessionToken,
    };

    // COD only - Stripe removed
    try {
        // Generate event ID for deduplication across Meta Pixel, CAPI, and PostHog
        const eventId = generateEventId();
        
        // Extract Meta Pixel cookies
        const { fbp, fbc } = getMetaCookies();
        
        // Prepare order data with tracking information
        const orderData = {
          ...orderInfo,
          paymentMethod: "cod",
          eventId, // Send event_id to backend for CAPI
          fbp,    // Send _fbp cookie to backend
          fbc,    // Send _fbc cookie to backend
        };
        
        const result = await addOrder(orderData).unwrap();

        if (result?.order?._id || result?.data?.order?._id) {
          const orderId = result?.order?._id || result?.data?.order?._id;
          
          // Prepare product contents for Meta Pixel
          const contents = cart_products.map(item => ({
            id: item._id,
            quantity: item.orderQuantity || 1,
          }));
          
          // Fire Meta Pixel Purchase event with event_id for deduplication
          try {
            trackMetaPixelEvent('Purchase', {
              eventID: eventId, // Critical for deduplication
              value: cartTotal,
              currency: 'TND',
              contents: contents,
            });
          } catch (pixelError) {
            console.error('Meta Pixel: Error tracking Purchase event', pixelError);
            // Don't block order success if pixel fails
          }
          
          // Track order completion in PostHog with revenue and event_id
          trackOrderCompleted({
            _id: orderId,
            cart: cart_products,
            totalAmount: cartTotal,
            shippingCost: shippingCost,
            discount: discountAmount,
            subTotal: total,
            paymentMethod: "cod",
            event_id: eventId, // Include for reference (PostHog doesn't deduplicate)
          }, 'standard_page'); // Standard checkout page flow

          router.push(`/order/${orderId}`);
          notifySuccess("Your Order Confirmed!");
        } else {
          notifyError("Failed to create order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        const errorMessage = error?.data?.message || error?.message || "Failed to create order. Please try again.";
        trackFormError(errorMessage, 'order_submission', 'standard_page', {
          payment_method: 'cod',
          error_type: 'order_creation_failed',
        });
        notifyError("Failed to create order. Please try again.");
      } finally {
        setIsCheckoutSubmit(false);
      }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    handleSubmit,
    cartTotal,
  };
};

export default useCheckoutSubmit;
