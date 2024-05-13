import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../../../../components/Typography';
import { Tag } from 'antd';

const PaymentType = ({ type }) => {
  const { t } = useTranslation();
  return (
    <div>
      {type === 'RESERVATION' ? (
        <Caption strong>
          <Tag color="#2db7f5">{t('type.' + type)}</Tag>
        </Caption>
      ) : type === 'DEPOSIT' ? (
        <Caption strong>
          <Tag color="#108ee9">{t('type.' + type)}</Tag>
        </Caption>
      ) : type === 'INVOICE' ? (
        <Caption strong>
          <Tag color="#87d068">{t('type.' + type)}</Tag>
        </Caption>
      ) : (
        <Caption strong>
          <Tag color="#000000">{t('type.' + type)}</Tag>
        </Caption>
      )}
    </div>
  );
};

export default PaymentType;
