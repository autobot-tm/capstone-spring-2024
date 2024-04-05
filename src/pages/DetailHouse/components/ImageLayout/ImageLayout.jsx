import { Button, Col, Image, Row } from 'antd';
import React from 'react';
import styles from './ImageLayout.module.scss';
import { CompressOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openShowAllImageModal } from '../../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
const ImageLayout = ({ images }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className={styles.imageLayoutContainer}>
      <Row gutter={[8, 8]} style={{ height: '100%' }}>
        {images.slice(0, 1).map((image, index) => {
          return (
            <Col md={12} xs={24} style={{ height: '100%' }} key={index}>
              <Image src={image} alt="" width="100%" height="100%" style={{ objectFit: 'cover' }} />
            </Col>
          );
        })}

        <Col md={12} style={{ height: '99%' }} className={styles.imageCol}>
          <Row gutter={[8, 8]} style={{ height: '100%' }}>
            {images.slice(1, 5).map((image, index) => {
              return (
                <Col key={index} md={12} style={{ height: '50%' }}>
                  <Image
                    src={image}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover' }}
                  />
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
        {t('button.showAllPhoto')}
      </Button>
    </div>
  );
};

export default ImageLayout;
