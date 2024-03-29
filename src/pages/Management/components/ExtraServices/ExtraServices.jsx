import React from 'react';
import styles from './ExtraServices.module.scss';
import Filter from '../Filter/Filter';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { FrownTwoTone } from '@ant-design/icons';
import { SubHeading } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import { Pagination, Result } from 'antd';
import RowCardSkeleton from '../../../../components/RowCardSkeleton/RowCardSkeleton';
import { getExtraServiceRequests } from '../../../../services/apis/extra-services.service';
import { setExtraServicesPage } from '../../../../store/slices/extraServices.slice';
import { openExtraServiceRequestDetailModal } from '../../../../store/slices/modalSlice';
import CardService from '../../../../components/CardService/CardService';

const ExtraServices = () => {
  const LIMIT = 5;
  const { status, page } = useSelector(state => state.extraServices);
  const { user } = useSelector(state => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data, isLoading } = useSWR(
    `getExtraServiceRequests?page=${page}&status=${status}`,
    async () => {
      return await getExtraServiceRequests({
        renter_email: user?.email,
        offset: LIMIT * (page - 1),
        limit: LIMIT,
        status: status,
      });
    },
  );

  const handleCardClick = service => {
    dispatch(openExtraServiceRequestDetailModal({ extraServiceRequestDetail: service }));
  };

  return (
    <div className={styles.contractContainer}>
      <Filter type="service" />
      <div className={styles.esManagementContainer}>
        {isLoading ? (
          Array.from({ length: LIMIT }).map((_, index) => (
            <div key={index}>
              <RowCardSkeleton />
            </div>
          ))
        ) : data?.length !== 0 ? (
          data?.extra_service_requests?.map(service => (
            <CardService
              key={service?.id}
              data={service}
              onClickDetail={() => handleCardClick(service)}
              t={t}
            />
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
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          showSizeChanger={false}
          total={data?.total_rows}
          pageSize={LIMIT}
          current={page}
          onChange={page => {
            dispatch(setExtraServicesPage({ page }));
          }}
        />
      </div>
    </div>
  );
};

export default ExtraServices;
