import { createSlice } from "@reduxjs/toolkit";

import { getLocalStorage, setLocalStorage } from "@utils/localstorage";
import { notifyError, notifySuccess } from "@utils/toast";

const isClient = typeof window !== 'undefined';

const initialState = {
  cart_products: isClient ? getLocalStorage("cart_products") || [] : [],
  orderQuantity: 1,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart_product: (state, { payload }) => {
      const isExist = state.cart_products.some((i) => i._id === payload._id);
      if (!isExist) {
        const newItem = {
          ...payload,
          orderQuantity: 1,
        };
        state.cart_products.push(newItem);
        notifySuccess(`${payload.title} added to cart`);
      } else {
        state.cart_products.map((item) => {
          if (item._id === payload._id) {
            if (item.quantity >= item.orderQuantity + state.orderQuantity) {
              item.orderQuantity =
                state.orderQuantity !== 1
                  ? state.orderQuantity + item.orderQuantity
                  : item.orderQuantity + 1;
              notifySuccess(`${state.orderQuantity} ${item.title} added to cart`);
            } else {
              notifyError("No more quantity available for this product!");
              state.orderQuantity = 1;
            }
          }
          return { ...item };
        });
      }
      if (isClient) setLocalStorage("cart_products", state.cart_products);
    },
    increment: (state) => {
      state.orderQuantity = state.orderQuantity + 1;
    },
    decrement: (state) => {
      state.orderQuantity =
        state.orderQuantity > 1
          ? state.orderQuantity - 1
          : (state.orderQuantity = 1);
    },
    quantityDecrement: (state, { payload }) => {
      state.cart_products.map((item) => {
        if (item._id === payload._id) {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
          }
        }
        return { ...item };
      });
      if (isClient) setLocalStorage("cart_products", state.cart_products);
    },
    remove_product: (state, { payload }) => {
      state.cart_products = state.cart_products.filter(
        (item) => item._id !== payload._id
      );
      if (isClient) setLocalStorage("cart_products", state.cart_products);
    },
    set_quantity: (state, { payload }) => {
      const { _id, quantity } = payload;
      state.cart_products.map((item) => {
        if (item._id === _id) {
          item.orderQuantity = quantity;
        }
        return { ...item };
      });
      if (isClient) setLocalStorage("cart_products", state.cart_products);
    },
    get_cart_products: (state) => {
      if (isClient) state.cart_products = getLocalStorage("cart_products") || [];
    },
    initialOrderQuantity: (state) => {
      state.orderQuantity = 1;
    },
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  set_quantity,
  initialOrderQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
