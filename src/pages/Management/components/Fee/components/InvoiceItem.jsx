import React from 'react';
import styles from './InvoiceItem.module.scss';
import { Caption, Paragraph, SubHeading } from '../../../../../components/Typography';
import InvoiceStatus from '../../../../../components/InvoiceStatus/InvoiceStatus';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openInvoiceDetailModal } from '../../../../../store/slices/modalSlice';
import { setInvoiceLoading } from '../../../../../store/slices/invoiceSlice';
import { formatCustomCurrency } from '../../../../../utils/number-seperator';

const InvoiceItem = ({ invoice }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div
      className={styles.invoiceItemCard}
      onClick={() => {
        dispatch(setInvoiceLoading({ loading: true }));
        dispatch(openInvoiceDetailModal({ invoiceId: invoice.id }));
      }}>
      <div className={styles.houseContainer}>
        <div className={styles.imageContainer}>
          <img src={invoice.lease.reservation.house.image_urls[0]} alt="" />
        </div>
        <div className={styles.houseContent}>
          <Caption size={140} strong ellipsis>
            {invoice.lease.reservation.house.name}
          </Caption>
          <Caption size={110} ellipsis>
            {invoice.lease.reservation.house.description}
          </Caption>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.descriptionContainer}>
            <SubHeading>{invoice.description}</SubHeading>
          </div>
          <div className={styles.descriptionContainer2}>
            <Paragraph>{invoice.description}</Paragraph>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <InvoiceStatus status={invoice.status} />
            <div>
              <Caption size={110}>{t('label.dueDate')}: </Caption>
              <Caption size={110} strong style={{ color: 'red' }}>
                {moment(invoice.due_date).format('DD/MM/YYYY')}
              </Caption>
            </div>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <Paragraph strong>{formatCustomCurrency(invoice.amount)}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
