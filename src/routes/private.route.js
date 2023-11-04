import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { routeNames } from '../config/route-name.config';
export const PrivateRoute = () => {
  const { accessToken } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={routeNames.SignIn} replace={true} state={{ redirect: pathname }} />
  );
};
