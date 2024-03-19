import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModal: false,
  registerModal: false,
  requestResetPasswordModal: false,
  authenticationCodeModal: false,
  resetPasswordModal: false,
  advanceSearchModal: false,
  confirmLogoutModal: false,
  reservationDetailModal: false,
  contractDetailModal: false,
  requestCancelContractModal: false,
  reservationId: undefined,
  contractId: undefined,
  reservationPolicyModal: false,
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
    openConfirmLogoutModal: state => {
      state.confirmLogoutModal = true;
    },
    openReservationDetailModal: (state, action) => {
      state.reservationDetailModal = true;
      state.reservationId = action.payload.reservationId;
    },
    openContractDetailModal: (state, action) => {
      state.contractDetailModal = true;
      state.contractId = action.payload.contractId;
    },
    openRequestCancelContractModal: state => {
      state.requestCancelContractModal = true;
    },
    openReservationPolicyModal: state => {
      state.reservationPolicyModal = true;
    },

    closeReservationPolicyModal: state => {
      state.reservationPolicyModal = false;
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
    closeConfirmLogoutModal: state => {
      state.confirmLogoutModal = false;
    },
    closeReservationDetailModal: state => {
      state.reservationDetailModal = false;
    },
    closeContractDetailModal: state => {
      state.contractDetailModal = false;
    },
    closeRequestCancelContractModal: state => {
      state.requestCancelContractModal = false;
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
  openConfirmLogoutModal,
  openReservationDetailModal,
  openContractDetailModal,
  openRequestCancelContractModal,
  closeLoginModal,
  closeRegisterModal,
  closeRequestResetPasswordModal,
  closeAuthenticationCodeModal,
  closeResetPasswordModal,
  closeAdvanceSearchModal,
  closeConfirmLogoutModal,
  closeReservationDetailModal,
  closeContractDetailModal,
  closeRequestCancelContractModal,
  openReservationPolicyModal,
  closeReservationPolicyModal,
} = modalSlice.actions;
