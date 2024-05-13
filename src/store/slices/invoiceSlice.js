import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  status: 'ALL',
  page: 1,
  loading: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setType: (state, action) => {
      state.name = action.payload.name;
    },
    setInvoicePage: (state, action) => {
      state.page = action.payload.page;
    },

    setInvoiceLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export default invoiceSlice.reducer;
export const { setInvoiceStatus, setType, setInvoicePage, setInvoiceLoading } = invoiceSlice.actions;
