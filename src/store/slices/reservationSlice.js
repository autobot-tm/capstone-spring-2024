import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  status: 'ALL',
  page: 1,
  menuItem: 'contract',
  loading: false,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
    setMenuItem: (state, action) => {
      state.menuItem = action.payload.menuItem;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export default reservationSlice.reducer;
export const { setStatus, setName, setPage, setMenuItem, setLoading } = reservationSlice.actions;
