import React from 'react';
import styles from './ContactRequests.module.scss';
import ContactRequestItem from './components/ContactRequestItem/ContactRequestItem';
import Filter from '../Filter/Filter';
import { Pagination, Result, Select } from 'antd';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { getIssuesService } from '../../../../services/apis/issues.service';
import { FrownTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { setIssueCategory, setIssuePage } from '../../../../store/slices/issueSlice';
import ContactRequestItemSkeleton from './components/ContactRequestItem/ContactRequestItemSkeleton';
const ContactRequests = () => {
  const { t } = useTranslation();
  const page = useSelector(state => state.issue.page);
  const status = useSelector(state => state.issue.status);
  const category = useSelector(state => state.issue.category);
  const LIMIT = 5;
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR(`getIssuesService/${page}${status}${category}`, async () => {
    return await getIssuesService({
      offset: LIMIT * (page - 1),
      limit: LIMIT,
      status: status,
      category: category,
    });
  });

  const options = [
    {
      label: '--',
      value: 'ALL',
    },
    {
      label: t('category.livingIssue'),
      value: 'LIVING_ISSUE',
    },
    {
      label: t('category.invoiceIssue'),
      value: 'INVOICE_ISSUE',
    },
  ];
  return (
    <div className={styles.contactRequestsContainer}>
      <Filter />
      <Paragraph>{t('label.category')}</Paragraph>
      <Select
        defaultValue={'ALL'}
        style={{ width: '250px', marginTop: '16px', marginLeft: '8px' }}
        size="large"
        options={options}
        onChange={value => dispatch(setIssueCategory({ category: value }))}
      />

      <div className={styles.contactRequests}>
        <>
          {isLoading ? (
            Array.from({ length: LIMIT }).map((_, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <ContactRequestItemSkeleton />
              </div>
            ))
          ) : data?.issues.length !== 0 ? (
            data?.issues.map((issue, index) => (
              <ContactRequestItem key={index} id={issue.id} issue={issue} />
            ))
          ) : (
            <div
              style={{
                width: '100%',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Result
                icon={<FrownTwoTone twoToneColor="#f8a11e" />}
                title={<SubHeading classNames="color-black">{t('noresult')}</SubHeading>}
              />
            </div>
          )}
        </>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          showSizeChanger={false}
          total={data?.total_rows}
          pageSize={LIMIT}
          current={page}
          onChange={page => {
            dispatch(setIssuePage({ page }));
          }}
        />
      </div>
    </div>
  );
};

export default ContactRequests;
