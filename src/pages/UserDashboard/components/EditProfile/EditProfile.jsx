import './style.scss';
import { Avatar, Col, Form, Input, Row, Select, message, notification } from 'antd';
import React, { useState } from 'react';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { ExclamationCircleOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { updateUserCurrentService } from '../../../../services/apis/users.service';
import { PASSWORD_REGEX } from '../../../../constants/auth.constant';
import { ERROR_TRANS_KEYS } from '../../../../constants/error.constant';

const { Option } = Select;
const EditProfile = ({ user, t, avatarDefault, onUpdate }) => {
  const [formUser, setFormUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    country: user.country,
    new_password: null,
    current_password: null,
  });

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = (fieldName, value) => {
    setFormUser({ ...formUser, [fieldName]: value });
  };

  const debouncedInputChange = debounce(handleInputChange, 500);

  const handleSubmit = async () => {
    if (
      !formUser.first_name ||
      !formUser.last_name ||
      !formUser.phone_number ||
      !formUser.country
    ) {
      return notification.error({
        message: t('detail-house.error'),
        icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        description: 'Please fill in all fields',
      });
    }

    if (user.auth_method === 'NORMAL') {
      if (
        (!formUser.current_password && formUser.new_password) ||
        (formUser.current_password && !formUser.new_password)
      ) {
        return notification.error({
          message: t('detail-house.error'),
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
          description: 'You have not entered your current password or a new password',
        });
      }
    }
    try {
      const res = await updateUserCurrentService(formUser);
      onUpdate();
      message.success('User profile updated successfully');
      console.log('Update success:', res);
    } catch (error) {
      console.error('Error updating user:', error);
      if (ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS === error) {
        notification.error({
          message: t('detail-house.error'),
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
          description: 'Your current password is not correct!',
        });
      }
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const renderSelect = (label, fieldName, placeholder) => (
    <Form.Item
      label={
        <Paragraph classNames="color-black" strong>
          {t(`USER-DASHBOARD.${label}`)}
        </Paragraph>
      }
      name={fieldName}>
      <Select
        value={formUser[fieldName]}
        placeholder={user?.country ? user.country : t(`USER-DASHBOARD.${placeholder}`)}
        onChange={value => handleInputChange(fieldName, value)}
        style={{ width: '100%' }}>
        <Option value="Vietnam">Vietnam</Option>
        <Option value="Japan">Japan</Option>
        <Option value="USA">USA</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout="vertical">
        <Row id="edit-profile" gutter={[32, 44]}>
          <Col xs={24} className="line">
            <SubHeading size={230} strong>
              <UserOutlined className="icon" /> {t('USER-DASHBOARD.general-info')}
            </SubHeading>
          </Col>
          <Col xs={24} md={4} className="flex-item">
            <Paragraph classNames="color-black" strong>
              {t('USER-DASHBOARD.profile-img')}
            </Paragraph>
            <Avatar src={avatarDefault} shape="square" className="avatar-user" />
          </Col>
          <Col xs={24} md={20} className="upload-file">
            <UploadFile />
          </Col>
          <Col xs={24} md={12} className="flex-item">
            <Form.Item
              name="first_name"
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.first-name')}
                </Paragraph>
              }>
              <Input
                value={formUser.first_name}
                onChange={e => debouncedInputChange('first_name', e.target.value)}
                placeholder={
                  user?.first_name
                    ? user.first_name
                    : `${t('USER-DASHBOARD.placeholder-first-name')}`
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className="flex-item">
            <Form.Item
              name="last_name"
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.last-name')}
                </Paragraph>
              }>
              <Input
                onChange={e => debouncedInputChange('last_name', e.target.value)}
                placeholder={
                  user?.last_name ? user.last_name : `${t('USER-DASHBOARD.placeholder-last-name')}`
                }
              />
            </Form.Item>
          </Col>

          {user.auth_method === 'NORMAL' && (
            <>
              <Col xs={24} md={12} className="flex-item">
                <Form.Item
                  name="current_password"
                  label={
                    <Paragraph classNames="color-black" strong>
                      {t('USER-DASHBOARD.password')}
                    </Paragraph>
                  }>
                  <Input
                    onChange={e => debouncedInputChange('current_password', e.target.value)}
                    type="password"
                    placeholder={t('USER-DASHBOARD.placeholder-password')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} className="flex-item">
                <Form.Item
                  name="new_password"
                  label={
                    <Paragraph classNames="color-black" strong>
                      {t('USER-DASHBOARD.new-password')}
                    </Paragraph>
                  }
                  rules={[
                    { message: t('validationRules.required.password') },
                    {
                      pattern: PASSWORD_REGEX.MIN_LENGTH,
                      message: t('validationRules.min.password'),
                    },
                    {
                      pattern: PASSWORD_REGEX.LOWERCASE,
                      message: t('validationRules.password.contain.lowercase'),
                    },
                    {
                      pattern: PASSWORD_REGEX.UPPERCASE,
                      message: t('validationRules.password.contain.uppercase'),
                    },
                    {
                      pattern: PASSWORD_REGEX.SPECIAL_CHARACTER,
                      message: t('validationRules.password.contain.special'),
                    },
                    {
                      pattern: PASSWORD_REGEX.NUMBER,
                      message: t('validationRules.password.contain.digit'),
                    },
                  ]}>
                  <Input
                    type="password"
                    onChange={e => debouncedInputChange('new_password', e.target.value)}
                    autoComplete
                    placeholder={t('USER-DASHBOARD.placeholder-new-password')}
                  />
                </Form.Item>
              </Col>
            </>
          )}
          {/* <Col xs={24} md={6} className="flex-item">
            <Form.Item
              name="repeat_password"
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.repeat-password')}
                </Paragraph>
              }>
              <Input
                value={repeat_password}
                placeholder={t('USER-DASHBOARD.placeholder-repeat-password')}
              />
            </Form.Item>
          </Col> */}
          <Col xs={24} className="line">
            <SubHeading size={230} strong>
              <InfoCircleOutlined className="icon" /> {t('USER-DASHBOARD.contact-info')}
            </SubHeading>
          </Col>
          <Col xs={24} md={12} className="flex-item">
            <Form.Item
              name="phone_number"
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.mobile-phone')}
                </Paragraph>
              }>
              <Input
                onChange={e => debouncedInputChange('phone_number', e.target.value)}
                type="number"
                min="0"
                placeholder={
                  user?.phone_number
                    ? user.phone_number
                    : `${t('USER-DASHBOARD.placeholder-mobile-phone')}`
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} className="flex-item">
            {renderSelect('country', 'country')}
          </Col>
          <Col xs={24} md={12} className="flex-item">
            <Form.Item
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.email')}
                </Paragraph>
              }>
              <Input placeholder={user?.email} disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Form.Item>
            <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
              {t('USER-DASHBOARD.update-profile-btn')}
            </BaseButton>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default EditProfile;
