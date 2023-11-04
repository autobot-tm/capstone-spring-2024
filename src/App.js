import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, routePaths } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routePaths.public.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route element={<PrivateRoute />}>
          {routePaths.private.map(route => {
            return <Route key={route.path} path={route.path} element={route.element} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
