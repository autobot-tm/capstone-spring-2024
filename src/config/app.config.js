export const APP_CONFIG = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_BASE_URL || '',
  IS_DEV: process.env.NODE_ENV === 'development',
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || '',
  ENV: process.env.REACT_APP_ENV || '',
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
  GOOGLE_MAPS_KEY: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
};
