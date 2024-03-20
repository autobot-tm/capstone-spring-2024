import { Breadcrumb, Button, Col, Row } from 'antd';
import { Layout } from '../../../../hoc/Layout/Layout';
import './style.scss';
import React, { useEffect, useState } from 'react';
import { Headline, Paragraph } from '../../../../components/Typography';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReservationById } from '../../../../services/apis/payments.service';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { routeNames } from '../../../../config';

const OrderSuccessView = () => {
  const [reservation, setReservation] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reservationId = queryParams.get('reservation_id');

  const handleNavigateUserManagement = () => {
    navigate(routeNames.Management);
  };

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await getReservationById(reservationId);
        setReservation(res);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    fetchReservation();
  }, [reservationId]);
  console.log(reservation);
  return (
    <Layout>
      <header id="header-checkout">
        <Row className="header-row" align="middle">
          <Col xs={24} sm={12}>
            <Headline size={450} strong>
              {t('RESERVATION.checkout')}
            </Headline>
          </Col>
          <Col xs={24} sm={12} className="breadcrumb">
            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: <HomeOutlined style={{ color: 'black' }} />,
                },
                {
                  title: `${t('RESERVATION.checkout')}`,
                },
              ]}
            />
          </Col>
        </Row>
      </header>
      <Row id="order-container">
        <Col xs={24} style={{ marginBottom: 20 }}>
          <Headline size={450} strong>
            {t('ORDER.thanks')}
          </Headline>
        </Col>
        <Col xs={24}>
          <Paragraph> {t('ORDER.order')}: </Paragraph>
          <Paragraph strong> {reservation?.id} </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> {t('ORDER.email')}: </Paragraph>
          <Paragraph strong> {reservation?.renter?.email} </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> {t('ORDER.reservation-fee')}: </Paragraph>
          <Paragraph strong> {formatCustomCurrency(reservation?.fee)} </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> {t('ORDER.total-months')}: </Paragraph>
          <Paragraph strong>{reservation?.total_months}</Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> {t('ORDER.expected-move-in-date')}: </Paragraph>
          <Paragraph strong>{reservation?.expected_move_in_date}</Paragraph>
        </Col>
        <Col xs={24}>
          <Button onClick={handleNavigateUserManagement} className="return-btn">
            <Paragraph classNames="color-black" strong>
              {t('ORDER.return-to-user-management')}
            </Paragraph>
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default OrderSuccessView;
