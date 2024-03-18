import { Input, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPage, setStatus } from '../../../../store/slices/reservationSlice';
import { useTranslation } from 'react-i18next';
import styles from './Filter.module.scss';
import { setContractPage, setContractStatus } from '../../../../store/slices/contractSlice';

const Filter = ({ type }) => {
  const reservationStatus = useSelector(state => state.reservation.status);
  const contractStatus = useSelector(state => state.contract.status);
  const name = useSelector(state => state.reservation.name);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationStatuses = [
    {
      label: t('status.all'),
      key: 'ALL',
    },
    {
      label: t('status.PAYMENT_PENDING'),
      key: 'PAYMENT_PENDING',
    },
    {
      label: t('status.PAYMENT_CANCELED'),
      key: 'PAYMENT_CANCELED',
    },
    {
      label: t('status.PAYMENT_COMPLETE'),
      key: 'PAYMENT_COMPLETE',
    },
    {
      label: t('status.CANCELED'),
      key: 'CANCELED',
    },
    {
      label: t('status.DEPOSITED'),
      key: 'DEPOSITED',
    },
    {
      label: t('status.CONTRACT_UPLOADED'),
      key: 'CONTRACT_UPLOADED',
    },
  ];
  const contractStatuses = [
    {
      label: t('status.all'),
      key: 'ALL',
    },
    {
      label: t('status.ACTIVE'),
      key: 'ACTIVE',
    },
    {
      label: t('status.EXPIRED'),
      key: 'EXPIRED',
    },
    {
      label: t('status.CANCELED'),
      key: 'CANCELED',
    },
    {
      label: t('status.PENDING_CANCELATION_APPROVAL'),
      key: 'PENDING_CANCELATION_APPROVAL',
    },
  ];
  const onClick = e => {
    if (type === 'reservation') {
      dispatch(setStatus({ status: e.key }));
      dispatch(setPage({ page: 1 }));
    } else {
      dispatch(setContractStatus({ status: e.key }));
      dispatch(setContractPage({ page: 1 }));
    }
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={type === 'reservation' ? [reservationStatus] : [contractStatus]}
        mode="horizontal"
        items={type === 'reservation' ? reservationStatuses : contractStatuses}
        className={styles.filterMenu}
      />
      <Menu
        onClick={onClick}
        selectedKeys={type === 'reservation' ? [reservationStatus] : [contractStatus]}
        mode="inline"
        items={type === 'reservation' ? reservationStatuses : contractStatuses}
        className={styles.filterMenu2}
      />
      {type === 'reservation' && (
        <Input
          placeholder={t('placeholder.searchHouse')}
          type="text"
          className={styles.input}
          value={name}
          onChange={e => {
            dispatch(setName({ name: e.target.value }));
            dispatch(setPage({ page: 1 }));
          }}
        />
      )}
    </div>
  );
};

export default Filter;
