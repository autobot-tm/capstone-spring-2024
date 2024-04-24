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
import { FrownTwoTone } from '@ant-design/icons';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { useTranslation } from 'react-i18next';
import MapIcon from '../../../../assets/images/map.png';
import listIcon from '../../../../assets/images/list.png';
import { setPage } from '../../../../store/slices/houseSlice';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
const Houses = () => {
  const LIMIT = 6;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [locationArr, setLocationArr] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const {
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
    page,
  } = useSelector(state => state.house);
  const filterParams = {
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
  };
  const fetchFilteredHouses = async (page, filterParams) => {
    try {
      const response = await filterHousesService({
        offset: LIMIT * (page - 1),
        limit: LIMIT,
        ...filterParams,
      });
      return response;
    } catch (error) {
      console.error('Error while fetching filtered houses:', error);
      throw error;
    }
  };
  const { data, error, isLoading } = useSWR(`filterHousesService/${page}${JSON.stringify(filterParams)}`, () =>
    fetchFilteredHouses(page, filterParams),
  );
  useEffect(() => {
    if (data && data.houses) {
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
  if (isLoading) {
    return <SpinLoading />;
  }
  if (error) {
    return <div>{t('Failed to fetch filtered houses. Please try again later.')}</div>;
  }
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
                  <Col lg={8} sm={12} xs={24} key={index}>
                    <CardSkeleton />
                  </Col>
                ))
              ) : data?.houses.length !== 0 ? (
                data?.houses.map(house => (
                  <Col lg={8} sm={12} xs={24} key={house.id}>
                    <HouseItem house={house} />
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
        tooltip={<Paragraph strong>{showMap === false ? t('button.showMap') : t('button.showList')}</Paragraph>}
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
