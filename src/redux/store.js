import {configureStore} from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';
import abandonedCheckoutReducer from './features/abandonedCheckout/abandonedCheckoutSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cartSlice';
import couponReducer from './features/coupon/couponSlice';
import orderReducer from './features/order/orderSlice';
import productReducer from './features/productSlice';
import wishlistReducer from './features/wishlist-slice';
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
    auth:authReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    coupon:couponReducer,
    order:orderReducer,
    product:productReducer,
    abandonedCheckout:abandonedCheckoutReducer,
  },
  middleware:(getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
})
