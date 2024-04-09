import React, { useEffect, useState } from 'react';
import { Alert, Form, Input } from 'antd';
import styles from './SignIn.module.scss';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal, openRegisterModal, openRequestResetPasswordModal } from '../../store/slices/modalSlice';
import CustomModal from '../Modal/CustomModal';
import { useAuthSlice } from '../../store/slices';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
import { Paragraph } from '../Typography';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';

const SignIn = () => {
  const loginModal = useSelector(state => state.modal.loginModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { actions: authActions } = useAuthSlice();
  const { actionSucceeded, loading, errorTranslationKey } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const [flag, setFlag] = useState(false);
  const [errorHolder, setErrorHolder] = useState('');

  const handleFinish = values => {
    const { email, password } = values;
    dispatch(authActions.signIn({ email, password }));
  };

  useEffect(() => {
    if (actionSucceeded === AUTH_ACTIONS.SIGN_IN || actionSucceeded === AUTH_ACTIONS.SIGN_IN_WITH_GOOGLE) {
      dispatch(closeLoginModal());
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeLoginModal());
      navigate('/');
    }
  }, [actionSucceeded]);

  useEffect(() => {
    if (!loginModal) {
      form.resetFields();
      dispatch(authActions.clearError());
      setFlag(false);
    } else {
      setFlag(false);
    }
  }, [form, loginModal]);

  useEffect(() => {
    if (
      errorTranslationKey === ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS ||
      errorTranslationKey === ERROR_TRANS_KEYS.ACCOUNT_SUSPENDED
    ) {
      setFlag(true);
      setErrorHolder(errorTranslationKey);
      console.log(errorTranslationKey);
    }
  }, [errorTranslationKey]);

  return (
    <div>
      <CustomModal width={440} nameOfModal={loginModal} title={t('modal.login')} action={closeLoginModal} footer={null}>
        <Form onFinish={handleFinish} form={form}>
          <Form.Item
            name={'email'}
            rules={[
              { required: true, message: t('validationRules.required.email') },
              { type: 'email', message: t('validationRules.invalid.email') },
            ]}>
            <Input placeholder={t('placeholder.email')} size="large" disabled={loading} />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[
              { required: true, message: t('validationRules.required.password') },
              { min: 8, message: t('validationRules.min.password') },
            ]}>
            <Input.Password placeholder={t('placeholder.password')} size="large" disabled={loading} />
          </Form.Item>

          {flag && (
            <Form.Item>
              <Alert message={t(errorHolder)} type="error" />
            </Form.Item>
          )}

          <Form.Item>
            <BaseButton type="primary" htmlType="submit" disabled={loading} loading={loading}>
              {t('button.login')}
            </BaseButton>
          </Form.Item>
          <Form.Item>
            <div className={styles.supportSignInContainer}>
              <span
                onClick={() => {
                  dispatch(closeLoginModal());
                  dispatch(openRequestResetPasswordModal());
                }}>
                {t('forgetpassword')}
              </span>
            </div>
            <div className={styles.askMemberContainer}>
              <Paragraph>
                <Trans
                  i18nKey="auth.dontHaveAccount"
                  components={{
                    register: (
                      <Paragraph
                        strong
                        classNames={styles.actionText}
                        onClick={() => {
                          dispatch(closeLoginModal());
                          dispatch(openRegisterModal());
                        }}
                      />
                    ),
                  }}
                />
              </Paragraph>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.loginByGoogleContainer}>
              <GoogleSignInButton />
            </div>
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};

export default SignIn;
