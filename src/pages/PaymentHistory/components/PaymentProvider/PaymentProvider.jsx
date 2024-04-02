import React from 'react';
import styles from './PaymentProvider.module.scss';
import vnpayLogo from '../../../../assets/images/vnpay.png';

const PaymentProvider = ({ provider }) => {
  return (
    <div className={styles.providerContainer}>
      {provider === 'VNPAY' ? <img src={vnpayLogo} /> : null}
    </div>
  );
};

export default PaymentProvider;
