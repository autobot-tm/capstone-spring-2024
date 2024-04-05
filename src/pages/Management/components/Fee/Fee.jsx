import React, { useEffect, useState } from 'react';
import styles from './Fee.module.scss';
import InvoiceItem from './components/InvoiceItem';
import { Col, Pagination, Result, Row } from 'antd';
import Filter from '../Filter/Filter';
import { SubHeading } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { getInvoicesService } from '../../../../services/apis/invoices.service';
import { FrownTwoTone } from '@ant-design/icons';
import { setInvoicePage } from '../../../../store/slices/invoiceSlice';
import InvoiceItemSkeleton from './components/InvoiceItemSkeleton';
const Fee = () => {
  const { t } = useTranslation();
  const LIMIT = 6;
  const status = useSelector(state => state.invoice.status);
  const page = useSelector(state => state.invoice.page);
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.auth);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  useEffect(() => {
    if (access_token && !shouldFetchData) {
      setShouldFetchData(true);
    }
  }, []);

  const { data, isLoading } = useSWR(shouldFetchData ? `getInvoicesService/${page}${status}` : null, async () => {
    try {
      const result = await getInvoicesService({
        offset: LIMIT * (page - 1),
        limit: LIMIT,
        status: status,
        type: 'RENTAL_FEE',
      });
      return result;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  });

  return (
    <div className={styles.feeContainer}>
      <Filter />
      <div style={{ marginTop: '26px', marginBottom: '16px' }}>
        <SubHeading strong>{t('label.rentalFee')}</SubHeading>
      </div>
      <Row gutter={[16, 16]}>
        <>
          {isLoading ? (
            Array.from({ length: LIMIT }).map((_, index) => (
              <Col xs={24} key={index}>
                <InvoiceItemSkeleton />
              </Col>
            ))
          ) : data?.invoices.length !== 0 ? (
            data?.invoices.map(invoice => (
              <Col xs={24} key={invoice.id}>
                <InvoiceItem t={t} id={invoice.id} invoice={invoice} />
              </Col>
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
        <div className={styles.paginationContainer}>
          <Pagination
            showSizeChanger={false}
            total={data?.total_rows}
            pageSize={LIMIT}
            current={page}
            onChange={page => {
              dispatch(setInvoicePage({ page }));
            }}
          />
        </div>
      </Row>
    </div>
  );
};

export default Fee;
