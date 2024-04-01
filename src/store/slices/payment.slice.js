import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeOfPayment: '',
  loading: false,
  dataOrderSuccessfully: {},
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrderSuccessfully: (state, action) => {
      state.typeOfPayment = action.payload.typeOfPayment;
      state.dataOrderSuccessfully = action.payload.dataOrderSuccessfully;
    },

    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export default paymentSlice.reducer;
export const { setOrderSuccessfully, setLoading } = paymentSlice.actions;
