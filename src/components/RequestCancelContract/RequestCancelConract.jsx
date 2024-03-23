import React, { useEffect } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestCancelContractModal,
  openContractDetailModal,
  openShowLeaseModal,
} from '../../store/slices/modalSlice';
import { Button, Form, Input, Select, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { requestCancelContractService } from '../../services/apis/contracts.service';
import { requestExtraServices } from '../../services/apis/extra-services.service';

const RequestCancelConract = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { requestCancelContractModal, typeOfRequest, contractId, extraServiceId } = useSelector(
    state => state.modal,
  );
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = type => {
    api[type]({
      message: t('notification.submittedSuccessfully'),
    });
  };

  const handleFinish = async values => {
    const { title, reason, type } = values;

    if (typeOfRequest === 'service') {
      try {
        const requestData = {
          lease_id: contractId,
          extra_service_id: extraServiceId,
          description: reason,
          title,
        };
        await requestExtraServices(requestData);
        dispatch(closeRequestCancelContractModal());
        openNotificationWithIcon('success');
      } catch (error) {
        console.warn('Error request services: ', error);
      }
    } else {
      try {
        console.log('run contract', extraServiceId, contractId, title, reason, type);
        const requestData = { lease_id: contractId, title, reason, type };
        await requestCancelContractService(requestData);
        dispatch(closeRequestCancelContractModal());
        openNotificationWithIcon('success');
      } catch (error) {
        console.warn('Error request cancel contract: ', error);
      }
    }
  };

  const [form] = Form.useForm();

  const options = [
    {
      label: t('label.jobRelocation'),
      value: 'JOB_RELOCATION',
    },
    {
      label: t('label.houseIssue'),
      value: 'HOUSE_ISSUE',
    },
    {
      label: t('label.financialIssue'),
      value: 'FINANCIAL_ISSUE',
    },
    {
      label: t('label.familyIssue'),
      value: 'FAMILY_ISSUE',
    },
    {
      label: t('label.healthIssue'),
      value: 'HEALTH_ISSUE',
    },
    {
      label: t('label.other'),
      value: 'OTHER',
    },
  ];

  useEffect(() => {
    if (!requestCancelContractModal) {
      form.resetFields();
    }
  }, [requestCancelContractModal]);

  return (
    <>
      {contextHolder}
      <CustomModal
        width={600}
        nameOfModal={requestCancelContractModal}
        title={
          typeOfRequest === 'service'
            ? t('modal.extraServiceRequest')
            : t('modal.requestCancelContract')
        }
        action={closeRequestCancelContractModal}
        footer={[
          <Button
            key="back"
            onClick={() => {
              if (typeOfRequest === 'service') {
                dispatch(closeRequestCancelContractModal());
                dispatch(openShowLeaseModal());
              } else {
                dispatch(closeRequestCancelContractModal());
                dispatch(openContractDetailModal({ contractId: contractId }));
              }
            }}>
            {t('button.back')}
          </Button>,
          <Button key="submit" htmlType="submit" type="primary" onClick={() => form.submit()}>
            {typeOfRequest === 'service' ? t('button.request') : t('button.requestCancelContract')}
          </Button>,
        ]}>
        <Form onFinish={handleFinish} form={form}>
          {typeOfRequest !== 'service' && (
            <Form.Item
              name={'type'}
              rules={[{ required: true, message: t('validationRules.required.type') }]}>
              <Select
                style={{ width: '100%' }}
                placeholder={t('placeholder.type')}
                options={options}
              />
            </Form.Item>
          )}
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: t('validationRules.required.title') }]}>
            <Input placeholder={t('placeholder.title')} />
          </Form.Item>
          <Form.Item
            name={'reason'}
            rules={[{ required: true, message: t('validationRules.required.reason') }]}>
            <TextArea rows={4} placeholder={t('placeholder.reason')} maxLength={200} />
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};

export default RequestCancelConract;
