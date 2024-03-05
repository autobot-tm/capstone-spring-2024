import { Col, FloatButton, Pagination, Result, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './Houses.module.scss';
import useSWR from 'swr';
import { filterHousesService } from '../../../../services/apis/houses.service';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import HousesMap from '../../../../components/HousesMap/HousesMap';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../Filter/Filter';

import { FrownOutlined } from '@ant-design/icons';
import { Paragraph } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import MapIcon from '../../../../assets/images/map.png';
import listIcon from '../../../../assets/images/list.png';
import { setPage } from '../../../../store/slices/houseSlice';
const Houses = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [locationArr, setLocationArr] = useState([]);
  const [showMap, setShowMap] = useState(false);

  // const [page, setPage] = useState(1);
  const LIMIT = 8;

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
  const page = useSelector(state => state.house.page);

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
      <div style={{ marginTop: '40px' }}>
        <Row>
          <Filter />
        </Row>
        {showMap === false ? (
          <>
            <Row gutter={[24, 24]}>
              {isLoading ? (
                Array.from({ length: LIMIT }).map((_, index) => (
                  <Col md={6} key={index}>
                    <CardSkeleton />
                  </Col>
                ))
              ) : data?.houses.length !== 0 ? (
                data?.houses.map(house => (
                  <Col xl={6} lg={8} sm={12} xs={24} key={house.id}>
                    <HouseItem house={house} />
                  </Col>
                ))
              ) : (
                <div style={{ width: '100%', height: '100vh' }}>
                  <Result icon={<FrownOutlined />} title={t('noresult')} />
                </div>
              )}
            </Row>
          </>
        ) : (
          <div className={styles.mapContainer}>
            <HousesMap locations={locationArr} />
          </div>
        )}
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

      <FloatButton
        icon={<div>{showMap === false ? <img src={MapIcon} /> : <img src={listIcon} />}</div>}
        tooltip={
          <Paragraph strong>
            {showMap === false ? t('button.showMap') : t('button.showList')}
          </Paragraph>
        }
        shape="circle"
        type="primary"
        style={{
          width: '56px',
          height: '56px',
        }}
        onClick={() => setShowMap(!showMap)}
      />
    </div>
  );
};

export default Houses;
