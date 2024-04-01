import { Tag } from 'antd';
import { Caption } from '../../../../components/Typography';
import './styles.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'UNDER_REVIEW' ? (
        <Caption strong>
          <Tag color="blue">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'IN_PROGRESS' ? (
        <Caption strong>
          <Tag color="orange">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'REJECTED' ? (
        <Caption strong>
          <Tag color="gold">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'CANCELED' ? (
        <Caption strong>
          <Tag color="red">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'APPROVED' ? (
        <Caption strong>
          <Tag color="cyan">{t('status.' + status)}</Tag>
        </Caption>
      ) : (
        <Caption strong>
          <Tag>{t('status.' + status)}</Tag>
        </Caption>
      )}
    </div>
  );
};

export default ServiceStatus;
