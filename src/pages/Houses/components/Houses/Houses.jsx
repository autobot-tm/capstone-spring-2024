import { Col, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import styles from './Houses.module.scss';
import useSWR from 'swr';
import { getHousesService } from '../../../../services/apis/houses.service';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';

const Houses = () => {
  const [page, setPage] = useState(1);
  const LIMIT = 4;

  const { data, isLoading } = useSWR(`getHousesService/page=${page}`, async () => {
    return await getHousesService({ offset: LIMIT * (page - 1), limit: LIMIT });
  });

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row gutter={[16, 16]}>
            {isLoading
              ? Array.from({ length: LIMIT }).map((_, index) => (
                  <Col lg={12} key={index}>
                    <CardSkeleton />
                  </Col>
                ))
              : data?.houses.map(house => {
                  return (
                    <Col lg={12} key={house.id}>
                      {<HouseItem house={house} />}
                    </Col>
                  );
                })}
          </Row>

          <Row>
            <div className={styles.paginationContainer}>
              <Pagination
                showSizeChanger={false}
                total={data?.total_rows}
                pageSize={LIMIT}
                current={page}
                onChange={page => {
                  setPage(page);
                }}
              />
            </div>
          </Row>
        </Col>
        <Col lg={12}>Map</Col>
      </Row>
    </div>
  );
};

export default Houses;
