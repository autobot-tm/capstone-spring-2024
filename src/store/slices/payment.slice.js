import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeOfPayment: '',
  methodOfPayment: '',
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

    setMethodOfPayment: (state, action) => {
      state.methodOfPayment = action.payload.methodOfPayment;
    },
  },
});

export default paymentSlice.reducer;
export const { setOrderSuccessfully, setLoading, setMethodOfPayment } = paymentSlice.actions;
