import React, { useEffect } from 'react';
import { Alert, Form, Input } from 'antd';
import styles from './SignIn.module.scss';
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
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
import { Paragraph } from '../Typography';
import { Trans } from 'react-i18next';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
const SignIn = () => {
  const loginModal = useSelector(state => state.modal.loginModal);
  const dispatch = useDispatch();

  const { actions: authActions } = useAuthSlice();
  const { actionSucceeded, loading, errorTranslationKey } = useSelector(state => state.auth);
  const [form] = Form.useForm();

  const handleFinish = values => {
    const { email, password } = values;
    dispatch(authActions.signIn({ email, password }));
  };

  useEffect(() => {
    if (
      actionSucceeded === AUTH_ACTIONS.SIGN_IN ||
      actionSucceeded === AUTH_ACTIONS.SIGN_IN_WITH_GOOGLE
    ) {
      dispatch(closeLoginModal());
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeLoginModal());
    }
  }, [actionSucceeded]);

  useEffect(() => {
    if (!loginModal) {
      form.resetFields();
      dispatch(authActions.clearError());
    }
  }, [form, loginModal]);

  return (
    <div>
      <CustomModal
        width={400}
        nameOfModal={loginModal}
        title={t('modal.login')}
        action={closeLoginModal}
        footer={null}>
        <Form onFinish={handleFinish} form={form}>
          <Form.Item
            name={'email'}
            rules={[
              { required: true, message: t('validationRules.required.email') },
              { type: 'email', message: t('validationRules.invalid.email') },
            ]}>
            <Input placeholder="Email" disabled={loading} />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[
              { required: true, message: t('validationRules.required.password') },
              { min: 8, message: t('validationRules.min.password') },
            ]}>
            <Input.Password placeholder={t('placeholder.password')} disabled={loading} />
          </Form.Item>

          {errorTranslationKey === ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS && (
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
        </Form>
        <div className={styles.loginByGoogleContainer}>
          <GoogleSignInButton />
        </div>
      </CustomModal>
    </div>
  );
};

export default SignIn;
