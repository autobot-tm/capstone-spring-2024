import { Input, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPage, setStatus } from '../../../../store/slices/reservationSlice';
import { useTranslation } from 'react-i18next';
import styles from './Filter.module.scss';
import { setContractPage, setContractStatus } from '../../../../store/slices/contractSlice';
import { setInvoicePage, setInvoiceStatus } from '../../../../store/slices/invoiceSlice';
import {
  setExtraServicesPage,
  setExtraServicesStatus,
} from '../../../../store/slices/extraServices.slice';

const Filter = ({ type }) => {
  const reservationStatus = useSelector(state => state.reservation.status);
  const contractStatus = useSelector(state => state.contract.status);
  const invoiceStatus = useSelector(state => state.invoice.status);
  const serviceStatus = useSelector(state => state.extraServices.status);
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

  const invoiceStatuses = [
    {
      label: t('status.all'),
      key: 'ALL',
    },
    {
      label: t('status.PENDING'),
      key: 'PENDING',
    },
    {
      label: t('status.PAID'),
      key: 'PAID',
    },
    {
      label: t('status.CANCELED'),
      key: 'CANCELED',
    },
    {
      label: t('status.EXPIRED'),
      key: 'EXPIRED',
    },
  ];
  const serviceStatuses = [
    {
      label: t('status.all'),
      key: 'ALL',
    },
    {
      label: t('status.UNDER_REVIEW'),
      key: 'UNDER_REVIEW',
    },
    // {
    //   label: t('status.IN_PROGRESS'),
    //   key: 'IN_PROGRESS',
    // },
    {
      label: t('status.REJECTED'),
      key: 'REJECTED',
    },
    {
      label: t('status.APPROVED'),
      key: 'APPROVED',
    },
    {
      label: t('status.CANCELED'),
      key: 'CANCELED',
    },
  ];
  const onClick = e => {
    if (type === 'reservation') {
      dispatch(setStatus({ status: e.key }));
      dispatch(setPage({ page: 1 }));
    } else if (type === 'contract') {
      dispatch(setContractStatus({ status: e.key }));
      dispatch(setContractPage({ page: 1 }));
    } else if (type === 'service') {
      dispatch(setExtraServicesStatus({ status: e.key }));
      dispatch(setExtraServicesPage({ page: 1 }));
    } else {
      dispatch(setInvoiceStatus({ status: e.key }));
      dispatch(setInvoicePage({ page: 1 }));
    }
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={
          type === 'reservation'
            ? [reservationStatus]
            : type === 'contract'
            ? [contractStatus]
            : type === 'service'
            ? [serviceStatus]
            : [invoiceStatus]
        }
        mode="horizontal"
        items={
          type === 'reservation'
            ? reservationStatuses
            : type === 'contract'
            ? contractStatuses
            : type === 'service'
            ? serviceStatuses
            : invoiceStatuses
        }
        className={styles.filterMenu}
      />
      <Menu
        onClick={onClick}
        selectedKeys={
          type === 'reservation'
            ? [reservationStatus]
            : type === 'contract'
            ? [contractStatus]
            : type === 'service'
            ? [serviceStatus]
            : [invoiceStatus]
        }
        mode="inline"
        items={
          type === 'reservation'
            ? reservationStatuses
            : type === 'contract'
            ? contractStatuses
            : type === 'service'
            ? serviceStatuses
            : invoiceStatuses
        }
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
