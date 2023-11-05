import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../hoc/Layout';
import { useAuthSlice } from '../../store/slices';

export const Example = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(state => state.auth);
  const { actions: authActions } = useAuthSlice();
  const handleSignIn = ({ username, password }) => {
    dispatch(authActions.signIn({ username, password }));
  };

  return (
    <Layout>
      <h1>Example</h1>
    </Layout>
  );
};
