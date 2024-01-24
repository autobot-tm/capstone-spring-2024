import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, routePaths } from './routes';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from './store/slices';

function App() {
  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();
  useEffect(() => {
    dispatch(authActions.initState());
  }, []);
  return (
    <Routes>
      {routePaths.public.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route element={<PrivateRoute />}>
        {routePaths.private.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
