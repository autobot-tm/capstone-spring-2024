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
    markNotificationAsRead(state, action) {
      const { notificationId } = action.payload;
      state.notifications = state.notifications.map(notification => {
        if (notification.id === notificationId) {
          return {
            ...notification,
            current_user_has_read: true,
          };
        }
        return notification;
      });
    },
  },
});

export const { setLoading, setNotifications, setUnreadCount, setLimit, markNotificationAsRead } =
  notificationSlice.actions;

export default notificationSlice.reducer;
