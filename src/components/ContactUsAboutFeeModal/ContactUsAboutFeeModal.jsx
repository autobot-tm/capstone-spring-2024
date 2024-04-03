import './styles.scss';
import React, { useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { closeContactUsAboutFeeModal, openInvoiceDetailModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { Form, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadFile from '../UploadFile/UploadFile';
import { useTranslation } from 'react-i18next';
import { requestIssues } from '../../services/apis/contact.service';
const ContactUsAboutFeeModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { access_token } = useSelector(state => state.auth);
  const { contactUsAboutFeeModal, invoiceId } = useSelector(state => state.modal);
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleBack = () => {
    dispatch(openInvoiceDetailModal({ invoiceId: invoiceId }));
    dispatch(closeContactUsAboutFeeModal());
  };

  const handleAttachmentChange = urls => {
    setAttachmentUrls(urls);
  };

  const onFinish = async values => {
    if (!access_token) {
      return;
    }
    try {
      if (values) {
        const formData = {
          context: {
            invoice_id: invoiceId,
          },
          description: values.description,
          attachment_urls: values.attachment_urls ? attachmentUrls : [],
          category: 'INVOICE_ISSUE',
        };
        await requestIssues(formData);
        dispatch(closeContactUsAboutFeeModal());
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
      <CustomModal
        width={540}
        nameOfModal={contactUsAboutFeeModal}
        title={t('modal.contact-us-about-rental-fee')}
        action={closeContactUsAboutFeeModal}
        footer={[]}>
        <div className="contact-us-fee-modal">
          <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: '100%' }}>
            <Form.Item
              rules={[{ required: true, message: t('CONTACT-US.error-your-message') }]}
              name="description">
              <TextArea
                rows={4}
                placeholder={t('CONTACT-US.placeholder-message')}
                maxLength={200}
              />
            </Form.Item>
            {access_token && (
              <Form.Item name="attachment_urls">
                <div className="file-upload-container">
                  <UploadFile
                    acceptTypes="image/*"
                    multiple={true}
                    onChange={handleAttachmentChange}
                  />
                </div>
              </Form.Item>
            )}

            <Form.Item>
              <div className="btn-container">
                <BaseButton
                  style={{ width: 'auto' }}
                  key=""
                  onClick={handleBack}
                  block
                  size="large">
                  {t('button.back')}
                </BaseButton>
                <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
                  {t('CONTACT-US.send-a-message-btn')}
                </BaseButton>
              </div>
            </Form.Item>
          </Form>
        </div>
      </CustomModal>
    </>
  );
};

export default ContactUsAboutFeeModal;
