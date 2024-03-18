import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ReservationStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'PAYMENT_CANCELED' || status === 'CANCELED' ? (
        <Tag style={{ margin: 0 }} color="red">
          {t('status.' + status)}
        </Tag>
      ) : status === 'CONTRACT_UPLOADED' ? (
        <Tag style={{ margin: 0 }} color="green">
          {t('status.' + status)}
        </Tag>
      ) : status === 'PAYMENT_COMPLETE' || status === 'DEPOSITED' ? (
        <Tag style={{ margin: 0 }} color="blue">
          {t('status.' + status)}
        </Tag>
      ) : (
        <Tag style={{ margin: 0 }} color="orange">
          {t('status.' + status)}
        </Tag>
      )}
    </div>
  );
};

export default ReservationStatus;
