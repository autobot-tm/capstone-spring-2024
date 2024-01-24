import React, { useEffect } from 'react';
import { Alert, Checkbox, Form, Input } from 'antd';
import styles from './SignIn.module.scss';
import icon from '../../assets/images/GoogleIcon.svg';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeLoginModal,
  openRegisterModal,
  openRequestResetPasswordModal,
} from '../../store/slices/modalSlice';
import CustomModal from '../Modal/CustomModal';
import { useAuthSlice } from '../../store/slices';
import { t } from 'i18next';
const SignIn = () => {
  const loginModal = useSelector(state => state.modal.loginModal);
  const dispatch = useDispatch();

  const { actions: authActions } = useAuthSlice();
  const { actionSucceeded, loading, errorTranslationKey } = useSelector(state => state.auth);

  const handleFinish = values => {
    const { email, password } = values;
    dispatch(authActions.signIn({ email, password }));
  };

  useEffect(() => {
    if (actionSucceeded === 'signIn') {
      dispatch(closeLoginModal());
      dispatch(authActions.clearActionSucceeded());
    }
  }, [actionSucceeded]);

  return (
    <div>
      <CustomModal nameOfModal={loginModal} title={t('modal.login')} action={closeLoginModal}>
        <Form onFinish={handleFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('validationRules.required.email') },
              { type: 'email', message: t('validationRules.invalid.email') },
            ]}>
            <Input placeholder="Email" disabled={loading} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('validationRules.required.password') },
              { min: 8, message: t('validationRules.min.password') },
            ]}>
            <Input.Password placeholder={t('placeholder.password')} disabled={loading} />
          </Form.Item>
          <div className={styles.supportSignInContainer}>
            <Form.Item name="remember" noStyle>
              <Checkbox>{t('checkbox.rememberme')}</Checkbox>
            </Form.Item>
            <span
              onClick={() => {
                dispatch(closeLoginModal());
                dispatch(openRequestResetPasswordModal());
              }}>
              {t('forgetpassword')}
            </span>
          </div>
          {errorTranslationKey && (
            <Form.Item>
              <Alert message={t(errorTranslationKey)} type="error" />
            </Form.Item>
          )}

          <Form.Item>
            <BaseButton type="primary" htmlType="submit" disabled={loading} loading={loading}>
              {t('button.login')}
            </BaseButton>
          </Form.Item>
          <Form.Item>
            <div className={styles.askMemberContainer}>
              <span>{t('notamember')}</span>
              <span
                onClick={() => {
                  dispatch(closeLoginModal());
                  dispatch(openRegisterModal());
                }}>
                <b>{t('registerhere')}</b>
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.loginByGoogleContainer}>
              <img src={icon} alt="" />
            </div>
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};

export default SignIn;
