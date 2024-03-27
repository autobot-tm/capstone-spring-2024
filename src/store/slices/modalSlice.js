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
  reservationPolicyModal: false,
  notificationDetailModal: false,
  invoiceDetailModal: false,
  reservationId: undefined,
  contractId: undefined,
  invoiceId: undefined,
  showAllImageModal: false,
  showLeaseModal: false,
  extraServiceId: undefined,
  typeOfRequest: null,
  email: '',
  images: [],
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
      state.cancelation_request_id = action.payload.cancelation_request_id;
    },
    openRequestCancelContractModal: (state, action) => {
      state.requestCancelContractModal = true;
      state.typeOfRequest = action?.payload?.typeOfRequest;
      state.contractId = action?.payload?.contractId;
    },
    openReservationPolicyModal: state => {
      state.reservationPolicyModal = true;
    },
    openShowAllImageModal: (state, action) => {
      state.showAllImageModal = true;
      state.images = action.payload.images;
    },
    openShowLeaseModal: (state, action) => {
      state.showLeaseModal = true;
      state.extraServiceId = action?.payload?.extraServiceId;
    },
    openInvoiceDetailModal: (state, action) => {
      state.invoiceId = action.payload.invoiceId;
      state.invoiceDetailModal = true;
    },
    closeShowLeaseModal: state => {
      state.showLeaseModal = false;
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
    closeShowAllImageModal: state => {
      state.showAllImageModal = false;
    },
    closeInvoiceDetailModal: state => {
      state.invoiceDetailModal = false;
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
  openShowAllImageModal,
  openShowLeaseModal,
  openInvoiceDetailModal,
  closeShowLeaseModal,
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
  closeShowAllImageModal,
  closeInvoiceDetailModal,
} = modalSlice.actions;
