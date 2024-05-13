import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeReservationDetailModal } from '../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import { getReservationByIdService } from '../../services/apis/reservations.service';
import styles from './ReservationDetail.module.scss';
import ReservationStatus from '../ReservationStatus/ReservationStatus';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { setLoading } from '../../store/slices/reservationSlice';
import { LoadingOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { Paragraph } from '../Typography';
const ReservationDetail = () => {
  const reservationDetailModal = useSelector(state => state.modal.reservationDetailModal);
  const reservationId = useSelector(state => state.modal.reservationId);
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [moveInDay, setMoveInDay] = useState('');
  const [totalMonths, setTotalMonths] = useState('');
  const [reservationFee, setReservationFee] = useState('');
  const [refundPercent, setRefundPercent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [houseName, setHouseName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [showHouse, setShowHouse] = useState(false);
  const [showRenter, setShowRenter] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.reservation.loading);

  useEffect(() => {
    if (reservationId) {
      getReservationByIdService({ reservationId })
        .then(response => {
          setId(response.id);
          setStatus(response.status);
          setMoveInDay(response.expected_move_in_date);
          setTotalMonths(response.total_months);
          setReservationFee(response.fee);
          setRefundPercent(response.refund_percentage);
          setFirstName(response.renter.first_name);
          setLastName(response.renter.last_name);
          setEmail(response.renter.email);
          setHouseName(response.house.name);
          setAddress(response.house.address);
          setPrice(response.price_per_month);
          dispatch(setLoading({ loading: false }));
        })
        .catch(error => {
          console.error('Error fetching reservation data:', error);
          dispatch(setLoading({ loading: false }));
        });
    }
  }, [reservationId, loading, dispatch]);

  useEffect(() => {
    if (!reservationDetailModal) {
      setShowHouse(false);
      setShowRenter(false);
    }
  }, [reservationDetailModal]);

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

  const reservationData = [
    {
      key: '1',
      title: <b>ID</b>,
      content: id,
    },
    {
      key: '2',
      title: <b>{t('label.paymentStatus')}</b>,
      content: (
        <div>
          <ReservationStatus status={status} />
        </div>
      ),
    },
    {
      key: '3',
      title: <b>{t('label.moveInDay')}</b>,
      content: moveInDay,
    },
    {
      key: '4',
      title: <b>{t('label.totalMonths')}</b>,
      content: `${totalMonths} ${t('detail-house.months')}`,
    },
    {
      key: '5',
      title: <b>{t('label.reservationFee')}</b>,
      content: formatCustomCurrency(reservationFee),
    },
    {
      key: '6',
      title: <b>{t('label.refundPercent')}</b>,
      content: refundPercent + '%',
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
      title: <b>{t('label.rentalPricePerMonth')}</b>,
      content: formatCustomCurrency(price) + ' / month',
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
    <div>
      <CustomModal
        width={650}
        nameOfModal={reservationDetailModal}
        title={t('modal.reservation')}
        action={closeReservationDetailModal}
        footer={null}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <LoadingOutlined size="large" />
          </div>
        ) : (
          <>
            <Table pagination={false} columns={columns} dataSource={reservationData} />
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
    </div>
  );
};

export default ReservationDetail;
