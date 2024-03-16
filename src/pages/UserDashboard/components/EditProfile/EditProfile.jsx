import './style.scss';
import { Avatar, Col, Form, Input, Row, Select, message } from 'antd';
import React, { useState } from 'react';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { updateUserCurrentService } from '../../../../services/apis/users.service';
import { PASSWORD_REGEX, PHONE_NUMBER } from '../../../../constants/auth.constant';
import { ERROR_TRANS_KEYS } from '../../../../constants/error.constant';
import { useDispatch } from 'react-redux';
import { resetPasswordUseAfterUpdate, updateUser } from '../../../../store/slices/user.slice';

const { Option } = Select;
const EditProfile = ({ user, t, avatarDefault, onUpdate }) => {
  const dispatch = useDispatch();
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const [showPasswordBtn, setShowPasswordBtn] = useState(false);
  const [formUser, setFormUser] = useState(user);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = (fieldName, value) => {
    if (
      fieldName === 'current_password' ||
      fieldName === 'new_password' ||
      fieldName === 'repeat_password'
    ) {
      if (!value.trim()) {
        value = null;
      }
    }
    switch (fieldName) {
      case 'current_password':
        setCurrentPasswordError(null);
        break;
      case 'new_password':
        setNewPasswordError(null);
        break;
      case 'repeat_password':
        setRepeatPasswordError(null);
        break;
      default:
        break;
    }
    setFormUser(prevUser => ({ ...prevUser, [fieldName]: value }));
  };

  const debouncedInputChange = debounce(handleInputChange, 500);

  const validateRepeatPassword = (_, value) => {
    const { new_password } = formUser;
    if (value && new_password !== value) {
      return Promise.reject(new Error(t('USER-DASHBOARD.the-password-do-not-match')));
    }
    return Promise.resolve();
  };

  const handleSubmit = async () => {
    setCurrentPasswordError(null);

    const isFieldsBeingUpdated = user.current_password || user.new_password || user.repeat_password;

    if (!isFieldsBeingUpdated) {
      console.log('User is updating fields only');
    } else {
      if (!user.current_password) {
        return setCurrentPasswordError('Please enter your current password');
      }
      if (!user.new_password) {
        return setNewPasswordError('Please enter your new password');
      }
      if (!user.repeat_password) {
        return setRepeatPasswordError('Please repeat your new password');
      }
    }

    try {
      const res = await updateUserCurrentService(formUser);
      onUpdate();
      dispatch(resetPasswordUseAfterUpdate());
      dispatch(updateUser(res));
      message.success('User profile updated successfully');
      console.log('Update success:', res);
    } catch (error) {
      console.error('Error updating user:', error);
      if (ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS === error) {
        setCurrentPasswordError('Your current password is not correct!');
      }
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const renderSelect = (label, fieldName) => (
    <Form.Item
      label={
        <Paragraph classNames="color-black" strong>
          {t(`USER-DASHBOARD.${label}`)}
        </Paragraph>
      }>
      <Select
        placeholder={user?.country || t(`USER-DASHBOARD.placeholder-country`)}
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
        <Row id="edit-profile" gutter={[24, 12]}>
          <Col xs={24} className="line">
            <SubHeading size={230} strong>
              <UserOutlined className="icon" /> {t('USER-DASHBOARD.general-info')}
            </SubHeading>
          </Col>
          <Col xs={24} sm={16} md={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.profile-img')}
                </Paragraph>
              }>
              <Avatar
                src={user?.avatar_url ? formUser?.avatar_url : avatarDefault}
                shape="square"
                size={100}
              />
            </Form.Item>
            <Form.Item>
              <UploadFile
                acceptTypes="image/*"
                multiple={false}
                onChange={value => debouncedInputChange('avatar_url', value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} md={12} style={{ display: 'flex', alignItems: 'center' }}>
            <BaseButton
              size="medium"
              style={{ width: 'fit-content' }}
              onClick={() => setShowPasswordBtn(!showPasswordBtn)}>
              <Paragraph classNames="color-black">{t('USER-DASHBOARD.change-password')}</Paragraph>
            </BaseButton>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.first-name')}
                </Paragraph>
              }>
              <Input
                defaultValue={user?.first_name}
                onChange={e => debouncedInputChange('first_name', e.target.value)}
                placeholder={t('USER-DASHBOARD.placeholder-first-name')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.last-name')}
                </Paragraph>
              }>
              <Input
                defaultValue={user?.last_name}
                onChange={e => debouncedInputChange('last_name', e.target.value)}
                placeholder={t('USER-DASHBOARD.placeholder-last-name')}
              />
            </Form.Item>
          </Col>

          {showPasswordBtn && user?.auth_method === 'NORMAL' && (
            <>
              <Col xs={24} md={12}>
                <Form.Item
                  name="current_password"
                  label={
                    <Paragraph classNames="color-black" strong>
                      {t('USER-DASHBOARD.password')}
                    </Paragraph>
                  }
                  validateStatus={currentPasswordError ? 'error' : ''}
                  help={currentPasswordError}>
                  <Input.Password
                    onChange={e => debouncedInputChange('current_password', e.target.value)}
                    type="password"
                    autoComplete="true"
                    placeholder={t('USER-DASHBOARD.placeholder-password')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Form.Item
                  name="new_password"
                  label={
                    <Paragraph classNames="color-black" strong>
                      {t('USER-DASHBOARD.new-password')}
                    </Paragraph>
                  }
                  validateStatus={newPasswordError ? 'error' : ''}
                  help={newPasswordError}
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
                  <Input.Password
                    type="password"
                    onChange={e => debouncedInputChange('new_password', e.target.value)}
                    autoComplete="true"
                    placeholder={t('USER-DASHBOARD.placeholder-new-password')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Form.Item
                  name="repeat_password"
                  dependencies={['new_password']}
                  label={
                    <Paragraph classNames="color-black" strong>
                      {t('USER-DASHBOARD.repeat-password')}
                    </Paragraph>
                  }
                  validateStatus={repeatPasswordError ? 'error' : ''}
                  help={repeatPasswordError}
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
                    { validator: validateRepeatPassword },
                  ]}>
                  <Input.Password
                    type="password"
                    onChange={e => debouncedInputChange('repeat_password', e.target.value)}
                    autoComplete="true"
                    placeholder={t('USER-DASHBOARD.placeholder-repeat-password')}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          <Col xs={24} className="line">
            <SubHeading size={230} strong>
              <InfoCircleOutlined className="icon" /> {t('USER-DASHBOARD.contact-info')}
            </SubHeading>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone_number"
              label={
                <Paragraph classNames="color-black" strong>
                  {t('USER-DASHBOARD.mobile-phone')}
                </Paragraph>
              }
              rules={[
                {
                  pattern: PHONE_NUMBER.VALID_LENGTH,
                  message: t('USER-DASHBOARD.mobile-phone-error-valid-length'),
                },
              ]}>
              <Input
                defaultValue={formUser?.phone_number}
                onChange={e => debouncedInputChange('phone_number', e.target.value)}
                type="tel"
                min="0"
                placeholder={t('USER-DASHBOARD.placeholder-mobile-phone')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            {renderSelect('country', 'country')}
          </Col>
          <Col xs={24} md={12}>
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
