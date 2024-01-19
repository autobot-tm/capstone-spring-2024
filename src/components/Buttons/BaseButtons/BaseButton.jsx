import { Button } from 'antd';
import React from 'react';
import styles from './BaseButton.module.scss';

const BaseButton = ({ children, type, htmlType }) => {
  return (
    <Button className={styles.baseButton} type={type} htmlType={htmlType}>
      {children}
    </Button>
  );
};

export default BaseButton;
