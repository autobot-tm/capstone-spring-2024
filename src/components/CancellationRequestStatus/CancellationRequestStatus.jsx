import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../Typography';

const CancellationRequestStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'APPROVED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="cyan">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : status === 'REJECTED' ? (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="red">
            {t('status.' + status)}
          </Tag>
        </Caption>
      ) : (
        <Caption strong>
          <Tag style={{ margin: 0 }} color="blue">
            {t('status.' + status)}
          </Tag>
        </Caption>
      )}
    </div>
  );
};

export default CancellationRequestStatus;
