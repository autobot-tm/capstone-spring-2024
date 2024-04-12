import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../../../../components/Typography';
import styles from './PaymentStatus.module.scss';

const PaymentStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <>
      {status === 'SUCCESS' ? (
        <div className={styles.statusContainer}>
          <div className={styles.greenDot}></div>
          <Caption strong size={140}>
            {t('status.' + status)}
          </Caption>
        </div>
      ) : status === 'FAILED' ? (
        <div className={styles.statusContainer}>
          <div className={styles.redDot}></div>
          <Caption strong size={140}>
            {t('status.' + status)}
          </Caption>
        </div>
      ) : (
        <div className={styles.statusContainer}>
          <div className={styles.orangeDot}></div>
          <Caption strong size={140}>
            {t('status.' + status)}
          </Caption>
        </div>
      )}
    </>
  );
};

export default PaymentStatus;
