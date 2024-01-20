import React from 'react';
import { Checkbox, Form, Input, Modal, notification } from 'antd';
import styles from './SignIn.module.scss';
import icon from '../../assets/images/GoogleIcon.svg';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeLoginModal,
  openRegisterModal,
  openRequestResetPasswordModal,
} from '../../store/slices/modalSlice';
const SignIn = () => {
  const loginModal = useSelector(state => state.modal.loginModal);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = type => {
    api[type]({
      message: 'Login Successfully',
    });
  };
  const handleFinish = () => {
    openNotificationWithIcon('success');
    dispatch(closeLoginModal());
  };

  return (
    <>
      {contextHolder}
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
              Login
            </div>
          }
          open={loginModal}
          onOk={() => {
            dispatch(closeLoginModal());
          }}
          onCancel={() => dispatch(closeLoginModal())}
          footer={null}>
          <Form onFinish={handleFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <div className={styles.supportSignInContainer}>
              <Form.Item name="remember" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <span
                onClick={() => {
                  dispatch(closeLoginModal());
                  dispatch(openRequestResetPasswordModal());
                }}>
                Lost your password?
              </span>
            </div>

            <Form.Item>
              <BaseButton type="primary" htmlType="subbmit">
                Login
              </BaseButton>
            </Form.Item>
            <Form.Item>
              <div className={styles.askMemberContainer}>
                <span>Not a member?</span>
                <span
                  onClick={() => {
                    dispatch(closeLoginModal());
                    dispatch(openRegisterModal());
                  }}>
                  <b>Register here</b>
                </span>
              </div>
            </Form.Item>
            <Form.Item>
              <div className={styles.loginByGoogleContainer}>
                <img src={icon} alt="" />
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default SignIn;
