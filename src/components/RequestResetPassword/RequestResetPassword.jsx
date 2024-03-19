import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestResetPasswordModal,
  openLoginModal,
  openRegisterModal,
  openResetPasswordModal,
} from '../../store/slices/modalSlice';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import styles from './RequestResetPassword.module.scss';
import CustomModal from '../Modal/CustomModal';
import { t } from 'i18next';
import { Paragraph } from '../Typography';
import { Trans } from 'react-i18next';
import { useAuthSlice } from '../../store/slices';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
const RequestResetPassword = () => {
  const requestResetPasswordModal = useSelector(state => state.modal.requestResetPasswordModal);
  const { loading, errorTranslationKey, actionSucceeded } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { actions: authActions } = useAuthSlice();
  const [form] = Form.useForm();

  const handleFinish = values => {
    const { email } = values;
    setEmail(email);
    dispatch(authActions.requestResetPassword({ email }));
  };

  useEffect(() => {
    if (actionSucceeded === AUTH_ACTIONS.REQUEST_RESET_PASSWORD) {
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeRequestResetPasswordModal());
      dispatch(openResetPasswordModal({ email: email }));
    }
  }, [actionSucceeded]);

  useEffect(() => {
    if (errorTranslationKey === ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS) {
      form.setFields([
        {
          name: 'email',
          errors: [`${t(errorTranslationKey)}`],
        },
      ]);
      dispatch(authActions.clearError());
    }
  }, [errorTranslationKey]);

  useEffect(() => {
    if (!requestResetPasswordModal) {
      form.resetFields();
      dispatch(authActions.clearError());
    }
  }, [form, requestResetPasswordModal]);
  return (
    <div>
      <CustomModal
        width={440}
        nameOfModal={requestResetPasswordModal}
        title={t('modal.forgotPassword')}
        action={closeRequestResetPasswordModal}
        footer={null}>
        <Form onFinish={handleFinish} form={form}>
          <Form.Item
            hasFeedback
            name={'email'}
            disabled={loading}
            rules={[
              { required: true, message: t('validationRules.required.email') },
              { type: 'email', message: t('validationRules.invalid.email') },
            ]}>
            <Input size="large" placeholder={t('placeholder.email')} />
          </Form.Item>
          <Form.Item>
            <BaseButton type="primary" htmlType="submit" disabled={loading} loading={loading}>
              {t('button.continue')}
            </BaseButton>
          </Form.Item>
        </Form>
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
                      dispatch(closeRequestResetPasswordModal());
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
                    classNames={styles.actionText}
                    onClick={() => {
                      dispatch(closeRequestResetPasswordModal());
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

export default RequestResetPassword;
