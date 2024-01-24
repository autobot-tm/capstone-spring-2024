import React from 'react';
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { routeNames } from '../config';

export const routePaths = {
  public: [
    {
      path: routeNames.Home,
      element: <Home />,
    },
    {
      path: routeNames.About,
      element: <AboutUs />,
    },
  ],
  private: [],
};
