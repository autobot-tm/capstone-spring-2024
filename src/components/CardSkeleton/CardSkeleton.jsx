import { Card, Skeleton, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import styles from './CardSkeleton.module.scss';

const CardSkeleton = () => {
  return (
    <Card
      cover={<Skeleton.Input style={{ height: '290px' }} active block />}
      actions={[
        <div key="houseInfo" className={styles.houseInfo}>
          <div className={styles.price}>
            <Skeleton.Input style={{ height: 28.66 }} active block />
          </div>
          <Space>
            <Skeleton.Button size="small" style={{ height: 28.66 }} active />
            <Skeleton.Button size="small" style={{ height: 28.66 }} active />
            <Skeleton.Button size="small" style={{ height: 28.66 }} active />
          </Space>
        </div>,
      ]}>
      <Meta
        title={
          <>
            <Skeleton.Input style={{ height: 62 }} block active />
          </>
        }
        description={
          <>
            <Skeleton.Input style={{ height: 24 }} block active />
          </>
        }
      />
    </Card>
  );
};

export default CardSkeleton;
