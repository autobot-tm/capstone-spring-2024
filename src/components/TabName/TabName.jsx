import React from 'react';
import { Helmet } from 'react-helmet';

export const TabName = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
