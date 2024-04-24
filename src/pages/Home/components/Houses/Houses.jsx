import React from 'react';
import { Headline } from '../../../../components/Typography';
import styles from './Houses.module.scss';
import { Col, Row } from 'antd';
import CardSkeleton from '../../../../components/CardSkeleton/CardSkeleton';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter, setPage } from '../../../../store/slices/houseSlice';
import { useTranslation } from 'react-i18next';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';

const Houses = ({ data, isLoading, limit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <SpinLoading />
      ) : (
        <div className={styles.houses}>
          <div className={styles.disclaimerContainer}>
            <Headline size={450}>{t('home.disclaimer')}</Headline>
          </div>
          <div className={styles.housesContainer}>
            <Row gutter={[24, 24]}>
              {isLoading
                ? Array.from({ length: limit }).map((_, index) => (
                    <Col lg={8} sm={12} xs={24} key={index}>
                      <CardSkeleton />
                    </Col>
                  ))
                : data?.houses.map(house => {
                    return (
                      <Col lg={8} sm={12} xs={24} key={house.id}>
                        {<HouseItem house={house} />}
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
