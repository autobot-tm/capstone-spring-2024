import React from 'react';
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { routeNames } from '../config';
import { Payment } from '../pages/Payment/Payment';
import DetailHouse from '../pages/DetailHouse/DetailHouse';
import HousesPage from '../pages/Houses/HousesPage';
import ReservationPage from '../pages/Reservation/ReservationPage';
import OrderSuccessView from '../pages/Payment/components/OrderSuccessView/OrderSuccessView';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import ReportLivingIssues from '../pages/ReportLivingIssues/ReportLivingIssues';

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
      path: routeNames.DetailHouse,
      element: <DetailHouse />,
    },
    {
      path: routeNames.Houses,
      element: <HousesPage />,
    },
    {
      path: routeNames.Payment,
      element: <Payment />,
    },
    {
      path: routeNames.OrderSuccess,
      element: <OrderSuccessView />,
    },
  ],
  private: [
    {
      path: routeNames.ReportLivingIssues,
      element: <ReportLivingIssues />,
    },
    {
      path: routeNames.UserDashboard,
      element: <UserDashboard />,
    },
    {
      path: routeNames.Reservation,
      element: <ReservationPage />,
    },
  ],
};
