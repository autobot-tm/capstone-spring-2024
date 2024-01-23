import React from 'react';
import * as Sentry from '@sentry/react';
import { APP_CONFIG } from '../../config';
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
export const configureSentry = () => {
  console.log('configuring sentry');
  Sentry.init({
    dsn: APP_CONFIG.SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
      new Sentry.Replay(),
    ],

    tracesSampleRate: 1.0,
    enabled: !APP_CONFIG.IS_DEV,
    environment: APP_CONFIG.ENV,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};
