import React from "react";
import { useSelector } from "react-redux";
import { useTranslations } from 'next-intl';
// internal
import OrderDetails from "./order-details";
import OrderSingleCartItem from "./order-single-cart-item";

const OrderArea = ({
  register,
  errors,
  discountAmount,
  shippingCost,
  cartTotal,
  handleShippingCost,
  isCheckoutSubmit,
}) => {
  const { cart_products } = useSelector((state) => state.cart);
  const t = useTranslations('checkout');
  
  return (
    <div className="your-order mb-30 ">
      <h3>{t('yourOrder') || 'Your order'}</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products?.map((item, i) => (
              <OrderSingleCartItem
                key={i}
                title={item.title}
                quantity={item.quantity}
                price={item.originalPrice}
              />
            ))}
          </tbody>
          <tfoot>
            <OrderDetails
              register={register}
              errors={errors}
              discountAmount={discountAmount}
              cartTotal={cartTotal}
              shippingCost={shippingCost}
              handleShippingCost={handleShippingCost}
            />
          </tfoot>
        </table>
      </div>

      <div className="payment-method faq__wrapper tp-accordion">
        <div className="accordion" id="checkoutAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#bankOne"
                aria-expanded="true"
                aria-controls="bankOne"
              >
                {t('cod')}
                <span className="accordion-btn"></span>
              </button>
            </h2>
            <div
              id="bankOne"
              className="accordion-collapse collapse show"
              aria-labelledby="checkoutOne"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="accordion-body">
                <div className="my-2">
                  <p className="mb-3">
                    {t('codDescription')}
                  </p>
                  <div className="order-button-payment mt-25">
                    <button
                      type="submit"
                      className="tp-btn"
                      disabled={cart_products.length === 0 || isCheckoutSubmit}
                    >
                      {t('placeOrder')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderArea;
