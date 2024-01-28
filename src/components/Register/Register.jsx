import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRegisterModal,
  openAuthenticationCodeModal,
  openLoginModal,
} from '../../store/slices/modalSlice';
import styles from './Register.module.scss';
import CustomModal from '../Modal/CustomModal';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { useAuthSlice } from '../../store/slices';
import { DEFAULT_ROLE, PASSWORD_REGEX } from '../../constants/auth.constant';
import { AUTH_ACTIONS } from '../../store/constants/action-name.constant';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import { Paragraph } from '../../components/Typography';
const Register = () => {
  const registerModal = useSelector(state => state.modal.registerModal);
  const { actions: authActions } = useAuthSlice();
  const { loading, errorTranslationKey, actionSucceeded } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const handleFinish = values => {
    const { email, password } = values;
    setEmail(email);
    dispatch(authActions.signUp({ email, password, role: DEFAULT_ROLE }));
  };

  useEffect(() => {
    if (errorTranslationKey === ERROR_TRANS_KEYS.EMAIL_ALREADY_EXISTS) {
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
    if (actionSucceeded === AUTH_ACTIONS.SIGN_UP) {
      dispatch(authActions.clearActionSucceeded());
      dispatch(closeRegisterModal());
      form.resetFields();
      dispatch(openAuthenticationCodeModal({ isFinish: true, email: email }));
    }
  }, [actionSucceeded]);
  useEffect(() => {
    if (!registerModal) {
      form.resetFields();
    }
  }, [form, registerModal]);
  return (
    <CustomModal
      nameOfModal={registerModal}
      title={t('modal.register')}
      action={closeRegisterModal}>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item
          hasFeedback
          name={'email'}
          rules={[
            { required: true, message: t('validationRules.required.email') },
            { type: 'email', message: t('validationRules.invalid.email') },
          ]}>
          <Input placeholder="Email" disabled={loading} />
        </Form.Item>
        <Form.Item
          name={'password'}
          hasFeedback
          rules={[
            { required: true, message: t('validationRules.required.password') },
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
          <Input.Password placeholder={t('placeholder.password')} disabled={loading} />
        </Form.Item>
        <Form.Item
          name={'repeatpassword'}
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: t('validationRules.required.repeatpassword') },
            { min: 8, message: t('validationRules.min.password') },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('validationRules.notmatch.password')));
              },
            }),
          ]}>
          <Input.Password placeholder={t('placeholder.repeatpassword')} disabled={loading} />
        </Form.Item>
        <Paragraph classNames={styles.message}>{t('registration.disclaimer')}</Paragraph>

        <Form.Item>
          <BaseButton type="primary" htmlType="submit" disabled={loading} loading={loading}>
            {t('button.register')}
          </BaseButton>
        </Form.Item>
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
                      dispatch(closeRegisterModal());
                      dispatch(openLoginModal());
                    }}
                  />
                ),
              }}
            />
          </Paragraph>
        </div>
      </Form>
    </CustomModal>
  );
};

export default Register;
