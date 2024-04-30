import './styles.scss';
import React, { useRef, useState } from 'react';
import { Headline } from '../../../../components/Typography';
import { Col, Form, Input, Row, Select, notification } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { requestContact } from '../../../../services/apis/contact.service';
import { useTranslation } from 'react-i18next';
import FilesUpload from '../../../../components/UploadFile/FilesUpload';
import { PHONE_NUMBER } from '../../../../constants/auth.constant';
import { AcceptedMediaTypes, MediaCategories } from '../../../../constants/media.constant';

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
        if (access_token) {
          formData = {
            ...values,
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
      console.error('Error request contact us:', error);
    } finally {
      setSubmitting(false);
    }
  };
  const getInitialValues = () => {
    if (access_token) {
      return {
        sender_first_name: user?.first_name,
        sender_email: user?.email,
        sender_last_name: user?.last_name,
        sender_phone_number: user?.phone_number,
      };
    }
    return {};
  };

  return (
    <>
      {contextHolder}
      <Headline strong>{t('CONTACT-US.send-us-a-message')}</Headline>
      <div className="contact-form-container">
        {!access_token ? (
          <NotLogged t={t} form={form} onFinish={onFinish} submitting={submitting} />
        ) : (
          <>
            <Form form={form} onFinish={onFinish} layout="vertical" initialValues={getInitialValues()}>
              <Row align="center" gutter={[10, 10]}>
                <Col xs={12}>
                  <Form.Item
                    rules={[
                      { required: true, message: t('error-first-name') },
                      {
                        max: 50,
                        message: t('validationRules.maxLength50'),
                      },
                    ]}
                    name="sender_first_name">
                    <Input
                      size="large"
                      defaultValue={user?.first_name}
                      placeholder={!user?.first_name && t('USER-DASHBOARD.placeholder-first-name')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    rules={[
                      { required: true, message: t('error-last-name') },
                      {
                        max: 50,
                        message: t('validationRules.maxLength50'),
                      },
                    ]}
                    name="sender_last_name">
                    <Input
                      size="large"
                      defaultValue={user?.last_name}
                      placeholder={!user?.last_name && t('USER-DASHBOARD.placeholder-last-name')}
                    />
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
                    <Input size="large" defaultValue={user?.email} placeholder={user?.email} />
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
                    <Input
                      size="large"
                      defaultValue={user?.phone_number}
                      placeholder={!user?.phone_number && t('USER-DASHBOARD.placeholder-mobile-phone')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="category" rules={[{ required: true, message: t('CONTACT-US.error-your-category') }]}>
                    <Select size="large" placeholder={t('CONTACT-US.placeholder-your-category')}>
                      <Select.Option style={{ fontSize: 16 }} value="HOMEOWNER_LEASE_INQUIRY">
                        {t('CONTACT-US.homeowner-lease-inquiry')}
                      </Select.Option>
                      <Select.Option style={{ fontSize: 16 }} value="OTHER">
                        {t('CONTACT-US.other')}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    rules={[
                      { required: true, message: t('CONTACT-US.error-your-message') },
                      {
                        max: 500,
                        message: t('validationRules.maxLength500'),
                      },
                    ]}
                    name="description">
                    <TextArea size="large" rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={500} />
                  </Form.Item>
                </Col>
                {access_token && (
                  <Col xs={24}>
                    <Form.Item name="attachment_urls">
                      <FilesUpload
                        limit={5}
                        acceptTypes={[AcceptedMediaTypes[MediaCategories.IMAGE]]}
                        ref={fileUploadRef}
                      />
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
          </>
        )}
      </div>
    </>
  );
};

export default ContactForm;

const NotLogged = ({ t, form, onFinish, submitting }) => {
  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row align="center" gutter={[10, 10]}>
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
          <Col xs={24}>
            <Form.Item name="category" rules={[{ required: true, message: t('CONTACT-US.error-your-category') }]}>
              <Select size="large" placeholder={t('CONTACT-US.placeholder-your-category')}>
                <Select.Option style={{ fontSize: 16 }} value="HOMEOWNER_LEASE_INQUIRY">
                  {t('CONTACT-US.homeowner-lease-inquiry')}
                </Select.Option>
                <Select.Option style={{ fontSize: 16 }} value="OTHER">
                  {t('CONTACT-US.other')}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: t('CONTACT-US.error-your-message') }]} name="description">
              <TextArea size="large" rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={200} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
                {submitting ? t('submitting') : t('CONTACT-US.send-a-message-btn')}
              </BaseButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
