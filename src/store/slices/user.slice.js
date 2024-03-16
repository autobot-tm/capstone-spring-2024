import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  avatar_url: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  country: '',
  repeat_password: null,
  new_password: null,
  current_password: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return { ...state, ...action.payload };
    },
    resetPasswordUseAfterUpdate(state) {
      state.current_password = null;
      state.new_password = null;
      state.repeat_password = null;
      console.log('run cuss');
    },
  },
});

export const { updateUser, resetPasswordUseAfterUpdate } = userSlice.actions;

export default userSlice.reducer;
