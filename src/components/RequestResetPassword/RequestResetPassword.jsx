import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestResetPasswordModal,
  openLoginModal,
  openRegisterModal,
} from '../../store/slices/modalSlice';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './RequestResetPassword.module.scss';
const RequestResetPassword = () => {
  const requestResetPasswordModal = useSelector(state => state.modal.requestResetPasswordModal);
  const dispatch = useDispatch();

  const handleSubmit = () => {};
  return (
    <div>
      <Modal
        width={400}
        centered
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '40px',
              fontSize: 25,
            }}>
            Forgot Password
          </div>
        }
        open={requestResetPasswordModal}
        onOk={() => {
          dispatch(closeRequestResetPasswordModal());
        }}
        onCancel={() => dispatch(closeRequestResetPasswordModal())}
        footer={null}>
        <Form onFinish={handleSubmit}>
          <Form.Item
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
        </Form>

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
      </Modal>
    </div>
  );
};

export default RequestResetPassword;
