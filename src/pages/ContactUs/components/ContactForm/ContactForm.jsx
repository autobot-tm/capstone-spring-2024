import './styles.scss';
import React, { useRef, useState } from 'react';
import { SubHeading } from '../../../../components/Typography';
import { Col, Form, Input, Row, Select, notification } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { requestContact } from '../../../../services/apis/contact.service';
import { useTranslation } from 'react-i18next';
import { ERROR_TRANS_KEYS } from '../../../../constants/error.constant';
import FilesUpload from '../../../../components/UploadFile/FilesUpload';
import { PHONE_NUMBER } from '../../../../constants/auth.constant';

const ContactForm = () => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user);
  const { access_token } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const fileUploadRef = useRef();
  const [api, contextHolder] = notification.useNotification();
  const [submitting, setSubmitting] = useState(false);

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const onFinish = async values => {
    try {
      setSubmitting(true);
      if (values) {
        let formData = null;
        const urls = await fileUploadRef.current?.upload();
        if (access_token && user) {
          formData = {
            ...values,
            sender_first_name: user?.first_name,
            sender_last_name: user?.last_name,
            sender_phone_number: values.sender_phone_number,
            sender_email: user?.email,
            attachment_urls: urls,
          };
        } else {
          formData = {
            ...values,
            attachment_urls: urls,
          };
        }
        await requestContact(formData);
      }
      openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
      form.resetFields();
    } catch (error) {
      if (error === ERROR_TRANS_KEYS.ISSUE_BEING_PROCESSED) {
        console.error('Error request living issues because ISSUE BEING PROCESSED:', error);
      } else {
        console.error('Error request contact us:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <SubHeading size={260} strong>
        {t('CONTACT-US.send-us-a-message')}
      </SubHeading>
      <div className="contact-form-container">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row align="center" gutter={[16, 0]}>
            {!access_token && <NotLogged t={t} />}
            {access_token && (
              <>
                <Col xs={12}>
                  <Form.Item name="sender_first_name">
                    <Input
                      size="large"
                      placeholder={user?.first_name ? user?.first_name : t('USER-DASHBOARD.first-name')}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item name="sender_last_name">
                    <Input
                      size="large"
                      placeholder={user?.last_name ? user?.last_name : t('USER-DASHBOARD.last-name')}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item name="sender_email">
                    <Input size="large" placeholder={user?.email} disabled />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    name="sender_phone_number"
                    rules={[
                      {
                        required: true,
                        message: t('error-phone-number'),
                      },
                      {
                        pattern: PHONE_NUMBER.VALID_LENGTH,
                        message: t('USER-DASHBOARD.mobile-phone-error-valid-length'),
                      },
                    ]}>
                    <Input size="large" placeholder={t('USER-DASHBOARD.placeholder-mobile-phone')} />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col xs={24}>
              <Form.Item name="category" rules={[{ required: true, message: t('CONTACT-US.error-your-category') }]}>
                <Select size="large" placeholder={t('CONTACT-US.placeholder-your-category')}>
                  <Select.Option value="HOMEOWNER_LEASE_INQUIRY">
                    {t('CONTACT-US.homeowner-lease-inquiry')}
                  </Select.Option>
                  <Select.Option value="OTHER">{t('CONTACT-US.other')}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item rules={[{ required: true, message: t('CONTACT-US.error-your-message') }]} name="description">
                <TextArea rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={200} />
              </Form.Item>
            </Col>
            {access_token && (
              <Col xs={24}>
                <Form.Item name="attachment_urls">
                  <FilesUpload acceptTypes="image/*" multiple={true} ref={fileUploadRef} />
                </Form.Item>
              </Col>
            )}
            <Col xs={24}>
              <Form.Item>
                <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
                  {submitting ? t('submitting') : t('CONTACT-US.send-a-message-btn')}
                </BaseButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;

const NotLogged = ({ t }) => {
  return (
    <>
      <Col xs={12}>
        <Form.Item rules={[{ required: true, message: t('error-first-name') }]} name="sender_first_name">
          <Input size="large" placeholder={t('USER-DASHBOARD.placeholder-first-name')} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item rules={[{ required: true, message: t('error-last-name') }]} name="sender_last_name">
          <Input size="large" placeholder={t('USER-DASHBOARD.placeholder-last-name')} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          name="sender_email"
          rules={[
            {
              type: 'email',
              message: t('error-validate-email'),
            },
            {
              required: true,
              message: t('error-email'),
            },
          ]}>
          <Input size="large" type="email" placeholder={t('USER-DASHBOARD.placeholder-email')} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          name="sender_phone_number"
          rules={[
            {
              required: true,
              message: t('error-phone-number'),
            },
            {
              pattern: PHONE_NUMBER.VALID_LENGTH,
              message: t('USER-DASHBOARD.mobile-phone-error-valid-length'),
            },
          ]}>
          <Input size="large" placeholder={t('USER-DASHBOARD.placeholder-mobile-phone')} />
        </Form.Item>
      </Col>
    </>
  );
};
