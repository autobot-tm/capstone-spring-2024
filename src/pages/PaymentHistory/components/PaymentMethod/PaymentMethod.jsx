import { CreditCardOutlined, QrcodeOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentMethod = ({ method }) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {method === 'ATM' ? <CreditCardOutlined /> : method === 'QR_CODE' ? <QrcodeOutlined /> : null}
      {method && t('paymentMethod.' + method)}
    </div>
  );
};

export default PaymentMethod;
