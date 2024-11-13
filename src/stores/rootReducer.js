import { combineReducers } from 'redux';
import cartReducer from './slices/cartSlice'; // Import your cart reducer

const rootReducer = combineReducers({
  cart: cartReducer, // Adding cart slice to the root reducer
  // Add other reducers here if you have any (e.g., user, products)
});

export default rootReducer;
