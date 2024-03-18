import React, { useEffect } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestCancelContractModal,
  openContractDetailModal,
} from '../../store/slices/modalSlice';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { requestCancelContractService } from '../../services/apis/contracts.service';

const RequestCancelConract = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const requestCancelContractModal = useSelector(state => state.modal.requestCancelContractModal);
  const leaseId = useSelector(state => state.modal.contractId);

  const handleFinish = values => {
    const { title, reason, type } = values;

    requestCancelContractService({ leaseId, title, reason, type });
    dispatch(closeRequestCancelContractModal());
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
    <CustomModal
      width={600}
      nameOfModal={requestCancelContractModal}
      title={t('modal.requestCancelContract')}
      action={closeRequestCancelContractModal}
      footer={[
        <Button
          key=""
          onClick={() => {
            dispatch(closeRequestCancelContractModal());
            dispatch(openContractDetailModal({ contractId: leaseId }));
          }}>
          {t('button.back')}
        </Button>,
        <Button key="submit" htmlType="submit" type="primary" onClick={() => form.submit()}>
          {t('button.requestCancelContract')}
        </Button>,
      ]}>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item
          name={'type'}
          rules={[{ required: true, message: t('validationRules.required.type') }]}>
          <Select
            style={{
              width: '100%',
            }}
            placeholder={t('placeholder.type')}
            options={options}
          />
        </Form.Item>
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
  );
};

export default RequestCancelConract;
