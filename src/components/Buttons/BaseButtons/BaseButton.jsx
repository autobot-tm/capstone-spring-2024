import { Button } from 'antd';
import React from 'react';
import styles from './BaseButton.module.scss';

const BaseButton = ({ children, type, htmlType, disabled, ...props }) => {
  return (
    <Button
      className={styles.baseButton}
      type={type}
      htmlType={htmlType}
      disabled={disabled}
      loading={disabled}
      size="medium"
      block
      {...props}>
      {children}
    </Button>
  );
};

export default BaseButton;
