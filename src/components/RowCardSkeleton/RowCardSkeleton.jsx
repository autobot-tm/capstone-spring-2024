import React from 'react';
import styles from './RowCardSkeleton.module.scss';
import { Skeleton } from 'antd';
const RowCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton.Input style={{ height: '200px' }} active block />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.locationContainer}></div>
          <Skeleton.Input style={{ height: 24, width: 250 }} block active />

          <div className={styles.statusContainer}>
            <Skeleton.Input style={{ height: 24 }} block active />
            <Skeleton.Input style={{ height: 15 }} block active />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <Skeleton.Input style={{ height: 40 }} block active />
        </div>
        <div className={styles.descriptionContainer}>
          <Skeleton.Input style={{ height: 24 }} block active />
        </div>
        <div className={styles.priceContainer}>
          <Skeleton.Input style={{ height: 28.66, width: 100 }} active block />
        </div>
      </div>
    </div>
  );
};

export default RowCardSkeleton;
