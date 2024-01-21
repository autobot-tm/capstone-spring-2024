import { Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestResetPasswordModal,
  openAuthenticationCodeModal,
  openLoginModal,
  openRegisterModal,
} from '../../store/slices/modalSlice';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './RequestResetPassword.module.scss';
import CustomModal from '../Modal/CustomModal';
const RequestResetPassword = () => {
  const requestResetPasswordModal = useSelector(state => state.modal.requestResetPasswordModal);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(closeRequestResetPasswordModal());
    dispatch(openAuthenticationCodeModal(false));
  };
  return (
    <div>
      <CustomModal
        nameOfModal={requestResetPasswordModal}
        title="Forgot Password"
        action={closeRequestResetPasswordModal}>
        <Form onFinish={handleSubmit}>
          <Form.Item
            hasFeedback
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Please type a valid email' },
            ]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <BaseButton type="primary" htmlType="submit">
              Continue
            </BaseButton>
          </Form.Item>
        </Form>
        <div className={styles.askMemberContainer}>
          <span>Not a member?</span>
          <span
            onClick={() => {
              dispatch(closeRequestResetPasswordModal());
              dispatch(openRegisterModal());
            }}>
            <b>Register here</b>
          </span>
        </div>
        <div className={styles.askLoginContainer}>
          <span>Have an account?</span>
          <span
            onClick={() => {
              dispatch(closeRequestResetPasswordModal());
              dispatch(openLoginModal());
            }}>
            <b>Log in</b>
          </span>
        </div>
      </CustomModal>
    </div>
  );
};

export default RequestResetPassword;
