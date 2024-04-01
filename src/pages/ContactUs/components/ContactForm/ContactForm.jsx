import './styles.scss';
import React, { useEffect, useState } from 'react';
import { SubHeading } from '../../../../components/Typography';
import { Form, Select, notification } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { requestContact } from '../../../../services/apis/contact.service';
import { getInvoicesService } from '../../../../services/apis/invoices.service';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { openLoginModal } from '../../../../store/slices/modalSlice';

const ContactForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { access_token } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const [leaseOptions, setLeaseOptions] = useState([]);
  const [invoiceOptions, setInvoiceOptions] = useState([]);
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
      if (user?.email) {
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

  const { data: invoiceData, error: invoiceError } = useSWR(
    user?.email ? ['/invoices', user.email] : null,
    async (_, email) => {
      if (user?.email) {
        const response = await getInvoicesService({
          renter_email: email,
          status: 'PENDING',
          type: 'RENTAL_FEE',
          limit: 30,
          offset: 0,
        });
        return response.invoices;
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

  console.log('leaseData', leaseData);
  console.log('invoiceData', invoiceData);
  useEffect(() => {
    if (invoiceData) {
      const pendingInvoice = invoiceData.map(invoice => ({
        label: invoice?.lease?.reservation?.house?.name,
        value: invoice.id,
      }));
      setInvoiceOptions(pendingInvoice);
    }
  }, [invoiceData]);

  if (leaseError || invoiceError) {
    console.error('Error fetching data:', leaseError || invoiceError);
  }

  const onFinish = async values => {
    if (!access_token) {
      dispatch(openLoginModal());
      form.resetFields();
      return;
    }
    try {
      if (values) {
        const formData = {
          context: {
            lease_id: values.lease_id,
            invoice_id: values.invoice_id,
          },
          description: values.description,
          attachment_urls: values.attachment_urls ? attachmentUrls : [],
          category: values.category,
        };
        await requestContact(formData);
        openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
        form.resetFields();
      }
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
          <Form.Item
            name="category"
            rules={[{ required: true, message: t('CONTACT-US.error-your-category') }]}>
            <Select
              onChange={handleCategoryChange}
              placeholder={t('CONTACT-US.placeholder-your-category')}>
              {access_token && (
                <>
                  {' '}
                  <Select.Option value="INVOICE_ISSUE">
                    {t('CONTACT-US.invoice-issue')}
                  </Select.Option>
                  <Select.Option value="LIVING_ISSUE">{t('CONTACT-US.living-issue')}</Select.Option>{' '}
                </>
              )}
              <Select.Option value="HOMEOWNER_LEASE_INQUIRY">
                {t('CONTACT-US.homeowner-lease-inquiry')}
              </Select.Option>
              <Select.Option value="OTHER">{t('CONTACT-US.other')}</Select.Option>
            </Select>
          </Form.Item>

          {category === 'INVOICE_ISSUE' && (
            <Form.Item
              name="invoice_id"
              rules={[{ required: true, message: t('CONTACT-US.error-your-house') }]}>
              <Select
                options={invoiceOptions}
                placeholder={t('CONTACT-US.placeholder-your-house')}
              />
            </Form.Item>
          )}

          {category === 'LIVING_ISSUE' && (
            <Form.Item
              name="lease_id"
              rules={[{ required: true, message: t('CONTACT-US.error-your-house') }]}>
              <Select options={leaseOptions} placeholder={t('CONTACT-US.placeholder-your-house')} />
            </Form.Item>
          )}

          <Form.Item
            rules={[{ required: true, message: t('CONTACT-US.error-your-message') }]}
            name="description">
            <TextArea rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={200} />
          </Form.Item>
          {access_token && (
            <Form.Item name="attachment_urls">
              <UploadFile acceptTypes="image/*" multiple={true} onChange={handleAttachmentChange} />
            </Form.Item>
          )}

          <Form.Item>
            <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
              {t('CONTACT-US.send-a-message-btn')}
            </BaseButton>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
