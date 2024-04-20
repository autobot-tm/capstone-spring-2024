import './styles.scss';
import React, { useState, useEffect } from 'react';
import { Form, Input, Rate, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeReviewHouseModal, openContractDetailModal } from '../../store/slices/modalSlice';
import CustomModal from '../Modal/CustomModal';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { addHouseReview, getHouseReview } from '../../services/apis/houses.service';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';

const HouseReviewModal = () => {
  const { t } = useTranslation();
  const { access_token } = useSelector(state => state.auth);

  const { user } = useSelector(state => state.user);
  const [isReview, setIsReview] = useState({});

  const dispatch = useDispatch();
  //console.log('run review api');
  const [rating, setRating] = useState(null);
  const { reviewHouseModal, contractId, houseID } = useSelector(state => state.modal);
  //console.log('House ID Modal: ', houseID);

  const isReviews = async () => {
    try {
      const review = await getHouseReview({ house_id: houseID });
      console.log('review', review);
      const isReviewer = review.reviews.find(review => review.reviewer.email === user.email);
      setIsReview(isReviewer);
      // if (isReviewer) {
      //   console.log(`Comment của bo: ${isReviewer.comment} and ${isReviewer.rating}`);
      // } else {
      //   console.log(`bo chưa comment.`);
      // }
    } catch (error) {
      console.log('Error in HouseReviewModal: ', error);
    }
  };
  useEffect(() => {
    if (houseID) {
      isReviews();
    }
  }, [houseID, reviewHouseModal]);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleRating = value => {
    setRating(value);
  };
  const handleBack = () => {
    dispatch(openContractDetailModal({ contractId: contractId }));
    dispatch(closeReviewHouseModal());
  };
  const onFinish = async values => {
    try {
      if (!access_token) {
        return;
      }
      if (values && rating) {
        console.log('Received values:', values.comment, rating);
        const comment = values.comment;
        await addHouseReview({ house_id: houseID, rating, comment });
        dispatch(closeReviewHouseModal());
        openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
      }
      console.log('Add successfully');
    } catch (error) {
      console.error('Error request contact us:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <CustomModal
        width={540}
        nameOfModal={reviewHouseModal}
        action={closeReviewHouseModal}
        footer={[]}
        title={isReview ? 'Your Review' : t('detail-house.leave-title')}>
        <div className="house-review-modal">
          {!isReview ? (
            <Form name="reviewForm" onFinish={onFinish} layout="vertical" style={{ width: '100%' }}>
              <Paragraph>{t('detail-house.leave-des-2')}</Paragraph>
              <Form.Item>
                <span>
                  <Rate allowHalf allowClear={false} onChange={handleRating} required />
                </span>
              </Form.Item>
              <Form.Item name="comment" rules={[{ required: true, message: 'Please enter your comment!' }]}>
                <Input.TextArea rows={4} placeholder={t('detail-house.placeholder-comment')} maxLength={200} />
              </Form.Item>
              <Form.Item>
                <div className="btn-container">
                  <BaseButton style={{ width: 'auto' }} key="" onClick={handleBack} block size="large">
                    {t('button.back')}
                  </BaseButton>
                  <BaseButton type="primary" style={{ width: 'auto' }} htmlType="submit">
                    <b>{t('detail-house.post-btn')}</b>
                  </BaseButton>
                </div>
              </Form.Item>
            </Form>
          ) : (
            <>
              <Rate allowHalf disabled value={isReview.rating} /> <br />
              <Paragraph>{isReview.comment}</Paragraph>
            </>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default HouseReviewModal;
