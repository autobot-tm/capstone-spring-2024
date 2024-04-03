import './styles.scss';
import React, { useEffect, useState } from 'react';
import { SubHeading } from '../../../../components/Typography';
import { Col, Form, Input, Row, Select, Upload, notification } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { requestContact, requestIssues } from '../../../../services/apis/contact.service';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { InboxOutlined } from '@ant-design/icons';

const ContactForm = () => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user);
  const { access_token } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const [leaseOptions, setLeaseOptions] = useState([]);
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [category, setCategory] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleCategoryChange = value => {
    setCategory(value);
  };

  const handleAttachmentChange = urls => {
    setAttachmentUrls(urls);
  };

  const { data: leaseData, error: leaseError } = useSWR(
    user?.email ? ['/leases', user.email] : null,
    async (_, email) => {
      if (user?.email && access_token && user) {
        const response = await getLeasesService({
          renter_email: email,
          offset: 0,
          status: 'ACTIVE',
          limit: 20,
        });
        return response.leases;
      }
    },
  );

  useEffect(() => {
    if (leaseData) {
      const activeLeases = leaseData.map(lease => ({
        label: lease?.reservation?.house?.name,
        value: lease.id,
      }));
      setLeaseOptions(activeLeases);
    }
  }, [leaseData]);

  if (leaseError) {
    console.error('Error fetching data:', leaseError);
  }

  const onFinish = async values => {
    try {
      if (values && category === 'LIVING_ISSUE') {
        const issuesForm = {
          context: {
            lease_id: values.lease_id,
          },
          description: values.description,
          attachment_urls: values.attachment_urls ? attachmentUrls : [],
          category: values.category,
        };
        await requestIssues(issuesForm);
      } else {
        let formData = null;
        if (access_token && user) {
          formData = {
            ...values,
            sender_first_name: user?.first_name,
            sender_last_name: user?.last_name,
            sender_phone_number: user?.phone_number,
            sender_email: user?.email,
            attachment_urls: values.attachment_urls ? attachmentUrls : [],
          };
        } else {
          formData = {
            ...values,
            attachment_urls: values.attachment_urls ? attachmentUrls : [],
          };
        }

        await requestContact(formData);
      }
      openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
      form.resetFields();
    } catch (error) {
      console.error('Error fetching leases:', error);
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
            {!access_token && (
              <>
                <Col xs={12}>
                  <Form.Item rules={[{ required: true, message: t('error-first-name') }]} name="sender_first_name">
                    <Input placeholder={t('USER-DASHBOARD.placeholder-first-name')} />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item rules={[{ required: true, message: t('error-first-name') }]} name="sender_last_name">
                    <Input placeholder={t('USER-DASHBOARD.placeholder-last-name')} />
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
                    <Input type="email" placeholder={t('USER-DASHBOARD.placeholder-email')} />
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
                    ]}>
                    <Input placeholder={t('USER-DASHBOARD.placeholder-mobile-phone')} />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col xs={24}>
              <Form.Item name="category" rules={[{ required: true, message: t('CONTACT-US.error-your-category') }]}>
                <Select onChange={handleCategoryChange} placeholder={t('CONTACT-US.placeholder-your-category')}>
                  {access_token && (
                    <>
                      <Select.Option value="LIVING_ISSUE">{t('CONTACT-US.living-issue')}</Select.Option>{' '}
                    </>
                  )}
                  <Select.Option value="HOMEOWNER_LEASE_INQUIRY">
                    {t('CONTACT-US.homeowner-lease-inquiry')}
                  </Select.Option>
                  <Select.Option value="OTHER">{t('CONTACT-US.other')}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              {category === 'LIVING_ISSUE' && (
                <Form.Item name="lease_id" rules={[{ required: true, message: t('CONTACT-US.error-your-house') }]}>
                  <Select options={leaseOptions} placeholder={t('CONTACT-US.placeholder-your-house')} />
                </Form.Item>
              )}
            </Col>
            <Col xs={24}>
              <Form.Item rules={[{ required: true, message: t('CONTACT-US.error-your-message') }]} name="description">
                <TextArea rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Dragger">
                <Form.Item name="dragger" valuePropName="fileList" noStyle>
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="attachment_urls">
                <UploadFile acceptTypes="image/*" multiple={true} onChange={handleAttachmentChange} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item>
                <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
                  {t('CONTACT-US.send-a-message-btn')}
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
