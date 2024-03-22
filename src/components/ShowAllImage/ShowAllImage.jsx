import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { useSelector } from 'react-redux';
import { closeShowAllImageModal } from '../../store/slices/modalSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'antd';

const ShowAllImage = () => {
  const showAllImageModal = useSelector(state => state.modal.showAllImageModal);
  const images = useSelector(state => state.modal.images);
  return (
    <CustomModal
      width={800}
      nameOfModal={showAllImageModal}
      title={null}
      action={closeShowAllImageModal}
      footer={null}>
      <Row gutter={[8, 8]}>
        {images.map((image, index) => {
          return (
            <Col md={12} xs={24} key={index}>
              <LazyLoadImage
                effect="blur"
                src={image}
                width="100%"
                height="290px"
                style={{ objectFit: 'cover' }}
              />
            </Col>
          );
        })}
      </Row>
    </CustomModal>
  );
};

export default ShowAllImage;
