import { Spin } from 'antd';
import React from 'react';
import './style.scss';

const SpinLoading = () => {
  return (
    <div className="loading-spin">
      <Spin size="large" />
    </div>
  );
};

export default SpinLoading;
