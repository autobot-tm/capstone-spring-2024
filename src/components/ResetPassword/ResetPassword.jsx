import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeResetPasswordModal,
  openLoginModal,
  openRegisterModal,
} from '../../store/slices/modalSlice';
import { Form, Input, notification } from 'antd';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './ResetPassword.module.scss';
const ResetPassword = () => {
  const resetPasswordModal = useSelector(state => state.modal.resetPasswordModal);
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = type => {
    api[type]({
      message: 'Change Password Successfully',
    });
  };

  const handleSubmit = () => {
    dispatch(closeResetPasswordModal());
    dispatch(openLoginModal());
    openNotificationWithIcon('success');
  };
  return (
    <div>
      {contextHolder}
      <CustomModal
        nameOfModal={resetPasswordModal}
        title="Reset Password"
        action={closeResetPasswordModal}>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="newpassword"
            hasFeedback
            rules={[{ required: true, message: 'Please enter your new password' }]}>
            <Input.Password placeholder="Your new password" />
          </Form.Item>
          <Form.Item
            name="repeatpassword"
            dependencies={['newpassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please repeat your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newpassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!'),
                  );
                },
              }),
            ]}>
            <Input.Password placeholder="Repeat password" />
          </Form.Item>
          <Form.Item>
            <BaseButton type="primary" htmlType="submit">
              Confirm
            </BaseButton>
          </Form.Item>
        </Form>
        <div className={styles.askMemberContainer}>
          <span>Not a member?</span>
          <span
            onClick={() => {
              dispatch(closeResetPasswordModal());
              dispatch(openRegisterModal());
            }}>
            <b>Register here</b>
          </span>
        </div>
        <div className={styles.askLoginContainer}>
          <span>Have an account?</span>
          <span
            onClick={() => {
              dispatch(closeResetPasswordModal());
              dispatch(openLoginModal());
            }}>
            <b>Log in</b>
          </span>
        </div>
      </CustomModal>
    </div>
  );
};

export default ResetPassword;
