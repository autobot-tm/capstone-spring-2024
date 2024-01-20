import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});
