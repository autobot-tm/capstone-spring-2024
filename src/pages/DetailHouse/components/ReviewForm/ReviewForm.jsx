import './ReviewForm.scss';
import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';

const ReviewForm = () => {
  const { t } = useTranslation();
  const onFinish = values => {
    console.log('Received values:', values);
  };

  return (
    <Form name="reviewForm" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
      <Form.Item name="comment" rules={[{ required: true, message: 'Please enter your comment!' }]}>
        <Input.TextArea placeholder={t('detail-house.placeholder-comment')} />
      </Form.Item>

      <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
        <Input placeholder={t('detail-house.placeholder-name')} />
      </Form.Item>

      <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
        <Input placeholder={t('detail-house.placeholder-email')} type="email" />
      </Form.Item>

      <Form.Item name="website">
        <Input placeholder={t('detail-house.placeholder-website')} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t('detail-house.checkbox-des')}</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12 }}>
        <BaseButton type="primary" style={{ width: '60%' }} htmlType="submit">
          <b>{t('detail-house.post-btn')}</b>
        </BaseButton>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
