import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import modalReducer from './slices/modalSlice';
import houseReducer from './slices/houseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    house: houseReducer,
  },
});
