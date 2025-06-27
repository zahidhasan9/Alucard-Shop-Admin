import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/userSlice.js';
import addressReducer from '@/features/addressSlice.js';
import productSlice from '@/features/productSlice.js';
import categorySlice from '@/features/categorySlice.js';
import SearchSlice from '@/features/SearchSlice.js';
import reviewSlice from '@/features/reviewSlice.js';
import CartSlice from '@/features/cartSlice.js';
import OrderSlice from '@/features/OrderSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer, // key name should match your state access (e.g., state.address)
    product: productSlice,
    search: SearchSlice,
    category: categorySlice,
    review: reviewSlice,
    cart: CartSlice,
    order: OrderSlice
  }
});

export default store;
