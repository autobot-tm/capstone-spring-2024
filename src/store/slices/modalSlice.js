import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModal: false,
  registerModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: state => {
      state.loginModal = true;
    },
    openRegisterModal: state => {
      state.registerModal = true;
    },
    closeLoginModal: state => {
      state.loginModal = false;
    },
    closeRegisterModal: state => {
      state.registerModal = false;
    },
  },
});

export default modalSlice.reducer;
export const { openLoginModal, openRegisterModal, closeLoginModal, closeRegisterModal } =
  modalSlice.actions;
