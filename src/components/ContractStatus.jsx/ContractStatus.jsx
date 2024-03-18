import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ContractStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'ACTIVE' ? (
        <Tag style={{ margin: 0 }} color="cyan">
          {t('status.' + status)}
        </Tag>
      ) : status === 'EXPIRED' || status === 'CANCELED' ? (
        <Tag style={{ margin: 0 }} color="red">
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

export default ContractStatus;
