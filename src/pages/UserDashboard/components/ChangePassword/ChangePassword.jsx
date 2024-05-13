import React, { useEffect, useState } from 'react';
import { Layout } from '../../../../hoc/Layout';
import './styles.scss';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PASSWORD_REGEX } from '../../../../constants/auth.constant';
import { updateUserCurrentService } from '../../../../services/apis/users.service';
import { useForm } from 'antd/es/form/Form';
import { ERROR_TRANS_KEYS } from '../../../../constants/error.constant';
import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [form] = useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error === ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS) {
      form.setFields([
        {
          name: 'currentPassword',
          errors: [`${t('Invalid Passowrd')}`],
        },
      ]);
    }
    setError(null);
  }, [error]);

  const handleSubmit = async values => {
    setLoadingUpload(true);
    const { currentPassword, newPassword } = values;
    await updateUserCurrentService({
      current_password: currentPassword,
      new_password: newPassword,
    }).catch(e => setError(e));
    form.resetFields();
    setLoadingUpload(false);
  };
  const handleBack = () => {
    navigate(`/user-dashboard/${user?.id}`);
  };

  return (
    <Layout>
      <div className="changePassword-container">
        <Row align="center" style={{ marginTop: 40 }}>
          <Col xs={24} md={15} xl={10}>
            <Card
              title={
                <>
                  <LeftOutlined className="icon-left" onClick={handleBack} />
                  {t('label.changePassword')}
                </>
              }>
              <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item
                  label={t('label.currentPassword')}
                  name="currentPassword"
                  rules={[
                    { required: true, message: t('validationRules.required.currentPassword') },
                    { pattern: PASSWORD_REGEX.MIN_LENGTH, message: t('validationRules.min.password') },
                  ]}>
                  <Input.Password placeholder={t('placeholder.currentPassword')} disabled={loadingUpload} />
                </Form.Item>
                <Form.Item
                  label={t('label.newPassword')}
                  name="newPassword"
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
                  <Input.Password placeholder={t('placeholder.newPassword')} disabled={loadingUpload} />
                </Form.Item>
                <Form.Item
                  dependencies={['newPassword']}
                  label={t('label.repeatNewPassword')}
                  name="repeatNewPassword"
                  rules={[
                    { required: true, message: t('validationRules.required.repeatNewPassword') },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('validationRules.notmatch.newPassword')));
                      },
                    }),
                  ]}>
                  <Input.Password placeholder={t('placeholder.repeatNewPassword')} disabled={loadingUpload} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block htmlType="submit" loading={loadingUpload} disabled={loadingUpload}>
                    {t('button.save')}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ChangePassword;
