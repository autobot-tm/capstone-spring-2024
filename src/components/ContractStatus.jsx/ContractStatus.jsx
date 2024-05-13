import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../Typography';

const ContractStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'ACTIVE' ? (
        <Caption strong>
          <Tag color="cyan">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'EXPIRED' || status === 'CANCELED' ? (
        <Caption strong>
          <Tag color="red">{t('status.' + status)}</Tag>
        </Caption>
      ) : (
        <Caption strong>
          <Tag color="orange">{t('status.' + status)}</Tag>
        </Caption>
      )}
    </div>
  );
};

export default ContractStatus;
