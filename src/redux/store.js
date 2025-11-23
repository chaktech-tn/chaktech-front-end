import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './features/auth/authSlice';
import cartSlice from './features/cartSlice';
import couponSlice from './features/coupon/couponSlice';
import orderSlice from './features/order/orderSlice';
import wishlistSlice from './features/wishlist-slice';
import productSlice from './features/productSlice';
import abandonedCheckoutSlice from './features/abandonedCheckout/abandonedCheckoutSlice';
// Import all API endpoints to ensure they're registered
import './features/auth/authApi';
import './features/productApi';
import './features/categoryApi';
import './features/coupon/couponApi';
import './features/order/orderApi';
import './features/orderApi';
import './features/settingsApi';
import './features/abandonedCheckout/abandonedCheckoutApi';


export const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSlice,
    cart:cartSlice,
    wishlist:wishlistSlice,
    coupon:couponSlice,
    order:orderSlice,
    product:productSlice,
    abandonedCheckout:abandonedCheckoutSlice,
  },
  middleware:(getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
})

