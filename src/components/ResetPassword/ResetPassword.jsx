import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeResetPasswordModal,
  openLoginModal,
  openRegisterModal,
} from '../../store/slices/modalSlice';
import { Form, Input } from 'antd';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './ResetPassword.module.scss';
import { PASSWORD_REGEX } from '../../constants/auth.constant';
import { t } from 'i18next';
import { Paragraph } from '../Typography';
import { Trans } from 'react-i18next';
import { useAuthSlice } from '../../store/slices';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
const DEBOUNCE_TIME = 60; //seconds

const ResetPassword = () => {
  const { email, resetPasswordModal } = useSelector(state => state.modal);

  const dispatch = useDispatch();
  const { actions: authActions } = useAuthSlice();

  const [debounceTime, setDebounceTime] = useState(0);
  const { loading, errorTranslationKey, actionSucceeded } = useSelector(state => state.auth);

  const [form] = Form.useForm();

  const handleFinish = values => {
    const otp_code = Number(values.code);
    const new_password = values.newpassword;
    dispatch(authActions.resetPassword({ email, otp_code, new_password }));
  };

  useEffect(() => {
    if (!resetPasswordModal) {
      form.resetFields();
      dispatch(authActions.clearError());
    }
  }, [form, resetPasswordModal]);

  useEffect(() => {
    if (errorTranslationKey === ERROR_TRANS_KEYS.INVALID_OTP_CODE) {
      form.setFields([
        {
          name: 'code',
          errors: [`${t(errorTranslationKey)}`],
        },
      ]);
      dispatch(authActions.clearError());
    }
  }, [errorTranslationKey]);

  useEffect(() => {
    if (actionSucceeded === AUTH_ACTIONS.RESET_PASSWORD) {
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeResetPasswordModal());
      dispatch(openLoginModal());
    }
  }, [actionSucceeded]);

  useEffect(() => {
    if (debounceTime > 0) {
      const interval = setInterval(() => {
        setDebounceTime(time => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [debounceTime]);

  const handleResendCode = () => {
    if (!debounceTime) {
      setDebounceTime(DEBOUNCE_TIME);
      dispatch(authActions.requestResetPassword({ email }));
    }
  };

  return (
    <div>
      <CustomModal
        nameOfModal={resetPasswordModal}
        title={t('modal.resetpassword')}
        action={closeResetPasswordModal}>
        <Form onFinish={handleFinish} form={form}>
          <Form.Item
            name="newpassword"
            hasFeedback
            rules={[
              { required: true, message: t('validationRules.required.newPassword') },
              { pattern: PASSWORD_REGEX.MIN_LENGTH, message: t('validationRules.min.password') },
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
            <Input.Password placeholder={t('placeholder.newpassword')} disabled={loading} />
          </Form.Item>
          <Form.Item
            name="repeatpassword"
            dependencies={['newpassword']}
            hasFeedback
            rules={[
              { required: true, message: t('validationRules.required.repeatpassword') },
              { min: 8, message: t('validationRules.min.password') },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newpassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('validationRules.notmatch.password')));
                },
              }),
            ]}>
            <Input.Password placeholder={t('placeholder.repeatnewpassword')} disabled={loading} />
          </Form.Item>
          <Form.Item
            name={'code'}
            rules={[{ required: true, message: t('validationRules.required.authenticationCode') }]}>
            <Input placeholder={t('placeholder.authenticationCode')} disabled={loading} />
          </Form.Item>
          <Form.Item>
            <BaseButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
              {t('button.confirm')}
            </BaseButton>
          </Form.Item>
        </Form>
        <div className={styles.resendBtnContainer}>
          <Paragraph classNames={styles.actionText}>
            <Trans
              i18nKey="activateAccount.resendCode"
              components={{
                resend: (
                  <Paragraph
                    strong
                    classNames={`${styles.actionText} ${styles.actionTextPointer} ${
                      debounceTime && styles.actionTextDisabled
                    }`}
                    onClick={handleResendCode}
                  />
                ),
                in: (
                  <Paragraph
                    strong
                    classNames={`${styles.actionText} ${
                      debounceTime ? styles.actionTextDisabled : styles.actionTextHidden
                    }`}
                  />
                ),
              }}
            />
            {debounceTime > 0 && (
              <Paragraph
                strong
                classNames={`${styles.actionText} ${debounceTime && styles.actionTextDisabled}`}>
                {debounceTime}s
              </Paragraph>
            )}
          </Paragraph>
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
                      dispatch(closeResetPasswordModal());
                      dispatch(openRegisterModal());
                    }}
                  />
                ),
              }}
            />
          </Paragraph>
        </div>
        <div className={styles.askLoginContainer}>
          <Paragraph>
            <Trans
              i18nKey="auth.haveAccount"
              components={{
                signIn: (
                  <Paragraph
                    strong
                    classNames={`${styles.actionText} ${styles.actionTextPointer}`}
                    onClick={() => {
                      dispatch(closeResetPasswordModal());
                      dispatch(openLoginModal());
                    }}
                  />
                ),
              }}
            />
          </Paragraph>
        </div>
      </CustomModal>
    </div>
  );
};

export default ResetPassword;
