"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { trackCheckoutStep } from "@utils/posthog";

// internal
import BillingDetails from "./billing-details";
import OrderArea from "./order-area";


const CheckoutArea = (props) => {
  const {
    handleSubmit,
    submitHandler,
    recoveryData,
    register,
    errors,
    setValue,
    watch,
    discountAmount,
    shippingCost,
    cartTotal,
    handleShippingCost,
    isCheckoutSubmit,
  } = props;

  const t = useTranslations("checkout");

  // Safety check: ensure register is a function
  if (!register || typeof register !== "function") {
    console.error("CheckoutArea: register is not a function", {
      register,
      type: typeof register,
      propsKeys: Object.keys(props),
      hasRegister: "register" in props,
      registerValue: props.register,
    });
    // Return early with error message
    return (
      <section className="checkout-area pb-85">
        <div className="container">
          <div className="alert alert-danger">
            <p>Form initialization error. Please refresh the page.</p>
            <p>
              Debug: register type = {typeof register}, register exists ={" "}
              {register ? "yes" : "no"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Track when user submits form (payment info filled)
  const handleFormSubmit = (data) => {
    // Track payment info filled step before submission
    trackCheckoutStep("payment_info_filled", "standard_page", {
      has_shipping: !!data.shippingOption,
      payment_method: "cod", // COD is the default payment method
    });
    submitHandler(data);
  };

  return (
    <section className="checkout-area pb-85">
      <div className="container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <div className="checkbox-form">
                <h3>{t("billingDetails")}</h3>
                {/* billing details start*/}
                <BillingDetails
                  register={register}
                  errors={errors}
                  recoveryData={recoveryData}
                  setValue={setValue}
                  watch={watch}
                />
                {/* billing details end*/}
              </div>
            </div>
            <div className="col-lg-6">
              {/* order area start */}
              <OrderArea
                register={register}
                errors={errors}
                discountAmount={discountAmount}
                shippingCost={shippingCost}
                cartTotal={cartTotal}
                handleShippingCost={handleShippingCost}
                isCheckoutSubmit={isCheckoutSubmit}
              />
              {/* order area end */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutArea;
