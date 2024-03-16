import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, routePaths } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthSlice } from './store/slices';
import { isTimeExpired } from './utils/time';
import { REQUEST_TIME_OUT } from './constants/api.constant';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'; // Import ScrollToTop
import { getMetaData } from './services/apis/houses.service';
import { setMetaData } from './store/slices/houseSlice';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { mutate } from 'swr';
import { getUserByIdService } from './services/apis/users.service';
import { updateUser } from './store/slices/user.slice';

function App() {
  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);
  const { access_token, access_token_expires_at } = useSelector(state => state.auth);
  const userString = localStorage.getItem('USER');
  const user_id = JSON.parse(userString)?.sub;

  useEffect(() => {
    if (!access_token) {
      dispatch(authActions.initState());
    }
  }, [access_token, dispatch]);

  useEffect(() => {
    const isAccessTokenExpired = isTimeExpired(access_token_expires_at, REQUEST_TIME_OUT);
    if (access_token && !isTokenRefreshed && isAccessTokenExpired) {
      setIsTokenRefreshed(true);
      dispatch(authActions.refreshToken());
    } else if (!isAccessTokenExpired) {
      setIsTokenRefreshed(false);
    }
  }, [access_token, access_token_expires_at, dispatch, isTokenRefreshed, authActions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByIdService({ user_id });
        dispatch(updateUser(user));
        mutate(['getUserByIdService', user_id], user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (user_id) {
      fetchData();
    }
  }, [user_id, dispatch]);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await getMetaData();
        dispatch(setMetaData({ metadata: response }));
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetaData();
  }, [dispatch]);

  const [loading, setLoading] = useState(true);

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
