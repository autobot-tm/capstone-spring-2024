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

initTranslations();
configureApiCaller(store);

configureSentry();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
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
        },
      }}>
      <BrowserRouter>
        <App />
        <SignIn />
        <Register />
        <RequestResetPassword />
        <AuthenticationCode />
        <ResetPassword />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
);
