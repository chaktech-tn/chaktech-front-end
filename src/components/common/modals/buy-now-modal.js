'use client';
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CitySelector from "@components/common/city-selector";
import ErrorMessage from "@components/error-message/error";
import { trackMetaPixelEvent } from "@components/tracking/FacebookPixel";
import useCartInfo from "@hooks/use-cart-info";
import useRealtimeSave from "@hooks/use-realtime-save";
import { Times } from "@svg/index";
import { trackOrderCompleted, trackCheckoutStep, trackFormError, trackBeginCheckout } from "@utils/posthog";
import { getOrCreateSessionToken } from "@utils/sessionToken";
import { notifyError, notifySuccess } from "@utils/toast";


// internal
import { generateEventId, getMetaCookies } from "@utils/trackingUtils";
import { setSessionToken } from "src/redux/features/abandonedCheckout/abandonedCheckoutSlice";
import { add_cart_product } from "src/redux/features/cartSlice";
import { useAddOrderMutation } from "src/redux/features/order/orderApi";

const BuyNowModal = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const { cart_products } = useSelector((state) => state.cart);
  const { saveCheckoutData } = useRealtimeSave();
  const [addOrder, { isLoading: isCheckoutSubmit }] = useAddOrderMutation();
  const { total } = useCartInfo();
  
  const [createAccount, setCreateAccount] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "Tunisia",
      city: ""
    }
  });

  // Watch form fields for real-time save
  const watchedFields = watch();

  // Initialize session token on mount
  useEffect(() => {
    const sessionToken = getOrCreateSessionToken();
    if (sessionToken) {
      dispatch(setSessionToken(sessionToken));
    }
  }, [dispatch]);

  // Real-time save on field changes
  useEffect(() => {
    if (show && Object.keys(watchedFields).length > 0) {
      const formData = {
        name: watchedFields.name || "",
        address: watchedFields.address || "",
        contact: watchedFields.phone || "",
        email: watchedFields.email || "",
      };
      saveCheckoutData(formData);
    }
  }, [watchedFields, show, saveCheckoutData]);

  // Add product to cart when modal opens and reset form
  useEffect(() => {
    if (show && product) {
      const isInCart = cart_products.some((p) => p._id === product._id);
      if (!isInCart) {
        dispatch(add_cart_product(product));
      }
      
      // Track begin checkout for popup flow
      const currentCart = isInCart ? cart_products : [...cart_products, product];
      const orderQuantity = product.orderQuantity || 1;
      const itemTotal = (product.originalPrice || product.price || 0) * orderQuantity;
      trackBeginCheckout(currentCart, itemTotal, 'popup'); // Buy Now popup flow
      
      // Reset form when modal opens
      reset({
        country: "Tunisia",
        city: ""
      });
      setCreateAccount(false);
      setConsentGiven(false);
    } else if (!show) {
      // Reset form when modal closes
      reset({
        country: "Tunisia",
        city: ""
      });
      setCreateAccount(false);
      setConsentGiven(false);
    }
  }, [show, product, cart_products, dispatch, reset]);

  const onSubmit = async (data) => {
    // Track form errors for popup flow
    if (!consentGiven) {
      const errorMsg = t('consentRequired') || 'You must accept the terms and conditions';
      trackFormError(errorMsg, 'consent', 'popup');
      notifyError(errorMsg);
      return;
    }

    // Validate city field
    if (!data.city || data.city.trim() === '') {
      const errorMsg = t('cityRequired') || 'City is required';
      trackFormError(errorMsg, 'city', 'popup');
      notifyError(errorMsg);
      return;
    }

    // Track contact info filled step
    if (data.name && data.phone) {
      trackCheckoutStep('contact_info_filled', 'popup', {
        has_email: !!data.email,
        has_address: !!data.address,
      });
    }

    // Ensure product is in cart
    const isInCart = cart_products.some((p) => p._id === product._id);
    if (!isInCart) {
      dispatch(add_cart_product(product));
    }

    // Calculate order totals
    const currentCart = isInCart ? cart_products : [...cart_products, product];
    const orderQuantity = product.orderQuantity || 1;
    const itemTotal = (product.originalPrice || product.price || 0) * orderQuantity;
    const shippingCost = 0; // Can be calculated based on address if needed
    const discount = 0;
    const totalAmount = itemTotal + shippingCost - discount;

    // Generate event ID for deduplication across Meta Pixel, CAPI, and PostHog
    const eventId = generateEventId();
    
    // Extract Meta Pixel cookies
    const { fbp, fbc } = getMetaCookies();

    // Prepare order data with tracking information
    const orderData = {
      name: data.name,
      firstName: data.name?.split(' ')[0] || data.name,
      lastName: data.name?.split(' ').slice(1).join(' ') || '',
      address: data.address,
      city: data.city?.trim() || "",
      country: "Tunisia",
      contact: data.phone,
      email: data.email || null,
      shippingOption: "standard",
      status: "pending",
      cart: currentCart,
      subTotal: itemTotal,
      shippingCost: shippingCost,
      discount: discount,
      totalAmount: totalAmount,
      user: null, // Guest order
      isGuestOrder: true,
      createAccount: createAccount,
      password: createAccount ? data.password : null,
      sessionToken: getOrCreateSessionToken(),
      paymentMethod: "cod",
      eventId, // Send event_id to backend for CAPI
      fbp,    // Send _fbp cookie to backend
      fbc,    // Send _fbc cookie to backend
    };

    // Create order
    try {
      const result = await addOrder(orderData).unwrap();
      if (result?.order?._id || result?.data?.order?._id) {
        const orderId = result?.order?._id || result?.data?.order?._id;

        // Prepare product contents for Meta Pixel
        const contents = currentCart.map(item => ({
          id: item._id,
          quantity: item.orderQuantity || 1,
        }));
        
        // Fire Meta Pixel Purchase event with event_id for deduplication
        try {
          trackMetaPixelEvent('Purchase', {
            eventID: eventId, // Critical for deduplication
            value: totalAmount,
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
          cart: currentCart,
          totalAmount: totalAmount,
          shippingCost: shippingCost,
          discount: discount,
          subTotal: itemTotal,
          paymentMethod: "cod",
          event_id: eventId, // Include for reference (PostHog doesn't deduplicate)
        }, 'popup'); // Buy Now popup flow

        onHide();
        router.push(`/order/${orderId}`);
        notifySuccess(t('orderConfirmed'));
      } else {
        notifyError(t('orderFailed'));
      }
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage = error?.data?.message || error?.message || t('orderFailedRetry');
      notifyError(errorMessage);
    }
  };

  if (!product) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="buy-now-modal"
      centered={true}
      size="lg"
    >
      <div className="buy-now-modal-wrapper">
        <div className="buy-now-modal-close">
          <button
            className="buy-now-modal-close-btn"
            type="button"
            onClick={onHide}
          >
            <Times />
          </button>
        </div>
        
        <div className="buy-now-modal-header">
          <h3>{t('quickCheckout')}</h3>
          <p>{t('quickCheckoutDescription')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="buy-now-modal-body">
            <div className="row">
              {/* Name */}
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label>
                    {t('fullName')} <span className="required">*</span>
                  </label>
                  <input
                    {...register("name", {
                      required: t('fullNameRequired'),
                    })}
                    type="text"
                    placeholder={t('fullNamePlaceholder')}
                  />
                  {errors.name && <ErrorMessage message={errors.name.message} />}
                </div>
              </div>

              {/* Address */}
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label>
                    {t('address')} <span className="required">*</span>
                  </label>
                  <input
                    {...register("address", {
                      required: t('addressRequired'),
                    })}
                    type="text"
                    placeholder={t('addressPlaceholder')}
                  />
                  {errors.address && <ErrorMessage message={errors.address.message} />}
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <div className="checkout-form-list">
                  <label>
                    {t('phoneNumber')} <span className="required">*</span>
                  </label>
                  <input
                    {...register("phone", {
                      required: t('phoneNumberRequired'),
                    })}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
                  />
                  {errors.phone && <ErrorMessage message={errors.phone.message} />}
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <div className="checkout-form-list">
                  <label>{t('emailAddress')}</label>
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('invalidEmail'),
                      },
                    })}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                  />
                  {errors.email && <ErrorMessage message={errors.email.message} />}
                </div>
              </div>

              {/* City */}
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label>
                    {t('townCity')} <span className="required">*</span>
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{
                      required: t('cityRequired'),
                      validate: (value) => {
                        if (!value || value.trim() === '') {
                          return t('cityRequired');
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <CitySelector
                        value={field.value || ""}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        onBlur={field.onBlur}
                        error={errors.city}
                        placeholder={t('cityPlaceholder')}
                        required
                      />
                    )}
                  />
                  {errors.city && <ErrorMessage message={errors.city.message || t('cityRequired')} />}
                </div>
              </div>

              {/* Country - Hidden, default to Tunisia */}
              <input
                type="hidden"
                {...register("country")}
                value="Tunisia"
              />

              {/* Account Creation Checkbox */}
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={createAccount}
                      onChange={(e) => setCreateAccount(e.target.checked)}
                      className="me-2"
                    />
                    <span>{t('createAccountLabel')}</span>
                  </label>
                </div>
              </div>

              {/* Password Field (conditional) */}
              {createAccount && (
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>
                      {t('password')} {!watch("password") && <span className="text-muted">({t('passwordWillBeGenerated')})</span>}
                    </label>
                    <input
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: t('passwordMinLength'),
                        },
                      })}
                      type="password"
                      placeholder={t('passwordPlaceholder')}
                    />
                    {errors.password && <ErrorMessage message={errors.password.message} />}
                  </div>
                </div>
              )}

              {/* Consent Checkbox */}
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label className="d-flex align-items-start">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="me-2 mt-1"
                      required
                    />
                    <span>
                      {t('consentText')} <span className="required">*</span>
                    </span>
                  </label>
                  {!consentGiven && (
                    <ErrorMessage message={t('consentRequired')} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="buy-now-modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onHide}
            >
              {tCommon('cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isCheckoutSubmit}
            >
              {isCheckoutSubmit ? t('processing') : t('placeOrder')}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BuyNowModal;

