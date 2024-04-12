import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  notifications: [],
  limit: 10,
  unreadCount: 0,
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
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload.limit;
    },
  },
});

export const { setLoading, setNotifications, setUnreadCount, setLimit } = notificationSlice.actions;

export default notificationSlice.reducer;
