import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { initTranslations } from './translations';
import App from './App';
import { store } from './store';
import { COLORS } from './theme/colors.theme';
import { BrowserRouter } from 'react-router-dom';
import { configureApiCaller } from './axios';
import { configureSentry } from './services/sentry/sentry.service';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import RequestResetPassword from './components/RequestResetPassword/RequestResetPassword';
import AuthenticationCode from './components/AuthenticationCode/AuthenticationCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { APP_CONFIG } from './config';
import AdvanceSearch from './components/AdvanceSearch/AdvanceSearch';
import ConfirmLogout from './components/ConfirmLogout/ConfirmLogout';
import ReservationDetail from './components/ReservationDetail/ReservationDetail';
import ContractDetail from './components/ContractDetail/ContractDetai';
import RequestCancelConract from './components/RequestCancelContract/RequestCancelConract';
import ShowAllImage from './components/ShowAllImage/ShowAllImage';
import ShowLeaseModal from './pages/ExtraServices/components/ShowLeaseModal/ShowLeaseModal';
import InvoiceDetail from './components/InvoiceDetail/InvoiceDetail';
import ExtraServiceDetailModal from './components/ExtraServiceDetailModal/ExtraServiceDetailModal';
import ContactRequestDetail from './pages/Management/components/ContactRequests/components/ContactRequestDetail/ContactRequestDetail';

initTranslations();
configureApiCaller(store);

configureSentry();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={APP_CONFIG.GOOGLE_CLIENT_ID}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.primary,
          },
          components: {
            Menu: {
              darkItemBg: COLORS.secondary,
              darkItemSelectedBg: COLORS.primary,
              darkItemColor: COLORS.white,
            },
            Input: {
              hoverBorderColor: COLORS.black,
              activeBorderColor: COLORS.black,
            },
          },
        }}>
        <BrowserRouter>
          <App />
          <SignIn />
          <Register />
          <RequestResetPassword />
          <AuthenticationCode />
          <ResetPassword />
          <AdvanceSearch />
          <ConfirmLogout />
          <ReservationDetail />
          <ContractDetail />
          <RequestCancelConract />
          <ShowAllImage />
          <ShowLeaseModal />
          <InvoiceDetail />
          <ExtraServiceDetailModal />
          <ContactRequestDetail />
        </BrowserRouter>
      </ConfigProvider>
    </GoogleOAuthProvider>
  </Provider>,
);
