import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PrivateRoute, routePaths } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, useAuthSlice } from './store/slices';
import { isTimeExpired } from './utils/time';
import { REQUEST_TIME_OUT } from './constants/api.constant';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'; // Import ScrollToTop
import { getMetaData } from './services/apis/houses.service';
import { setMetaData } from './store/slices/houseSlice';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { useUserSlice } from './store/slices/user.slice';
import { ERROR_TRANS_KEYS } from './constants/error.constant';

function App() {
  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();
  const { actions: userActions } = useUserSlice();
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);
  const { access_token, access_token_expires_at } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const { errorTranslationKey } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!access_token) {
      dispatch(authActions.initState());
    }
    if (access_token) {
      dispatch(userActions.getUserProfile());
    }
  }, [access_token]);

  useEffect(() => {
    const isAccessTokenExpired = isTimeExpired(access_token_expires_at, REQUEST_TIME_OUT);

    if (access_token && !isTokenRefreshed && isAccessTokenExpired) {
      setIsTokenRefreshed(true);
      dispatch(authActions.refreshToken());
    }
  }, [access_token]);

  useEffect(() => {
    if (errorTranslationKey === ERROR_TRANS_KEYS.ACCOUNT_SUSPENDED) {
      navigate('/');
      dispatch(signOut());
    }
  }, [errorTranslationKey]);

  useEffect(() => {
    getMetaData()
      .then(response => {
        dispatch(setMetaData({ metadata: response }));
      })
      .then(setLoading(false));
  }, []);

  return (
    !loading && (
      <>
        <ScrollToTop />
        <Routes>
          {routePaths.public.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route element={<PrivateRoute />}>
            {routePaths.private.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </>
    )
  );
}

export default App;
