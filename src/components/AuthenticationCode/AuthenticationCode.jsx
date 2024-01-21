import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAuthenticationCodeModal,
  openLoginModal,
  openRegisterModal,
  openResetPasswordModal,
} from '../../store/slices/modalSlice';
import { Form, Input, notification } from 'antd';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './AuthenticationCode.module.scss';
const AuthenticationCode = () => {
  const authenticationCodeModal = useSelector(state => state.modal.authenticationCodeModal);
  const isFinish = useSelector(state => state.modal.isFinish);

  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = type => {
    api[type]({
      message: 'Create account successfully',
    });
  };
  const handleSubmit = () => {
    dispatch(closeAuthenticationCodeModal());
    if (isFinish) {
      dispatch(openLoginModal());
      openNotificationWithIcon('success');
    } else {
      dispatch(openResetPasswordModal());
    }
  };
  return (
    <div>
      {contextHolder}
      <CustomModal
        nameOfModal={authenticationCodeModal}
        title="Check your Email"
        action={closeAuthenticationCodeModal}>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="code"
            rules={[{ required: true, message: 'Please input your authentication code' }]}>
            <Input placeholder="Your code" />
          </Form.Item>
          <Form.Item>
            <BaseButton type="primary" htmlType="submit">
              Confirm
            </BaseButton>
          </Form.Item>
        </Form>
        {!isFinish && (
          <div className={styles.askMemberContainer}>
            <span>Not a member?</span>
            <span
              onClick={() => {
                dispatch(closeAuthenticationCodeModal());
                dispatch(openRegisterModal());
              }}>
              <b>Register here</b>
            </span>
          </div>
        )}

        <div className={styles.askLoginContainer}>
          <span>Have an account?</span>
          <span
            onClick={() => {
              dispatch(closeAuthenticationCodeModal());
              dispatch(openLoginModal());
            }}>
            <b>Log in</b>
          </span>
        </div>
      </CustomModal>
    </div>
  );
};

export default AuthenticationCode;
