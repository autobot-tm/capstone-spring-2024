import axios from 'axios';
import { APP_CONFIG } from '../config/app.config';
import { refreshToken } from '../store/slices';
import { REQUEST_TIME_OUT } from '../constants/api.constant';
import { apiErrorMapper } from '../services/helper/api-error-mapper.helper';
import { ERROR_TRANS_KEYS } from '../constants/error.constant';

export const apiCaller = axios.create({
  baseURL: APP_CONFIG.BACKEND_URL,
  timeout: REQUEST_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const configureApiCaller = store => {
  apiCaller.interceptors.response.use(
    response => {
      return response?.data;
    },
    async error => {
      const originalRequest = error.config;
      const errorCode = error?.response?.data?.error_code;
      const statusCode = error.response?.status;
      const isRetried = originalRequest?._retry;
      const errorTranslationKey = apiErrorMapper(errorCode, statusCode);
      console.log('error', {
        errorCode,
        statusCode,
        errorTranslationKey,
      });
      if (isRetried) {
        return Promise.reject(errorTranslationKey);
      }

      if (errorTranslationKey === ERROR_TRANS_KEYS.INVALID_JWT_TOKEN) {
        originalRequest._retry = true;
        const { isRefreshing } = store.getState().auth;
        if (isRefreshing) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        try {
          const dispatch = store.dispatch;
          const payload = await dispatch(refreshToken()).unwrap();
          const { access_token: newAccessToken } = payload;
          apiCaller.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

          if (originalRequest.headers && originalRequest.headers.Authorization) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
          return apiCaller(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(errorTranslationKey);
    },
  );

  apiCaller.interceptors.request.use(async config => {
    const { access_token } = store.getState().auth;
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  });
};
