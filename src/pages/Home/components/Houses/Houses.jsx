import React from 'react';
import { Headline } from '../../../../components/Typography';
import styles from './Houses.module.scss';
import { Col, Row } from 'antd';
import useSWR from 'swr';
import { getHousesService } from '../../../../services/apis/houses.service';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter, setPage } from '../../../../store/slices/houseSlice';
import { useTranslation } from 'react-i18next';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';

const Houses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LIMIT = 8;

  const { data, isLoading } = useSWR(`getHousesService`, async () => {
    return await getHousesService({
      offset: 0,
      limit: LIMIT,
    });
  });
  return (
    <>
      {isLoading ? (
        <SpinLoading />
      ) : (
        <div className={styles.houses}>
          <Headline size={450}>{t('home.disclaimer')}</Headline>
          <div className={styles.housesContainer}>
            <Row gutter={[24, 24]}>
              {isLoading
                ? Array.from({ length: LIMIT }).map((_, index) => (
                    <Col xl={6} lg={8} sm={12} key={index}>
                      <CardSkeleton type="home" />
                    </Col>
                  ))
                : data?.houses.map(house => {
                    return (
                      <Col xl={6} lg={8} sm={12} key={house.id}>
                        {<HouseItem house={house} type="home" />}
                      </Col>
                    );
                  })}
            </Row>

            <Row>
              <div className={styles.rowContainer}>
                <div>
                  <BaseButton
                    size="large"
                    type="primary"
                    onClick={() => {
                      dispatch(setFilter({}));
                      dispatch(setPage({ page: 1 }));
                      navigate('/houses');
                    }}>
                    {t('button.browseMore')}
                  </BaseButton>
                </div>
              </div>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default Houses;
