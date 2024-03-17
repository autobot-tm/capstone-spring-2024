import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import modalReducer from './slices/modalSlice';
import houseReducer from './slices/houseSlice';
import wishlistSlice from './slices/wishlist.slice';
import { userReducer } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    house: houseReducer,
    user: userReducer,
    wishlist: wishlistSlice,
  },
});
