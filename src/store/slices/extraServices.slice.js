import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  status: 'ALL',
  page: 1,
  extraServices: {},
  extraServicesRequests: [],
  typeNavigate: '',
};

const extraServicesSlice = createSlice({
  name: 'extraServices',
  initialState,
  reducers: {
    setExtraService: (state, action) => {
      state.extraServices = action.payload.extraServices;
    },
    setExtraServicesLoading(state, action) {
      state.loading = action.payload.loading;
    },
    setExtraServicesStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setExtraServicesPage: (state, action) => {
      state.page = action.payload.page;
    },
    setExtraServicesRequest(state, action) {
      state.extraServicesRequests = action.payload.extraServicesRequests;
    },
    setTypeNavigate: (state, action) => {
      state.typeNavigate = action.payload.typeNavigate;
    },
  },
});

export const {
  setExtraService,
  setExtraServicesRequest,
  setExtraServicesLoading,
  setExtraServicesStatus,
  setExtraServicesPage,
  setTypeNavigate,
} = extraServicesSlice.actions;

export default extraServicesSlice.reducer;
