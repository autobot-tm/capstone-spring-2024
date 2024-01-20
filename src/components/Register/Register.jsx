import { Form, Input, Modal, Select, notification } from 'antd';
import React from 'react';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterModal, openLoginModal } from '../../store/slices/modalSlice';
import styles from './Register.module.scss';

const Register = () => {
  const registerModal = useSelector(state => state.modal.registerModal);
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = type => {
    api[type]({
      message: 'Register Successfully',
    });
  };

  const handleFinish = () => {
    dispatch(closeRegisterModal());
    openNotificationWithIcon('success');

    dispatch(openLoginModal());
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
              Register
            </div>
          }
          open={registerModal}
          onOk={() => {
            dispatch(closeRegisterModal());
          }}
          onCancel={() => {
            dispatch(closeRegisterModal());
          }}
          footer={null}>
          <Form onFinish={handleFinish}>
            <Form.Item
              hasFeedback
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please input valid email' },
              ]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="repeatpassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please repeat your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
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
            <Form.Item
              hasFeedback
              name="role"
              rules={[{ required: true, message: 'Role is required' }]}>
              <Select
                placeholder="Select your role"
                options={[{ value: 'renter', label: 'Renter' }]}
              />
            </Form.Item>
            <p className={styles.message}>
              Your personal data will be used to support your experience throughout this website, to
              manage access to your account, and for other purposes described in our privacy policy.
            </p>
            <Form.Item>
              <BaseButton type="primary" htmlType="subbmit">
                Register
              </BaseButton>
            </Form.Item>
            <div className={styles.askLoginContainer}>
              <span>Have an account?</span>
              <span
                onClick={() => {
                  dispatch(closeRegisterModal());
                  dispatch(openLoginModal());
                }}>
                <b>Log in</b>
              </span>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Register;
