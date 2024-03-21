import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  notifications: [],
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
      state.unreadCount = action.payload.filter(item => !item.current_user_has_read).length;
    },
    markAsRead(state, action) {
      const notificationId = action.payload;
      const notification = state.notifications.find(item => item.id === notificationId);
      if (notification && !notification.current_user_has_read) {
        notification.current_user_has_read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead(state) {
      // state.notifications.forEach(notification => {
      //   notification.current_user_has_read = true;
      // });
      state.unreadCount = 0;
    },

    setUnreadCount(state) {
      state.unreadCount -= 1;
    },

    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(item => item.id !== action.payload);
      state.unreadCount -= 1;
    },
  },
});

export const {
  setLoading,
  setNotifications,
  clearNotifications,
  removeNotification,
  markAsRead,
  markAllAsRead,
  setUnreadCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
