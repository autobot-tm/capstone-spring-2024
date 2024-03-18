import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeContractDetailModal,
  openRequestCancelContractModal,
} from '../../store/slices/modalSlice';
import styles from './ContractDetail.module.scss';
import ContractStatus from '../ContractStatus.jsx/ContractStatus';
import { DownloadOutlined, LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getLeaseByIdService } from '../../services/apis/contracts.service';
import { setContractLoading } from '../../store/slices/contractSlice';
import { Button, Table } from 'antd';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Paragraph } from '../Typography';

const ContractDetail = () => {
  const { t } = useTranslation();
  const contractDetailModal = useSelector(state => state.modal.contractDetailModal);
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
  const dispatch = useDispatch();
  const loading = useSelector(state => state.contract.loading);
  const [showFile, setShowFile] = useState(false);
  const [showHouse, setShowHouse] = useState(false);
  const [showRenter, setShowRenter] = useState(false);
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
        dispatch(setContractLoading({ loading: false }));
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!contractDetailModal) {
      setShowHouse(false);
      setShowRenter(false);
      setShowFile(false);
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
            {!showFile ? `Show ${files.length} files` : `Hide ${files.length} Files`}
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
                  <div style={{ marginBottom: '5px' }}>{`Contract file ${index + 1}`}</div>
                  <Button
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      handleDownload(file);
                    }}>
                    Download
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

  return (
    <CustomModal
      width={650}
      nameOfModal={contractDetailModal}
      title={t('modal.contract')}
      action={closeContractDetailModal}
      footer={
        status === 'ACTIVE' && [
          <Button
            key=""
            onClick={() => {
              dispatch(openRequestCancelContractModal());
              dispatch(closeContractDetailModal());
            }}>
            {t('button.requestCancelContract')}
          </Button>,
        ]
      }>
      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingOutlined size="large" />
        </div>
      ) : (
        <>
          <Table pagination={false} columns={columns} dataSource={contractData} />
          <Button
            icon={!showHouse ? <PlusOutlined /> : <MinusOutlined />}
            type="text"
            block
            style={{ cursor: 'pointer', marginTop: '10px' }}
            onClick={() => {
              setShowHouse(!showHouse);
            }}>
            <Paragraph>{t('label.houseDetail')}</Paragraph>
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
            <Paragraph>{t('label.renterDetail')}</Paragraph>
          </Button>
          {showRenter && <Table pagination={false} columns={columns} dataSource={renterData} />}
        </>
      )}
    </CustomModal>
  );
};

export default ContractDetail;
