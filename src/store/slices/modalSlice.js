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
  extraServiceRequestDetailModal: false,
  reportIssuesModal: false,
  chooseMethodPaymentModal: false,
  serviceDetailModal: false,
  categoryIssue: undefined,
  extraServiceRequestDetail: '',
  reservationId: undefined,
  contractId: '',
  invoiceId: undefined,
  issueId: undefined,
  showAllImageModal: false,
  showLeaseModal: false,
  contactRequestDetailModal: false,
  leases: [],
  extraServiceId: undefined,
  extraServiceRequestId: undefined,
  typeOfRequest: null,
  email: '',
  images: [],
  actionType: null,
  contactCategory: '',
  reviewHouseModal: false,
  houseID: undefined,
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
      state.actionType = action.payload.actionType;
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
      state.leases = action?.payload?.leases;
      state.contractId = action?.payload?.contractId;
    },
    openExtraServiceRequestDetailModal: (state, action) => {
      state.extraServiceRequestDetailModal = true;
      state.extraServiceRequestDetail = action?.payload?.extraServiceRequestDetail;
      state.actionType = action.payload.actionType;
    },
    openReportIssuesModal: (state, action) => {
      state.reportIssuesModal = true;
      state.categoryIssue = action.payload.categoryIssue;
    },
    openChooseMethodPaymentModal: state => {
      state.chooseMethodPaymentModal = true;
    },
    openServiceDetailModal: (state, action) => {
      state.serviceDetailModal = true;
      state.leases = action?.payload?.leases;
    },
    //Review
    //Do Review need action
    openReviewHouseModal: (state, action) => {
      state.reviewHouseModal = true;
      state.houseID = action?.payload?.houseID;
    },

    closeReviewHouseModal: state => {
      state.reviewHouseModal = false;
    },
    //End Review
    closeServiceDetailModal: state => {
      state.serviceDetailModal = false;
    },
    closeChooseMethodPaymentModal: state => {
      state.chooseMethodPaymentModal = false;
    },
    closeReportIssuesModal: state => {
      state.reportIssuesModal = false;
    },
    openContactRequestDetailModal: (state, action) => {
      state.contactRequestDetailModal = true;
      state.contactCategory = action.payload.category;
      state.issueId = action.payload.issueId;
      state.actionType = action?.payload?.actionType;
    },
    closeExtraServiceRequestDetailModal: state => {
      state.extraServiceRequestDetailModal = false;
      state.actionType = null;
    },
    openInvoiceDetailModal: (state, action) => {
      state.invoiceId = action.payload.invoiceId;
      state.actionType = action?.payload?.actionType;
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
      state.typeOfRequest = null;
    },
    closeShowAllImageModal: state => {
      state.showAllImageModal = false;
    },
    closeInvoiceDetailModal: state => {
      state.invoiceDetailModal = false;
      state.actionType = null;
    },
    closeContactRequestDetailModal: state => {
      state.contactRequestDetailModal = false;
      state.actionType = null;
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
  openExtraServiceRequestDetailModal,
  openChooseMethodPaymentModal,
  openReportIssuesModal,
  openServiceDetailModal,
  closeServiceDetailModal,
  closeReportIssuesModal,
  closeChooseMethodPaymentModal,
  openContactRequestDetailModal,
  closeExtraServiceRequestDetailModal,
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
  closeContactRequestDetailModal,
  openReviewHouseModal,
  closeReviewHouseModal,
} = modalSlice.actions;
