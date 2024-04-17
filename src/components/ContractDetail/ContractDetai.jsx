import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeContractDetailModal,
  openReportIssuesModal,
  openRequestCancelContractModal,
  openReviewHouseModal,
} from '../../store/slices/modalSlice';
import styles from './ContractDetail.module.scss';
import ContractStatus from '../ContractStatus.jsx/ContractStatus';
import { CaretDownOutlined, DownloadOutlined, LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getLeaseByIdService } from '../../services/apis/contracts.service';
import { setContractLoading } from '../../store/slices/contractSlice';
import { Button, Col, Empty, Row, Table, Tabs } from 'antd';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Caption, Paragraph } from '../Typography';
import moment from 'moment';
import CancellationRequestStatus from '../CancellationRequestStatus/CancellationRequestStatus';
import BaseButton from '../Buttons/BaseButtons/BaseButton';

const ContractDetail = () => {
  const { t } = useTranslation();
  const { contractDetailModal, actionType } = useSelector(state => state.modal);
  const leaseId = useSelector(state => state.modal.contractId);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [files, setFiles] = useState([]);
  const [houseName, setHouseName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.contract.loading);
  const [showFile, setShowFile] = useState(false);
  const [showHouse, setShowHouse] = useState(false);
  const [showRenter, setShowRenter] = useState(false);
  const [isShowRequest, setIsShowRequet] = useState('');
  const [houseID, setHouseID] = useState('');

  useEffect(() => {
    if (leaseId) {
      getLeaseByIdService({ leaseId }).then(response => {
        setId(response.id);
        setStatus(response.status);
        setStartDate(response.move_in_date);
        setEndDate(response.expiration_date);
        setFiles(response.contract_file_urls);
        setHouseName(response.reservation.house.name);
        setAddress(response.reservation.house.address);
        setPrice(response.reservation.house.pricing_policies[0].price_per_month);
        setFirstName(response.reservation.renter.first_name);
        setLastName(response.reservation.renter.last_name);
        setEmail(response.reservation.renter.email);
        setRequests(response.cancelation_requests);
        setHouseID(response.reservation.house.id);
        dispatch(setContractLoading({ loading: false }));
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!contractDetailModal) {
      setShowHouse(false);
      setShowRenter(false);
      setShowFile(false);
      setIsShowRequet('');
    }
  }, [contractDetailModal]);

  const handleDownload = file => {
    const fileUrl = file;
    const link = document.createElement('a');
    link.href = 'https://' + fileUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const contractData = [
    {
      key: '1',
      title: <b>{'ID'}</b>,
      content: id,
    },
    {
      key: '2',
      title: <b>{t('label.paymentStatus')}</b>,
      content: (
        <div>
          <ContractStatus status={status} />
        </div>
      ),
    },
    {
      key: '3',
      title: <b>{t('label.startDate')}</b>,
      content: startDate,
    },
    {
      key: '4',
      title: <b>{t('label.endDate')}</b>,
      content: endDate,
    },
    {
      key: '5',
      title: <b>{t('label.files')}</b>,
      content: (
        <>
          <Button
            type="text"
            onClick={() => {
              setShowFile(!showFile);
            }}>
            {!showFile
              ? `${t('show')} ${files.length} ${t('label.files').toLocaleLowerCase()}`
              : `${t('label.hide')} ${files.length} ${t('label.files').toLocaleLowerCase()}`}
          </Button>

          {showFile && (
            <div>
              {files.map((file, index) => (
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
            </div>
          )}
        </>
      ),
    },
  ];

  const houseData = [
    {
      key: '1',
      title: <b>{t('label.houseName')}</b>,
      content: houseName,
    },
    {
      key: '2',
      title: <b>{t('label.address')}</b>,
      content: address,
    },
    {
      key: '3',
      title: <b>{t('label.price')}</b>,
      content: formatCustomCurrency(price),
    },
  ];

  const renterData = [
    {
      key: '1',
      title: <b>{t('label.name')}</b>,
      content: firstName && lastName ? firstName + ' ' + lastName : '--',
    },
    {
      key: '2',
      title: <b>{t('label.email')}</b>,
      content: email,
    },
  ];

  const items = [
    {
      key: '1',
      label: t('label.info'),
      children: (
        <>
          <Table pagination={false} columns={columns} dataSource={contractData} />
          <Button
            icon={!showHouse ? <PlusOutlined style={{ fontWeight: 600 }} /> : <MinusOutlined />}
            type="text"
            block
            style={{ cursor: 'pointer', marginTop: '10px' }}
            onClick={() => {
              setShowHouse(!showHouse);
            }}>
            <Paragraph strong>{t('label.houseDetail')}</Paragraph>
          </Button>
          {showHouse && <Table pagination={false} columns={columns} dataSource={houseData} />}

          <Button
            icon={!showRenter ? <PlusOutlined /> : <MinusOutlined />}
            type="text"
            block
            style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '8px' }}
            onClick={() => {
              setShowRenter(!showRenter);
            }}>
            <Paragraph strong>{t('label.renterDetail')}</Paragraph>
          </Button>
          {showRenter && <Table pagination={false} columns={columns} dataSource={renterData} />}
        </>
      ),
    },
    {
      key: '2',
      label: t('label.viewYourCancellationRequest'),
      children: (
        <>
          {requests?.length > 0 ? (
            requests
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((request, index) => {
                return (
                  <div key={index} style={{ wdith: '100%' }}>
                    <Button
                      size="large"
                      icon={<CancellationRequestStatus status={request.status} />}
                      type="text"
                      className={styles.itemCancellationContract}
                      onClick={() => {
                        setIsShowRequet(request.id);
                      }}>
                      <Caption strong>{moment(request.created_at).format('H:mm -  DD/MM/YYYY')}</Caption>
                      <Caption size={140} elipsis strong>
                        {'(' + request.title + ')'}
                      </Caption>
                      <CaretDownOutlined />
                    </Button>
                    {isShowRequest === request.id && (
                      <Table
                        pagination={false}
                        columns={columns}
                        dataSource={[
                          {
                            key: '1',
                            title: <b>{t('label.id')}</b>,
                            content: request.id,
                          },
                          {
                            key: '2',
                            title: <b>{t('label.status')}</b>,
                            content: <CancellationRequestStatus status={request.status} />,
                          },
                          {
                            key: '3',
                            title: <b>{t('label.title')}</b>,
                            content: request.title,
                          },
                          {
                            key: '4',
                            title: <b>{t('label.reason')}</b>,
                            content: request.reason,
                          },
                          {
                            key: '5',
                            title: <b>{t('label.resolutionNote')}</b>,
                            content: request.resolution_note,
                          },
                        ]}
                      />
                    )}
                  </div>
                );
              })
          ) : (
            <Empty />
          )}
        </>
      ),
    },
  ];

  return (
    <CustomModal
      width={700}
      nameOfModal={contractDetailModal}
      title={t('modal.contract')}
      action={closeContractDetailModal}
      footer={
        (status === 'ACTIVE' && (
          <Row style={{ marginTop: 40 }} gutter={[8, 8]} align="center">
            <Col xs={24}>
              <BaseButton
                size="large"
                style={{ backgroundColor: '#d2dae2' }}
                onClick={() => {
                  dispatch(openReportIssuesModal({ categoryIssue: 'LIVING_ISSUE' }));
                  dispatch(closeContractDetailModal());
                }}>
                <Caption size={140} classNames="color-black" strong>
                  {t('reportlivingissue')}
                </Caption>
              </BaseButton>
            </Col>
            <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BaseButton
                style={{ borderColor: '#c23616' }}
                size="large"
                onClick={() => {
                  dispatch(openRequestCancelContractModal({ contractId: leaseId, typeOfRequest: 'contract' }));
                  dispatch(closeContractDetailModal());
                }}>
                <Caption size={140} style={{ color: '#c23616' }} strong>
                  {t('button.requestCancelContract')}
                </Caption>
              </BaseButton>
            </Col>
          </Row>
        )) ||
        ((status === 'EXPIRED' || status === 'CANCELED') && (
          <Row style={{ marginTop: 40 }} gutter={[8, 8]} align="center">
            <Col xs={24}>
              <BaseButton
                size="large"
                style={{ backgroundColor: '#f8a01e' }}
                onClick={() => {
                  dispatch(openReviewHouseModal({ houseID: houseID }));
                  console.log('House ID Component: ', houseID);
                  dispatch(closeContractDetailModal());
                }}>
                <Caption size={140} classNames="color-black" strong>
                  {t('button.addHomeReview')}
                </Caption>
              </BaseButton>
            </Col>
          </Row>
        ))
      }>
      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingOutlined size="large" />
        </div>
      ) : (
        <Tabs defaultActiveKey={actionType === 'LEASE_CANCELATION_REQUEST' ? '2' : '1'} items={items} />
      )}
    </CustomModal>
  );
};

export default ContractDetail;
