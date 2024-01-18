import axios, { HttpStatusCode } from 'axios';
import { APP_CONFIG } from '../config/app.config';
import { refreshToken } from '../store/slices';
import { REQUEST_TIME_OUT } from '../constants/api.constant';
import { apiErrorMapper } from '../services/helper/api-error-mapper.helper';
import { store } from '../store';

export const apiCaller = axios.create({
  baseURL: APP_CONFIG.BACKEND_ENDPOINT,
  timeout: REQUEST_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
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

    if (statusCode === HttpStatusCode.Forbidden) {
      originalRequest._retry = true;

      const dispatch = store.dispatch;
      const payload = await dispatch(refreshToken()).unwrap();
      const { access_token: newAccessToken } = payload;
      apiCaller.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      }
      return apiCaller(originalRequest);
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
