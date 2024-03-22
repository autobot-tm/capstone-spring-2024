import { Button, Col, Row } from 'antd';
import React from 'react';
import styles from './ImageLayout.module.scss';
import { CompressOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openShowAllImageModal } from '../../../../store/slices/modalSlice';

const ImageLayout = ({ images }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.imageLayoutContainer}>
      <Row gutter={[8, 8]} style={{ height: '100%' }}>
        {images.slice(0, 1).map((image, index) => {
          return (
            <Col md={12} xs={24} style={{ height: '100%' }} key={index}>
              <img src={image} alt="" className={styles.image} />
            </Col>
          );
        })}

        <Col md={12} style={{ height: '99%' }} className={styles.imageCol}>
          <Row gutter={[8, 8]} style={{ height: '100%' }}>
            {images.slice(1, 5).map((image, index) => {
              return (
                <Col key={index} md={12} style={{ height: '50%' }}>
                  <img src={image} alt="" className={styles.image} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Button
        type="default"
        className={styles.button}
        icon={<CompressOutlined />}
        onClick={() => dispatch(openShowAllImageModal({ images: images }))}>
        Show all photo
      </Button>
    </div>
  );
};

export default ImageLayout;
