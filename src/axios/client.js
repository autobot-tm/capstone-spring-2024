import axios from 'axios';
import { appConfig } from '../config';

export const apiCaller = axios.create({
  baseURL: appConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setUpAxiosInterceptors = (store, instance) => {
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(config => {
    if (config.headers) {
      if (store.getState().auth) {
        const { accessToken } = store.getState().auth;
        if (accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
        }
      }
    }
    return config;
  });
};
