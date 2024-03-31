import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import modalReducer from './slices/modalSlice';
import houseReducer from './slices/houseSlice';
import wishlistSlice from './slices/wishlist.slice';
import reservationReducer from './slices/reservationSlice';
import contractReducer from './slices/contractSlice';
import { userReducer } from './slices/user.slice';
import notificationSlice from './slices/notification.slice';
import invoiceReducer from './slices/invoiceSlice';
import extraServicesSlice from './slices/extraServices.slice';
import paymentSlice from './slices/payment.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    house: houseReducer,
    user: userReducer,
    wishlist: wishlistSlice,
    reservation: reservationReducer,
    contract: contractReducer,
    notification: notificationSlice,
    invoice: invoiceReducer,
    extraServices: extraServicesSlice,
    payment: paymentSlice,
  },
});
