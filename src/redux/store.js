

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import paymentReducer from './slices/paymentSlice';
import contentReducer from './slices/contentSlice'; 
import reviewReducer from './slices/reviewSlice';
import wishlistReducer from './slices/wishlistSlice';
import notificationReducer from './slices/notificationSlice';
 // ✅ Add this

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    payment: paymentReducer,
    content: contentReducer, 
      reviews: reviewReducer, 
      wishlist: wishlistReducer,
      notifications: notificationReducer,
      // ✅ Add this
  },
});