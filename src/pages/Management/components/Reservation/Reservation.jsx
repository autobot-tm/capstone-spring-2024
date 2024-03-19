import React from 'react';
import styles from './Reservation.module.scss';
import Filter from '../Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';

import useSWR from 'swr';
import { getReservationsService } from '../../../../services/apis/reservations.service';
import { Pagination, Result } from 'antd';
import { setPage } from '../../../../store/slices/reservationSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { FrownTwoTone } from '@ant-design/icons';
import { SubHeading } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import RowCardSkeleton from '../../../../components/RowCardSkeleton/RowCardSkeleton';
const Reservation = () => {
  const { t } = useTranslation();
  const LIMIT = 4;

  const name = useSelector(state => state.reservation.name);
  const status = useSelector(state => state.reservation.status);
  const page = useSelector(state => state.reservation.page);
  const dispatch = useDispatch();

  const { data, isLoading } = useSWR(`getReservationsService/${page}${name}${status}`, async () => {
    return await getReservationsService({
      offset: LIMIT * (page - 1),
      limit: LIMIT,
      status: status,
      name: name,
    });
  });

  return (
    <div className={styles.reservationContainer}>
      <Filter type="reservation" />
      <>
        {isLoading ? (
          Array.from({ length: LIMIT }).map((_, index) => (
            <div key={index}>
              <RowCardSkeleton />
            </div>
          ))
        ) : data?.reservations.length !== 0 ? (
          data?.reservations.map(reservation => (
            <div key={reservation.id}>
              <HouseItemRow
                id={reservation.id}
                house={reservation.house}
                status={reservation.status}
                time={reservation.created_at}
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
      </>
      <div className={styles.paginationContainer}>
        <Pagination
          showSizeChanger={false}
          total={data?.total_rows}
          pageSize={LIMIT}
          current={page}
          onChange={page => {
            dispatch(setPage({ page }));
          }}
        />
      </div>
    </div>
  );
};

export default Reservation;
