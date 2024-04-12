import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from '../../store/slices/auth.slice';
const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();
  const onSuccess = userInfo => {
    const { credential } = userInfo;
    if (!credential) return;
    dispatch(authActions.signInWithGoogle({ idToken: credential }));
  };
  return <GoogleLogin onSuccess={onSuccess} type="icon" shape="circle" useOneTap />;
};

export default GoogleSignInButton;
