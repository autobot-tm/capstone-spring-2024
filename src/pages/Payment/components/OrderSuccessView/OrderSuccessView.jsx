import { Breadcrumb, Button, Col, Row } from 'antd';
import { Layout } from '../../../../hoc/Layout/Layout';
import './style.scss';
import React from 'react';
import { Headline, Paragraph } from '../../../../components/Typography';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { routeNames } from '../../../../config';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const OrderSuccessView = () => {
  const { dataOrderSuccessfully, typeOfPayment } = useSelector(state => state.payment);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateUserManagement = () => {
    navigate(routeNames.Management);
  };

  return (
    <Layout>
      <Helmet>
        <title>{t('title-tab-checkout')}</title>
      </Helmet>
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
      {dataOrderSuccessfully === null ? (
        <>
          <SpinLoading />
        </>
      ) : (
        <>
          <Row id="order-container">
            <Col xs={24} style={{ marginBottom: 20 }}>
              <Headline size={450} strong>
                {t('ORDER.thanks')}
              </Headline>
            </Col>
            {typeOfPayment === 'reservation' ? (
              <>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.order')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.id} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> Type: </Paragraph>
                  <Paragraph strong> RESERVATION FEE </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.email')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.renter?.email} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.reservation-fee')}: </Paragraph>
                  <Paragraph strong> {formatCustomCurrency(dataOrderSuccessfully?.fee)} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.total-months')}: </Paragraph>
                  <Paragraph strong>{dataOrderSuccessfully?.total_months}</Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.expected-move-in-date')}: </Paragraph>
                  <Paragraph strong>{dataOrderSuccessfully?.expected_move_in_date}</Paragraph>
                </Col>
              </>
            ) : (
              <>
                <Col xs={24}>
                  <Paragraph> {t('ORDER.order')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.id} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('placeholder.type')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.type} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph>{t('placeholder.description')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.description} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('RESERVATION.total-fee')}: </Paragraph>
                  <Paragraph strong>{formatCustomCurrency(dataOrderSuccessfully?.amount)} </Paragraph>
                </Col>
                <Col xs={24}>
                  <Paragraph> {t('label.dueDate')}: </Paragraph>
                  <Paragraph strong> {dataOrderSuccessfully?.due_date} </Paragraph>
                </Col>
              </>
            )}

            <Col xs={24}>
              <Button onClick={handleNavigateUserManagement} className="return-btn">
                <Paragraph classNames="color-black" strong>
                  {t('ORDER.return-to-user-management')}
                </Paragraph>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default OrderSuccessView;
