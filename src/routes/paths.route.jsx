import React from 'react';
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { routeNames } from '../config';
import { Payment } from '../pages/Payment/Payment';
import DetailHouse from '../pages/DetailHouse/DetailHouse';
import HousesPage from '../pages/Houses/HousesPage';
import ReservationPage from '../pages/Reservation/ReservationPage';

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
    {
      path: routeNames.DetailHouse,
      element: <DetailHouse />,
    },
    {
      path: routeNames.Houses,
      element: <HousesPage />,
    },
    {
      path: routeNames.Reservation,
      element: <ReservationPage />,
    },
  ],
  private: [],
};
