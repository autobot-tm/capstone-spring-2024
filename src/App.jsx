import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, routePaths } from './routes';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import RequestResetPassword from './components/RequestResetPassword/RequestResetPassword';
import AuthenticationCode from './components/AuthenticationCode/AuthenticationCode';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
      <SignIn />
      <Register />
      <RequestResetPassword />
      <AuthenticationCode />
      <ResetPassword />
    </>
  );
}

export default App;
