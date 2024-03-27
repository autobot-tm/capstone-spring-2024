import React from 'react';
// import styles from './InvoiceItemSkeleton.module.scss';
import { Skeleton } from 'antd';

const InvoiceItemSkeleton = () => {
  return <Skeleton.Input active block style={{ height: '195px' }} />;
};

export default InvoiceItemSkeleton;
