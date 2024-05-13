import './styles.scss';
import locationIcon from '../../assets/images/location.svg';
import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { closeExtraServiceRequestDetailModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { requestCancelExtraServices } from '../../services/apis/extra-services.service';
import { Avatar, Button, Popconfirm, Table, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import BaseButton from '../Buttons/BaseButtons/BaseButton';
import ServiceStatus from '../../pages/ExtraServices/components/ServiceStatus/ServiceStatus';
import { mutate } from 'swr';
import { getLeaseByIdService } from '../../services/apis/contracts.service';
import { Caption, Paragraph, SubHeading } from '../Typography';
import { setExtraServicesLoading, setExtraServicesStatus } from '../../store/slices/extraServices.slice';
import { CaretDownOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { ERROR_TRANS_KEYS } from '../../constants/error.constant';

const ExtraServiceDetailModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [houseService, setHouseService] = useState({});
  const [selectedId, setSelectedId] = useState('');
  const { extraServiceRequestDetailModal, extraServiceRequestDetail } = useSelector(state => state.modal);
  const loading = useSelector(state => state.extraServices.loading);
  const [showFile, setShowFile] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    try {
      if (extraServiceRequestDetail?.lease_id) {
        getLeaseByIdService({ leaseId: extraServiceRequestDetail.lease_id }).then(response => {
          setHouseService(response?.reservation?.house);
          dispatch(setExtraServicesLoading({ loading: false }));
        });
      }
    } catch (error) {
      console.warn('Error at get lease by id', error);
    }
  }, [loading, extraServiceRequestDetailModal]);

  const handleCancelRequestService = async () => {
    try {
      await requestCancelExtraServices(extraServiceRequestDetail?.id);
      openNotificationWithIcon('success', t('notification.cancelRequest'), t('notification.cancelRequestSuccessfully'));
      mutate(`getExtraServiceRequests?page=${1}&status=${'ALL'}`);
      dispatch(setExtraServicesStatus({ status: 'ALL' }));
      dispatch(closeExtraServiceRequestDetailModal());
    } catch (error) {
      if (error === ERROR_TRANS_KEYS.EXTRA_SERVICE_REQUEST_PROGRESS_NOT_CANCELABLE) {
        console.warn('ERROR AT CANCEL REQUEST SERVICES', error);
        return openNotificationWithIcon(
          'warning',
          t('notification.cancelRequest'),
          t('notification.cancelRequestError'),
        );
      }
      console.warn('ERROR AT CANCEL REQUEST SERVICES', error);
    }
  };
  const handleDownload = file => {
    const fileUrl = file;
    const link = document.createElement('a');
    link.href = 'https://' + fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const days = extraServiceRequestDetail?.schedule?.days_of_month?.map((day, index) =>
    index === 0 ? `${day}` : ` - ${day}`,
  );
  const result = days?.join(' ');
  const daysOfWeek = extraServiceRequestDetail?.schedule?.days_of_week?.map((day, index) =>
    index === 0 ? `${day}` : ` - ${day}`,
  );
  const resultOfWeek = daysOfWeek?.join(' ');
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
            content: extraServiceRequestDetail?.resolution_note || '-',
          },
        ]
      : []),
    ...(extraServiceRequestDetail?.schedule?.period
      ? [
          {
            key: '6',
            title: <b>{t('schedule')}</b>,
            content: extraServiceRequestDetail?.schedule?.period,
          },
          {
            key: '7',
            title: (
              <b>{extraServiceRequestDetail?.schedule?.period === 'WEEKLY' ? t('daysOfWeek') : t('daysOfMonth')}</b>
            ),
            content: extraServiceRequestDetail?.schedule?.period === 'WEEKLY' ? resultOfWeek : result,
          },
        ]
      : []),
  ];
  const infoProgressesHead = [
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
  const { status, progresses } = extraServiceRequestDetail;
  const isCancelDisabled = () => {
    if (status === 'UNDER_REVIEW') {
      return true;
    }
    if (status === 'IN_PROGRESS') {
      return true;
    }
    if (status === 'APPROVED' && progresses && progresses?.[progresses?.length - 1]?.status !== 'IN_PROGRESS') {
      return true;
    }
    return false;
  };
  const isShowProgresses = status !== 'IN_PROGRESS' && progresses && progresses.length > 0;
  const renderProgressesOfESR = () => {
    return (
      isShowProgresses && (
        <>
          <SubHeading strong>{t('progresses')}</SubHeading>
          {progresses && progresses.length > 0 ? (
            progresses
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map(progress => {
                return (
                  <div key={progress.id}>
                    <BaseButton
                      onClick={() => setSelectedId(progress?.id)}
                      icon={<ServiceStatus status={progress?.status} />}
                      style={{
                        border: '0.5px dashed #ccc',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}>
                      <Caption strong>{moment(progress.created_at).format('H:mm -  DD/MM/YYYY')}</Caption>
                      <CaretDownOutlined />
                    </BaseButton>
                    {selectedId === progress?.id && (
                      <Table
                        pagination={false}
                        columns={infoProgressesHead}
                        dataSource={[
                          {
                            key: '1',
                            title: <b>ID</b>,
                            content: progress?.id,
                          },
                          {
                            key: '2',
                            title: <b>{t('label.description')}</b>,
                            content: progress?.description,
                          },
                          ...(progress?.status !== 'IN_PROGRESS'
                            ? [
                                {
                                  key: '3',
                                  title: <b>{t('label.note')}</b>,
                                  content: progress?.note || '-',
                                },
                                {
                                  key: '4',
                                  title: <b>{t('RESERVATION.total-fee')}</b>,
                                  content: formatCustomCurrency(progress?.total_fee) || '-',
                                },
                                {
                                  key: '5',
                                  title: <b>{t('assigned-at')}</b>,
                                  content:
                                    progress?.assigned_at && moment(progress.assigned_at).isValid()
                                      ? moment(progress.assigned_at).format('H:mm - DD/MM/YYYY')
                                      : '-',
                                },
                                {
                                  key: '6',
                                  title: <b>{t('completed-at')}</b>,
                                  content:
                                    progress?.assigned_at && moment(progress.assigned_at).isValid()
                                      ? moment(progress.completed_at).format('H:mm - DD/MM/YYYY')
                                      : '-',
                                },
                                {
                                  key: '7',
                                  title: <b>{t('handled-by-user')}</b>,
                                  content: progress?.handled_by_user?.email || '-',
                                },
                                {
                                  key: '8',
                                  title: <b>{t('label.files')}</b>,
                                  content: (
                                    <>
                                      {progress?.evidence_urls ? (
                                        <Button
                                          type="text"
                                          onClick={() => {
                                            setShowFile(!showFile);
                                          }}>
                                          {!showFile
                                            ? `${t('show')} ${progress?.evidence_urls?.length} ${t(
                                                'label.files',
                                              ).toLocaleLowerCase()}`
                                            : `${t('label.hide')} ${progress?.evidence_urls?.length} ${t(
                                                'label.files',
                                              ).toLocaleLowerCase()}`}
                                        </Button>
                                      ) : (
                                        '-'
                                      )}

                                      {showFile &&
                                        progress?.evidence_urls?.map((file, index) => (
                                          <div
                                            key={index}
                                            style={{
                                              margin: '10px 0 20px 0',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '8px',
                                            }}>
                                            <div style={{ marginBottom: '5px' }}>{file.slice(73)}</div>
                                            <Button
                                              size="small"
                                              icon={<DownloadOutlined />}
                                              onClick={() => {
                                                handleDownload(file);
                                              }}>
                                              {t('download')}
                                            </Button>
                                          </div>
                                        ))}
                                    </>
                                  ),
                                },
                              ]
                            : []),
                        ]}
                      />
                    )}
                  </div>
                );
              })
          ) : (
            <p> {t('no-progresses')}</p>
          )}
        </>
      )
    );
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
        {loading ? (
          <div
            style={{
              height: 440,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoadingOutlined size="large" />
          </div>
        ) : (
          <div className="es-detail-modal">
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
            {renderProgressesOfESR()}
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default ExtraServiceDetailModal;
