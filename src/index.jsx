import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { initTranslations } from './translations';
import App from './App';
import { apiCaller, setUpAxiosInterceptors } from './axios';
import { store } from './store';
import { COLORS } from './theme/colors.theme';

setUpAxiosInterceptors(store, apiCaller);
initTranslations();
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
      <App />
    </ConfigProvider>
  </Provider>,
);
