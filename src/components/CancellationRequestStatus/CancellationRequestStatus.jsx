import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CancellationRequestStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'APPROVED' ? (
        <Tag style={{ margin: 0 }} color="cyan">
          {t('status.' + status)}
        </Tag>
      ) : status === 'REJECTED' ? (
        <Tag style={{ margin: 0 }} color="red">
          {t('status.' + status)}
        </Tag>
      ) : (
        <Tag style={{ margin: 0 }} color="blue">
          {t('status.' + status)}
        </Tag>
      )}
    </div>
  );
};

export default CancellationRequestStatus;
