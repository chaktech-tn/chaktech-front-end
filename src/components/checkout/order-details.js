'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ErrorMessage from "@components/error-message/error";
import useCartInfo from "@hooks/use-cart-info";
import useCurrency from "@hooks/use-currency";
import { trackCheckoutStep, trackFormError } from "@utils/posthog";
// internal

const OrderDetails = ({
  register,
  errors,
  handleShippingCost,
  cartTotal,
  shippingCost,
  discountAmount,
}) => {
  const { total } = useCartInfo();
  const { formatPrice } = useCurrency();
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const [hasTrackedShipping, setHasTrackedShipping] = useState(false);

  // Track shipping method selection
  const handleShippingSelection = (cost, optionName) => {
    handleShippingCost(cost);
    
    // Track shipping method selected step (only once)
    if (!hasTrackedShipping) {
      trackCheckoutStep('shipping_method_selected', 'standard_page', {
        shipping_option: optionName,
        shipping_cost: cost,
      });
      setHasTrackedShipping(true);
    }
  };

  // Track shipping error
  useEffect(() => {
    if (errors?.shippingOption?.message && !hasTrackedShipping) {
      trackFormError(
        errors.shippingOption.message,
        'shippingOption',
        'standard_page'
      );
    }
  }, [errors?.shippingOption, hasTrackedShipping]);

  return (
    <React.Fragment>
      <tr className="cart-subtotal">
        <th>{t('cartSubtotal')}</th>
        <td className="text-end">
          <span className="amount text-end">{formatPrice(total)}</span>
        </td>
      </tr>
      <tr className="shipping">
        <th>{tCommon('shipping')}</th>
        <td className="text-end">
          <ul>
            <li>
              <input
                {...register(`shippingOption`, {
                  required: t('shippingOptionRequired'),
                })}
                id="flat_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingSelection(60, 'delivery_today')}
                htmlFor="flat_shipping"
              >
                <span className="amount">{t('deliveryToday')} {formatPrice(60)}</span>
              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>

            <li>
              <input
                {...register(`shippingOption`, {
                  required: t('shippingOptionRequired'),
                })}
                id="free_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingSelection(20, 'delivery_7days')}
                htmlFor="free_shipping"
              >
                {t('delivery7Days')} {formatPrice(20)}
              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>
          </ul>
        </td>
      </tr>

      <tr className="shipping">
        <th>{tCommon('subtotal')}</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(total)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>{t('shippingCost')}</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(shippingCost)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>{tCommon('discount')}</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(discountAmount)}</span>
          </strong>
        </td>
      </tr>

      <tr className="order-total">
        <th>{t('totalOrder')}</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPrice(cartTotal)}</span>
          </strong>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default OrderDetails;
