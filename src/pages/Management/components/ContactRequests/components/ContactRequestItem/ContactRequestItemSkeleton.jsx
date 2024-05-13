import React from 'react';
import styles from './ContactRequestItem.module.scss';
import { Skeleton } from 'antd';

const ContactRequestItemSkeleton = () => {
  return (
    <div className={styles.contactRequestContainer}>
      <Skeleton.Input style={{ height: 138 }} active block />
    </div>
  );
};

export default ContactRequestItemSkeleton;
