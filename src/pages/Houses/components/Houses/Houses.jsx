import { Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './Houses.module.scss';
import useSWR from 'swr';
import { filterHousesService } from '../../../../services/apis/houses.service';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import HousesMap from '../../../../components/HousesMap/HousesMap';
import { useSelector } from 'react-redux';
import Filter from '../Filter/Filter';
import notFound from '../../../../assets/images/notfound.webp';
import { SubHeading } from '../../../../components/Typography';
import { t } from 'i18next';

const Houses = () => {
  const [locationArr, setLocationArr] = useState([]);

  const [page, setPage] = useState(1);
  const LIMIT = 4;

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
    `filterHousesService/${page}${name}${categories}${provinces}${districts}${wards}${minArea}${maxArea}${minPrice}${maxPrice}${amenities}${utilities}`,
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
  useEffect(() => {
    if (data) {
      const newLocations = data.houses.map(house => ({
        position: {
          lat: house.latitude,
          lng: house.longitude,
        },
        id: house.id,
        name: house.name,
        price: house.pricing_policies[0].price_per_month,
        image: house.image_urls[0],
      }));
      setLocationArr(newLocations);
    }
  }, [data]);

  return (
    <div className={styles.houseContainer}>
      <Row gutter={[16, 16]}>
        <Col xl={12} xs={24}>
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Filter />
            </Row>
            <Row gutter={[16, 16]}>
              {isLoading ? (
                Array.from({ length: LIMIT }).map((_, index) => (
                  <Col md={12} key={index}>
                    <CardSkeleton />
                  </Col>
                ))
              ) : data.houses.length !== 0 ? (
                data.houses.map(house => (
                  <Col md={12} key={house.id}>
                    <HouseItem house={house} />
                  </Col>
                ))
              ) : (
                <Col xs={24}>
                  <div className={styles.notFoundTextContainer}>
                    <SubHeading size="230">{t('noresult')}</SubHeading>
                  </div>
                  <div className={styles.imageContainer}>
                    <img src={notFound} alt="" />
                  </div>
                </Col>
              )}
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
        </Col>
        <Col xl={12} xs={24}>
          <div className={styles.mapContainer}>
            <HousesMap locations={locationArr} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Houses;
