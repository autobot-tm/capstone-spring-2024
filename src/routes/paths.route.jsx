import React from 'react';
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { News } from '../pages/News';
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
    {
      path: routeNames.News,
      element: <News />,
    },
  ],
  private: [
    // TODO: add private routes here
  ],
};
