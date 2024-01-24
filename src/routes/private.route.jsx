import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { routeNames } from '../config/route-name.config';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const accessToken = useSelector(state => state.auth.accessToken);
  const { pathname } = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={routeNames.SignIn} replace state={{ redirect: pathname }} />
  );
}
