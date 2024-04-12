import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../Typography';

const ReservationStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'PAYMENT_CANCELED' || status === 'CANCELED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="red">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : status === 'CONTRACT_UPLOADED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="green">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : status === 'PAYMENT_COMPLETE' || status === 'DEPOSITED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="blue">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="orange">
            {t('status.' + status)}
          </Tag>
        </Caption>
      )}
    </div>
  );
};

export default ReservationStatus;
