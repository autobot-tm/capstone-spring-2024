import React from 'react';
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { routeNames } from '../config';
import { Payment } from '../pages/Payment/Payment';
import DetailHouse from '../pages/DetailHouse/DetailHouse';

export const routePaths = {
  public: [
    {
      path: routeNames.DetailHouse,
      element: <DetailHouse />,
    },
    {
      path: routeNames.Home,
      element: <Home />,
    },
    {
      path: routeNames.About,
      element: <AboutUs />,
    },
    {
      path: routeNames.Payment,
      element: <Payment />,
    },
  ],
  private: [],
};
