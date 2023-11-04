import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { apiCaller, setUpAxiosInterceptors } from './axios';
import { Provider } from 'react-redux';
import { store } from './store';
import { ConfigProvider } from 'antd';
import { COLORS } from './theme/colors.theme';
setUpAxiosInterceptors(store, apiCaller);
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
          Layout: {
            headerBg: COLORS.secondary,
          },
        },
      }}>
      <App />
    </ConfigProvider>
  </Provider>,
);
