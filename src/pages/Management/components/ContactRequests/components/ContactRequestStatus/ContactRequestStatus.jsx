import React from 'react';
import { useTranslation } from 'react-i18next';
import { Caption } from '../../../../../../components/Typography';
import { Tag } from 'antd';

const ContactRequestStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div>
      {status === 'APPROVED' ? (
        <Caption strong>
          <Tag color="cyan">{t('status.' + status)}</Tag>
        </Caption>
      ) : status === 'REJECTED' ? (
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

export default ContactRequestStatus;
