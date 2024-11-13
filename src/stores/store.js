import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // This will handle the cart logic

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
