import React from 'react';
import styles from './InvoiceItem.module.scss';
// import { Caption, Paragraph, SubHeading } from '../../../../../components/Typography';
import InvoiceStatus from '../../../../../components/InvoiceStatus/InvoiceStatus';
// import moment from 'moment';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openInvoiceDetailModal } from '../../../../../store/slices/modalSlice';
import { setInvoiceLoading } from '../../../../../store/slices/invoiceSlice';
// import { formatCustomCurrency } from '../../../../../utils/number-seperator';
import { Caption } from '../../../../../components/Typography/Caption/Caption';
import { SubHeading } from '../../../../../components/Typography';

const InvoiceItem = ({ invoice, t }) => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={styles.invoiceItemCard}
        onClick={() => {
          dispatch(setInvoiceLoading({ loading: true }));
          dispatch(openInvoiceDetailModal({ invoiceId: invoice.id }));
        }}>
        <div className={styles.cardImgContainer}>
          <img alt=".." src={invoice?.lease.reservation?.house?.image_urls[0]} />
        </div>
        <div className={styles.invoiceContentCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Caption ellipsis classNames="color-black" size={140}>
              {t('placeholder.type')}: <b> {invoice?.type === 'RENTAL_FEE' ? t('label.rentalFee') : 'Other Fee'}</b>
            </Caption>
            <InvoiceStatus status={invoice?.status} />
          </div>
          <SubHeading classNames="d-block" strong>
            {invoice?.description}{' '}
          </SubHeading>
          <Caption ellipsis size={140}>
            {t('label.dueDate')}: <b style={{ color: 'red' }}>{invoice?.due_date}</b>
          </Caption>
        </div>
      </div>
    </>
  );
};

export default InvoiceItem;
