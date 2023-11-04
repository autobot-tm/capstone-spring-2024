import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const PrivateRoute = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace={true} state={{ redirect: pathname }} />
  );
};
