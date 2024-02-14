import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModal: false,
  registerModal: false,
  requestResetPasswordModal: false,
  authenticationCodeModal: false,
  resetPasswordModal: false,
  advanceSearchModal: false,
  email: '',
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
    openAuthenticationCodeModal: (state, action) => {
      state.authenticationCodeModal = true;
      state.email = action.payload.email;
    },
    openResetPasswordModal: (state, action) => {
      state.resetPasswordModal = true;
      state.email = action.payload.email;
    },
    openAdvanceSearchModal: state => {
      state.advanceSearchModal = true;
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
    closeAuthenticationCodeModal: state => {
      state.authenticationCodeModal = false;
    },
    closeResetPasswordModal: state => {
      state.resetPasswordModal = false;
    },
    closeAdvanceSearchModal: state => {
      state.advanceSearchModal = false;
    },
  },
});

export default modalSlice.reducer;
export const {
  openLoginModal,
  openRegisterModal,
  openRequestResetPasswordModal,
  openAuthenticationCodeModal,
  openResetPasswordModal,
  openAdvanceSearchModal,
  closeLoginModal,
  closeRegisterModal,
  closeRequestResetPasswordModal,
  closeAuthenticationCodeModal,
  closeResetPasswordModal,
  closeAdvanceSearchModal,
} = modalSlice.actions;
