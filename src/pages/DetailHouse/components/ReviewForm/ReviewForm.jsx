import './ReviewForm.scss';
import React, { useState } from 'react';
import { Form, Input, Rate } from 'antd';
import { useTranslation } from 'react-i18next';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
// import { useDispatch, useSelector } from 'react-redux';
import { addHouseReview } from '../../../../services/apis/houses.service';

const ReviewForm = ({ house_id }) => {
  const { t } = useTranslation();
  // const { access_token } = useSelector(state => state.auth);
  // const dispatch = useDispatch();
  console.log(house_id);
  const [rating, setRating] = useState(null);
  const handleRating = value => {
    setRating(value);
  };
  const onFinish = async values => {
    try {
      if (values && rating) {
        console.log('Received values:', values.comment, rating);
        const comment = values.comment;
        await addHouseReview({ house_id, rating, comment });
      }
      console.log('Add successfully');
    } catch (error) {
      console.error('Error request contact us:', error);
    }
  };

  return (
    <Form name="reviewForm" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
      <Form.Item>
        <span>
          <Rate allowHalf allowClear={false} onChange={handleRating} />
        </span>
      </Form.Item>
      <Form.Item name="comment" rules={[{ required: true, message: 'Please enter your comment!' }]}>
        <Input.TextArea placeholder={t('detail-house.placeholder-comment')} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6 }}>
        <BaseButton type="primary" style={{ width: 'auto' }} htmlType="submit">
          <b>{t('detail-house.post-btn')}</b>
        </BaseButton>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
