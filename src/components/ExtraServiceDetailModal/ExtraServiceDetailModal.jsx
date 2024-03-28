import './styles.scss';
import locationIcon from '../../assets/images/location.svg';
import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { closeExtraServiceRequestDetailModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { requestCancelExtraServices } from '../../services/apis/extra-services.service';
import { Avatar, Popconfirm, Table, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import ServiceStatus from '../../pages/ExtraServices/components/ServiceStatus/ServiceStatus';
import { mutate } from 'swr';
import { getLeaseByIdService } from '../../services/apis/contracts.service';
import { Caption, Paragraph } from '../Typography';

const ExtraServiceDetailModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [houseService, setHouseService] = useState({});
  const { extraServiceRequestDetailModal, extraServiceRequestDetail } = useSelector(
    state => state.modal,
  );
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    try {
      if (extraServiceRequestDetail?.lease_id) {
        getLeaseByIdService({ leaseId: extraServiceRequestDetail.lease_id }).then(response => {
          setHouseService(response?.reservation?.house);
        });
      }
    } catch (error) {
      console.warn('Error at get lease by id', error);
    }
  }, [extraServiceRequestDetail]);

  const handleCancelRequestService = async () => {
    try {
      await requestCancelExtraServices(extraServiceRequestDetail?.id);
      openNotificationWithIcon('success', t('notification.cancelRequestSuccessfully'));
      mutate(`getExtraServiceRequests?page=${1}&status=${'ALL'}`);
      dispatch(closeExtraServiceRequestDetailModal());
    } catch (error) {
      console.warn('ERROR AT CANCEL REQUEST SERVICES', error);
    }
  };

  const infoRequestHead = [
    {
      title: t('label.infoRequest'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('label.content'),
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const infoRequest = [
    {
      key: '1',
      title: <b>ID</b>,
      content: extraServiceRequestDetail?.id,
    },
    {
      key: '2',
      title: <b>{t('label.status')}</b>,
      content: <ServiceStatus status={extraServiceRequestDetail?.status} />,
    },
    {
      key: '3',
      title: <b>{t('label.title')}</b>,
      content: extraServiceRequestDetail?.title,
    },
    {
      key: '4',
      title: <b>{t('placeholder.description')}</b>,
      content: extraServiceRequestDetail?.description,
    },
    ...(extraServiceRequestDetail?.status !== 'UNDER_REVIEW'
      ? [
          {
            key: '5',
            title: <b>{t('label.resolutionNote')}</b>,
            content: extraServiceRequestDetail?.resolution_note,
          },
        ]
      : []),
  ];

  const isCancelDisabled = () => {
    const { status, progresses } = extraServiceRequestDetail;
    if (status === 'UNDER_REVIEW') {
      return true;
    }
    if (status === 'IN_PROGRESS') {
      return true;
    }
    if (status === 'APPROVED' && progresses && progresses[0]?.status !== 'IN_PROGRESS') {
      return true;
    }
    return false;
  };

  return (
    <>
      {contextHolder}
      <CustomModal
        width={700}
        nameOfModal={extraServiceRequestDetailModal}
        title={t('modal.esRequest')}
        action={closeExtraServiceRequestDetailModal}
        footer={[
          <div className="btn-container" key="">
            <BaseButton
              style={{ width: 'auto' }}
              onClick={() => {
                dispatch(closeExtraServiceRequestDetailModal());
              }}>
              {t('button.back')}
            </BaseButton>
            {isCancelDisabled() && (
              <Popconfirm
                title={t('cancel.confirm')}
                onConfirm={handleCancelRequestService}
                okText={t('yes')}
                cancelText={t('no')}
                placement="bottom">
                <BaseButton style={{ width: 'auto' }} type="primary">
                  {extraServiceRequestDetail?.status === 'APPROVED'
                    ? t('button.cancel-service')
                    : t('button.cancel-request')}
                </BaseButton>
              </Popconfirm>
            )}
          </div>,
        ]}>
        <Table dataSource={infoRequest} columns={infoRequestHead} pagination={false} />
        {houseService && (
          <>
            <div className="house-service-container">
              <Avatar src={houseService?.image_urls?.[0]} size={100} shape="square" />
              <div className="house-info">
                <Caption size={110} ellipsis classNames="d-block map">
                  <img src={locationIcon} alt="" />
                  {houseService?.address}
                </Caption>
                <Paragraph classNames="color-black" ellipsis strong>
                  {houseService?.name}
                </Paragraph>
              </div>
            </div>
          </>
        )}
      </CustomModal>
    </>
  );
};

export default ExtraServiceDetailModal;
