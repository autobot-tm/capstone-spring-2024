import { Input, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPage, setStatus } from '../../../../store/slices/reservationSlice';
import { useTranslation } from 'react-i18next';
import styles from './Filter.module.scss';
import { setContractPage, setContractStatus } from '../../../../store/slices/contractSlice';
import { setInvoicePage, setInvoiceStatus } from '../../../../store/slices/invoiceSlice';
import { setExtraServicesPage, setExtraServicesStatus } from '../../../../store/slices/extraServices.slice';
import { Paragraph } from '../../../../components/Typography';
import { setIssuePage, setIssueStatus } from '../../../../store/slices/issueSlice';

const Filter = ({ type }) => {
  const reservationStatus = useSelector(state => state.reservation.status);
  const contractStatus = useSelector(state => state.contract.status);
  const invoiceStatus = useSelector(state => state.invoice.status);
  const serviceStatus = useSelector(state => state.extraServices.status);
  const issueStatus = useSelector(state => state.issue.status);
  const name = useSelector(state => state.reservation.name);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationStatuses = [
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.all')}
        </Paragraph>
      ),
      key: 'ALL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PAYMENT_PENDING')}
        </Paragraph>
      ),
      key: 'PAYMENT_PENDING',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PAYMENT_CANCELED')}
        </Paragraph>
      ),
      key: 'PAYMENT_CANCELED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PAYMENT_COMPLETE')}
        </Paragraph>
      ),
      key: 'PAYMENT_COMPLETE',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.CANCELED')}
        </Paragraph>
      ),
      key: 'CANCELED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.DEPOSITED')}
        </Paragraph>
      ),
      key: 'DEPOSITED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.CONTRACT_UPLOADED')}
        </Paragraph>
      ),
      key: 'CONTRACT_UPLOADED',
    },
  ];
  const contractStatuses = [
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.all')}
        </Paragraph>
      ),
      key: 'ALL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.ACTIVE')}
        </Paragraph>
      ),
      key: 'ACTIVE',
    },

    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PENDING_CANCELATION_APPROVAL')}
        </Paragraph>
      ),
      key: 'PENDING_CANCELATION_APPROVAL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.CANCELED')}
        </Paragraph>
      ),
      key: 'CANCELED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.EXPIRED')}
        </Paragraph>
      ),
      key: 'EXPIRED',
    },
  ];

  const invoiceStatuses = [
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.all')}
        </Paragraph>
      ),
      key: 'ALL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PENDING')}
        </Paragraph>
      ),
      key: 'PENDING',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.PAID')}
        </Paragraph>
      ),
      key: 'PAID',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.REPLACED')}
        </Paragraph>
      ),
      key: 'REPLACED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.EXPIRED')}
        </Paragraph>
      ),
      key: 'EXPIRED',
    },
  ];
  const serviceStatuses = [
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.all')}
        </Paragraph>
      ),
      key: 'ALL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.UNDER_REVIEW')}
        </Paragraph>
      ),
      key: 'UNDER_REVIEW',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.REJECTED')}
        </Paragraph>
      ),
      key: 'REJECTED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.APPROVED')}
        </Paragraph>
      ),
      key: 'APPROVED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.CANCELED')}
        </Paragraph>
      ),
      key: 'CANCELED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.COMPLETED')}
        </Paragraph>
      ),
      key: 'COMPLETED',
    },
  ];

  const contactStatuses = [
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.all')}
        </Paragraph>
      ),
      key: 'ALL',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.UNDER_REVIEW')}
        </Paragraph>
      ),
      key: 'UNDER_REVIEW',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.REJECTED')}
        </Paragraph>
      ),
      key: 'REJECTED',
    },
    {
      label: (
        <Paragraph classNames="color-black" strong>
          {t('status.APPROVED')}
        </Paragraph>
      ),
      key: 'APPROVED',
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
    } else if (type === 'invoice') {
      dispatch(setInvoiceStatus({ status: e.key }));
      dispatch(setInvoicePage({ page: 1 }));
    } else {
      dispatch(setIssueStatus({ status: e.key }));
      dispatch(setIssuePage({ page: 1 }));
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
            : type === 'invoice'
            ? [invoiceStatus]
            : [issueStatus]
        }
        mode="horizontal"
        items={
          type === 'reservation'
            ? reservationStatuses
            : type === 'contract'
            ? contractStatuses
            : type === 'service'
            ? serviceStatuses
            : type === 'invoice'
            ? invoiceStatuses
            : contactStatuses
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
            : type === 'invoice'
            ? [invoiceStatus]
            : [issueStatus]
        }
        mode="inline"
        items={
          type === 'reservation'
            ? reservationStatuses
            : type === 'contract'
            ? contractStatuses
            : type === 'service'
            ? serviceStatuses
            : type === 'invoice'
            ? invoiceStatuses
            : contactStatuses
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
