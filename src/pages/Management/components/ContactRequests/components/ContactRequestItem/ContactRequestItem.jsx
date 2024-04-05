import { Card } from 'antd';
import React from 'react';
import styles from './ContactRequestItem.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Paragraph, SubHeading } from '../../../../../../components/Typography';
import ContactRequestStatus from '../ContactRequestStatus/ContactRequestStatus';
import { useDispatch } from 'react-redux';
import { openContactRequestDetailModal } from '../../../../../../store/slices/modalSlice';
import { setIssueLoading } from '../../../../../../store/slices/issueSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const ContactRequestItem = ({ issue }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Card
      hoverable
      style={{ marginBottom: '20px' }}
      onClick={() => {
        dispatch(setIssueLoading({ loading: true }));
        dispatch(openContactRequestDetailModal({ category: issue.category, issueId: issue.id }));
      }}>
      <div className={styles.cardContainer}>
        <ExclamationCircleOutlined style={{ fontSize: '30px' }} />
        <div className={styles.contactRequestContainer}>
          <div className={styles.categoryContainer}>
            <SubHeading strong>
              {issue.category === 'INVOICE_ISSUE'
                ? t('category.invoiceIssue')
                : issue.category === 'LIVING_ISSUE'
                ? t('category.livingIssue')
                : 'Other'}
            </SubHeading>
          </div>
          <div>
            <Paragraph ellipsis>
              {t('label.description')}: {issue.description}
            </Paragraph>
          </div>
          <div>
            <Paragraph ellipsis>
              {t('label.createdAt')}: {moment(issue.created_at).format('H:mm -  DD/MM/YYYY')}
            </Paragraph>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <ContactRequestStatus status={issue.status} />
        </div>
      </div>
    </Card>
  );
};

export default ContactRequestItem;
