import React from 'react';
import { Caption } from '../Typography';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const InvoiceStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'EXPIRED' || status === 'CANCELED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="red">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : status === 'PAID' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="green">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : status === 'REPLACED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="magenta">
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

export default InvoiceStatus;
