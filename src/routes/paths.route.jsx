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
import Management from '../pages/Management/Management';
import ExtraServices from '../pages/ExtraServices/ExtraServices';
import ContactUs from '../pages/ContactUs/ContactUs';

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
      path: routeNames.ExtraServices,
      element: <ExtraServices />,
    },
    {
      path: routeNames.ContactUs,
      element: <ContactUs />,
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
      path: routeNames.Payment,
      element: <Payment />,
    },
    {
      path: routeNames.Reservation,
      element: <ReservationPage />,
    },
    {
      path: routeNames.OrderSuccess,
      element: <OrderSuccessView />,
    },
    {
      path: routeNames.Management,
      element: <Management />,
    },
  ],
};
