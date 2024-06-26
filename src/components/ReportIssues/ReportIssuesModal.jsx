import './styles.scss';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { closeReportIssuesModal, openContractDetailModal, openInvoiceDetailModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import { Form, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
import {
  getIssueByIdInvoiceService,
  getIssueByIdLeaseService,
  requestIssues,
} from '../../services/apis/contact.service';
import { Paragraph } from '../Typography';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import FilesUpload from '../UploadFile/FilesUpload';
import { LoadingOutlined } from '@ant-design/icons';
import { AcceptedMediaTypes, MediaCategories } from '../../constants/media.constant';

const ReportIssuesModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { access_token } = useSelector(state => state.auth);
  const { reportIssuesModal, invoiceId, categoryIssue, contractId } = useSelector(state => state.modal);
  const [isReport, setIsReport] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileUploadRef = useRef();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };
  const isIssuesReport = async () => {
    try {
      setLoading(true);
      if (invoiceId && categoryIssue === 'INVOICE_ISSUE') {
        const res = await getIssueByIdInvoiceService({
          invoice_id: invoiceId,
          status: 'UNDER_REVIEW',
        });
        return setIsReport(res.issues);
      }
      if (contractId && categoryIssue === 'LIVING_ISSUE') {
        const res = await getIssueByIdLeaseService({
          lease_id: contractId,
          status: 'UNDER_REVIEW',
        });
        return setIsReport(res.issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (reportIssuesModal && (invoiceId || contractId)) {
      isIssuesReport();
    }
  }, [reportIssuesModal]);
  const handleBack = () => {
    if (categoryIssue === 'INVOICE_ISSUE') {
      dispatch(openInvoiceDetailModal({ invoiceId: invoiceId }));
    } else {
      dispatch(openContractDetailModal({ contractId: contractId }));
    }
    dispatch(closeReportIssuesModal());
  };
  const onFinish = async values => {
    if (!access_token) {
      return;
    }
    try {
      setSubmitting(true);
      let formData = null;
      const urls = await fileUploadRef.current?.upload();
      if (values && invoiceId && categoryIssue === 'INVOICE_ISSUE') {
        formData = {
          context: {
            invoice_id: invoiceId,
          },
          category: categoryIssue,
          description: values.description,
          attachment_urls: urls,
        };
      } else {
        formData = {
          context: {
            lease_id: contractId,
          },
          category: categoryIssue,
          description: values.description,
          attachment_urls: urls,
        };
      }
      await requestIssues(formData);
      dispatch(closeReportIssuesModal());
      openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
      form.resetFields();
    } catch (error) {
      if (error === ERROR_TRANS_KEYS.ISSUE_BEING_PROCESSED) {
        console.error('Error request invoice issues because ISSUE BEING PROCESSED:', error);
      } else {
        console.error('Error request invoice issues:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <CustomModal
        width={540}
        nameOfModal={reportIssuesModal}
        title={
          categoryIssue === 'LIVING_ISSUE'
            ? t('modal.contact-us-about-living-issue')
            : t('modal.contact-us-about-rental-fee')
        }
        action={closeReportIssuesModal}
        footer={[]}>
        {loading ? (
          <div className="loading-container">
            <LoadingOutlined size="large" />
          </div>
        ) : (
          <>
            {isReport?.length !== 0 ? (
              <>
                <Paragraph classNames="d-block" style={{ textAlign: 'center', marginBottom: 40 }}>
                  {t('waitForLatestResponse')}
                </Paragraph>
                <div className="btn-container">
                  <BaseButton key="" style={{ width: 'auto' }} onClick={handleBack} block size="large">
                    {t('button.back')}
                  </BaseButton>
                </div>
              </>
            ) : (
              <div className="contact-us-fee-modal">
                <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: '100%' }}>
                  <Form.Item
                    rules={[
                      { required: true, message: t('CONTACT-US.error-your-message') },
                      {
                        max: 500,
                        message: t('validationRules.maxLength500'),
                      },
                    ]}
                    name="description">
                    <TextArea rows={4} placeholder={t('CONTACT-US.placeholder-message')} maxLength={500} />
                  </Form.Item>
                  {access_token && (
                    <Form.Item name="attachment_urls">
                      <div className="file-upload-container">
                        <FilesUpload
                          limit={5}
                          acceptTypes={[AcceptedMediaTypes[MediaCategories.IMAGE]]}
                          ref={fileUploadRef}
                        />
                      </div>
                    </Form.Item>
                  )}

                  <Form.Item>
                    <div className="btn-container">
                      <BaseButton style={{ width: 'auto' }} key="" onClick={handleBack} block size="large">
                        {t('button.back')}
                      </BaseButton>
                      <BaseButton style={{ width: 'auto' }} type="primary" htmlType="submit">
                        {submitting ? t('submitting') : t('CONTACT-US.send-a-message-btn')}
                      </BaseButton>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            )}
          </>
        )}
      </CustomModal>
    </>
  );
};

export default ReportIssuesModal;
