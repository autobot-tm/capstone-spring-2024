import './styles.scss';
import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeRequestCancelContractModal,
  openContractDetailModal,
  openShowLeaseModal,
} from '../../store/slices/modalSlice';
import { Alert, Form, Input, Popconfirm, Select, Table, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { requestCancelContractService } from '../../services/apis/contracts.service';
import {
  requestCancelExtraServices,
  requestExtraServices,
} from '../../services/apis/extra-services.service';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';
import ServiceStatus from '../../pages/ExtraServices/components/ServiceStatus/ServiceStatus';
import { mutate } from 'swr';
import BaseButton from '../Buttons/BaseButtons/BaseButton';

const RequestCancelConract = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { requestCancelContractModal, typeOfRequest, contractId, extraServiceId, leases } =
    useSelector(state => state.modal);
  const { extraServicesRequests } = useSelector(state => state.extraServices);
  const [error, setError] = useState(false);
  const [isRequestCancel, setIsRequestCancel] = useState(false);
  const [requestInprogress, setRequestInprogress] = useState('');
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };
  useEffect(() => {
    const firstElement = extraServicesRequests.find(item => {
      return (
        item.lease_id === contractId &&
        item.extra_service.id === extraServiceId &&
        (item.status === 'UNDER_REVIEW' || item.status === 'APPROVED')
      );
    });

    if (firstElement) {
      setRequestInprogress(firstElement);
      setIsRequestCancel(true);
    } else {
      setIsRequestCancel(false);
    }
  }, [contractId, extraServiceId, extraServicesRequests]);

  const handleFinish = async values => {
    const { title, reason, type, description } = values;
    if (typeOfRequest === 'service') {
      try {
        const requestData = {
          lease_id: contractId,
          extra_service_id: extraServiceId,
          description,
          title,
        };
        await requestExtraServices(requestData);
        dispatch(closeRequestCancelContractModal());
        openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
        mutate('/extraServiceRequests');
      } catch (error) {
        if (error === ERROR_TRANS_KEYS.WAIT_FOR_SERVICE_CONFIRMATION) {
          setError(true);
        }
        console.warn('Error request services: ', error);
      }
    } else {
      try {
        const requestData = { lease_id: contractId, title, reason, type };
        await requestCancelContractService(requestData);
        dispatch(closeRequestCancelContractModal());
        openNotificationWithIcon('success', t('notification.submittedSuccessfully'));
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
      setError(false);
    }
  }, [requestCancelContractModal]);

  const columns = [
    {
      title: t('label.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('label.content'),
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const dataSource = [
    {
      key: '1',
      title: <b>ID</b>,
      content: requestInprogress.id,
    },
    {
      key: '2',
      title: <b>{t('label.status')}</b>,
      content: <ServiceStatus status={requestInprogress.status} />,
    },
    {
      key: '3',
      title: <b>{t('label.title')}</b>,
      content: requestInprogress.title,
    },
    {
      key: '4',
      title: <b>{t('placeholder.description')}</b>,
      content: requestInprogress.description,
    },
    ...(requestInprogress.status !== 'UNDER_REVIEW'
      ? [
          {
            key: '5',
            title: <b>{t('label.resolutionNote')}</b>,
            content: requestInprogress.resolution_note || '-',
          },
        ]
      : []),
  ];

  const handleCancelRequestService = async () => {
    try {
      await requestCancelExtraServices(requestInprogress.id);
      openNotificationWithIcon('success', t('notification.cancelRequestSuccessfully'));
      mutate('/extraServiceRequests');
      dispatch(closeRequestCancelContractModal());
    } catch (error) {
      console.log('ERROR AT CANCEL REQUEST SERVICES', error);
    }
  };

  return (
    <>
      {contextHolder}
      {isRequestCancel ? (
        <CustomModal
          width={600}
          nameOfModal={requestCancelContractModal}
          title="Extra Services Request"
          action={closeRequestCancelContractModal}
          footer={[
            <div className="btn-container" key="">
              <BaseButton
                style={{ width: 'auto' }}
                onClick={() => {
                  dispatch(closeRequestCancelContractModal());
                  dispatch(openShowLeaseModal({ extraServiceId: extraServiceId, leases: leases }));
                }}>
                {t('button.back')}
              </BaseButton>
              {requestInprogress?.progresses[0].status !== 'IN_PROGRESS' && (
                <Popconfirm
                  title={t('cancel.confirm')}
                  onConfirm={handleCancelRequestService}
                  okText={t('yes')}
                  cancelText={t('no')}
                  placement="bottom">
                  <BaseButton style={{ width: 'auto' }} type="primary">
                    {t('button.cancel-request')}
                  </BaseButton>
                </Popconfirm>
              )}
            </div>,
          ]}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </CustomModal>
      ) : (
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
            <div className="btn-container" key="">
              <BaseButton
                style={{ width: 'auto' }}
                key="back"
                onClick={() => {
                  if (typeOfRequest === 'service') {
                    dispatch(closeRequestCancelContractModal());
                    dispatch(
                      openShowLeaseModal({ extraServiceId: extraServiceId, leases: leases }),
                    );
                  } else {
                    dispatch(closeRequestCancelContractModal());
                    dispatch(openContractDetailModal({ contractId: contractId }));
                  }
                }}>
                {t('button.back')}
              </BaseButton>
              <BaseButton
                style={{ width: 'auto' }}
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={() => form.submit()}>
                {typeOfRequest === 'service'
                  ? t('button.request')
                  : t('button.requestCancelContract')}
              </BaseButton>
            </div>,
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
            {typeOfRequest !== 'service' ? (
              <Form.Item
                name={'reason'}
                rules={[{ required: true, message: t('validationRules.required.reason') }]}>
                <TextArea rows={4} placeholder={t('placeholder.reason')} maxLength={200} />
              </Form.Item>
            ) : (
              <Form.Item
                name={'description'}
                rules={[{ required: true, message: t('validationRules.required.description') }]}>
                <TextArea rows={4} placeholder={t('placeholder.description')} maxLength={200} />
              </Form.Item>
            )}
          </Form>
          {error && (
            <Alert
              message={t('api.error.waitForServiceConfirmation')}
              type="error"
              showIcon
              className="alert-response"
            />
          )}
        </CustomModal>
      )}
    </>
  );
};

export default RequestCancelConract;
