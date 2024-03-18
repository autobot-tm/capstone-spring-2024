import React from 'react';
import styles from './Contract.module.scss';
import Filter from '../Filter/Filter';
import useSWR from 'swr';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { useDispatch, useSelector } from 'react-redux';
import { FrownTwoTone } from '@ant-design/icons';
import { SubHeading } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { Pagination, Result } from 'antd';
import { setContractPage } from '../../../../store/slices/contractSlice';
import RowCardSkeleton from '../../../../components/RowCardSkeleton/RowCardSkeleton';
const Contract = () => {
  const LIMIT = 4;

  const status = useSelector(state => state.contract.status);
  const page = useSelector(state => state.contract.page);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data, isLoading } = useSWR(`getLeasesService/${page}${status}`, async () => {
    return await getLeasesService({
      offset: LIMIT * (page - 1),
      limit: LIMIT,
      status: status,
    });
  });

  console.log(data);
  return (
    <div className={styles.contractContainer}>
      <Filter />
      <div style={{ marginTop: '16px' }}>
        {isLoading ? (
          Array.from({ length: LIMIT }).map((_, index) => (
            <div key={index}>
              <RowCardSkeleton />
            </div>
          ))
        ) : data?.leases.length !== 0 ? (
          data?.leases.map(lease => (
            <div key={lease.id}>
              <HouseItemRow
                id={lease.id}
                house={lease.reservation.house}
                status={lease.status}
                time={lease.created_at}
                type="contract"
              />
            </div>
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
            dispatch(setContractPage({ page }));
          }}
        />
      </div>
    </div>
  );
};

export default Contract;
