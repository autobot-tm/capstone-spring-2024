import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

export const { setLoading, setNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
