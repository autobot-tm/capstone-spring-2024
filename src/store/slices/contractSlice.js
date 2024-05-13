import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'ALL',
  page: 1,
  loading: false,
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setContractStatus: (state, action) => {
      state.status = action.payload.status;
    },

    setContractPage: (state, action) => {
      state.page = action.payload.page;
    },

    setContractLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export default contractSlice.reducer;
export const { setContractStatus, setContractPage, setContractLoading } = contractSlice.actions;
