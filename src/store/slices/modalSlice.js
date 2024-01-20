import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModal: false,
  registerModal: false,
  requestResetPasswordModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: state => {
      state.loginModal = true;
    },
    openRegisterModal: state => {
      state.registerModal = true;
    },
    openRequestResetPasswordModal: state => {
      state.requestResetPasswordModal = true;
    },

    closeLoginModal: state => {
      state.loginModal = false;
    },
    closeRegisterModal: state => {
      state.registerModal = false;
    },
    closeRequestResetPasswordModal: state => {
      state.requestResetPasswordModal = false;
    },
  },
});

export default modalSlice.reducer;
export const {
  openLoginModal,
  openRegisterModal,
  openRequestResetPasswordModal,
  closeLoginModal,
  closeRegisterModal,
  closeRequestResetPasswordModal,
} = modalSlice.actions;
