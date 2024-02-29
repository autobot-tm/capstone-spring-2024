import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { routeNames } from '../config/route-name.config';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const { access_token } = useSelector(state => state.auth);
  const { pathname } = useLocation();

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to={routeNames.SignIn} replace state={{ redirect: pathname }} />
  );
}
