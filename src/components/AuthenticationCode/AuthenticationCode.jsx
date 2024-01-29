import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthenticationCodeModal, openLoginModal } from '../../store/slices/modalSlice';
import { Form, Input } from 'antd';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './AuthenticationCode.module.scss';
import { useAuthSlice } from '../../store/slices';
import { t } from 'i18next';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import { Paragraph } from '../Typography';
import { Trans } from 'react-i18next';
const DEBOUNCE_TIME = 60; //seconds

const AuthenticationCode = () => {
  const { email, authenticationCodeModal } = useSelector(state => state.modal);
  const { actionSucceeded, loading, errorTranslationKey } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { actions: authActions } = useAuthSlice();
  const [debounceTime, setDebounceTime] = useState(0);
  const [form] = Form.useForm();

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

  const handleSubmit = async values => {
    const otp_code = Number(values.code);
    dispatch(authActions.activateAccount({ email, otp_code }));
  };

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
      dispatch(authActions.requestActivateAccount({ email }));
    }
  };

  useEffect(() => {
    if (actionSucceeded === AUTH_ACTIONS.ACTIVATE_ACCOUNT) {
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeAuthenticationCodeModal());

      dispatch(openLoginModal());
    }
  }, [actionSucceeded]);
  useEffect(() => {
    if (!authenticationCodeModal) {
      form.resetFields();
      dispatch(authActions.clearError());
    }
  }, [authenticationCodeModal]);
  return (
    <div>
      <CustomModal
        nameOfModal={authenticationCodeModal}
        title={t('modal.authenticationCode')}
        action={closeAuthenticationCodeModal}>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name={'code'}
            rules={[{ required: true, message: t('validationRules.required.authenticationCode') }]}>
            <Input placeholder={t('placeholder.authenticationCode')} disabled={loading} />
          </Form.Item>

          <Form.Item>
            <BaseButton type="primary" htmlType="submit" disabled={loading} loading={loading}>
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
                      dispatch(closeAuthenticationCodeModal());
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

export default AuthenticationCode;
