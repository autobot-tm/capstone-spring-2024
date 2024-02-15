import React, { useState } from 'react';
import { Headline } from '../../../../components/Typography';
import styles from './Houses.module.scss';
import { Col, Pagination, Row } from 'antd';
import useSWR from 'swr';
import { filterHousesService } from '../../../../services/apis/houses.service';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import { useSelector } from 'react-redux';
const Houses = () => {
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  const name = useSelector(state => state.house.name);
  const categories = useSelector(state => state.house.categories);
  const provinces = useSelector(state => state.house.provinces);
  const districts = useSelector(state => state.house.districts);
  const wards = useSelector(state => state.house.wards);
  const minArea = useSelector(state => state.house.minArea);
  const maxArea = useSelector(state => state.house.maxArea);
  const minPrice = useSelector(state => state.house.minPrice);
  const maxPrice = useSelector(state => state.house.maxPrice);
  const amenities = useSelector(state => state.house.amenities);
  const utilities = useSelector(state => state.house.utilities);

  const { data, isLoading } = useSWR(
    `getHousesService/${page}${name}${categories}${provinces}${districts}${wards}${minArea}${maxArea}${minPrice}${maxPrice}${amenities}${utilities}`,
    async () => {
      return await filterHousesService({
        offset: LIMIT * (page - 1),
        limit: LIMIT,
        name,
        categories,
        provinces,
        districts,
        wards,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
        amenities,
        utilities,
      });
    },
  );
  return (
    <div className={styles.houses}>
      <Headline size={450}>Our choice of popular real estate</Headline>
      <div className={styles.housesContainer}>
        <Row gutter={[16, 16]}>
          {isLoading
            ? Array.from({ length: LIMIT }).map((_, index) => (
                <Col lg={8} key={index}>
                  <CardSkeleton />
                </Col>
              ))
            : data?.houses.map(house => {
                return (
                  <Col lg={8} key={house.id}>
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
      </div>
    </div>
  );
};

export default Houses;
