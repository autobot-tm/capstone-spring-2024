import React from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { Headline } from '../../components/Typography/Headline/Headline';
import { FieldTimeOutlined, HomeOutlined, LeftOutlined, StarFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { Caption } from '../../components/Typography/Caption/Caption';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../hoc/Layout/Layout';
import VNPay2 from '../../assets/images/vnpay-qr-23-06-2020-2.jpg';
import VNPay1 from '../../assets/images/Logo-VNPAY-QR.webp';
const ReservationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/detail-house');
  };
  return (
    <Layout>
      <header id="header-checkout">
        <Headline size={450}>Checkout</Headline>
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            {
              title: 'Checkout',
            },
          ]}
        />
      </header>
      <Row id="reservation-container">
        <Col className="main" xs={24} lg={16}>
          <Headline>
            <LeftOutlined className="icon-left" onClick={handleBack} />
            {t('reservation.reservation-required')}
          </Headline>
          <Row className="main-estimated section">
            <Col xs={24}>
              <SubHeading size={230} strong>
                {t('reservation.reservation-required')}
              </SubHeading>
            </Col>
            <Col style={{ paddingLeft: 25 }} xs={12}>
              <Paragraph>• {t('reservation.rental-period')}:</Paragraph>
            </Col>
            <Col xs={12} style={{ textAlign: 'right' }}>
              {/* <Selection /> */}
            </Col>
            <Col style={{ paddingLeft: 25 }} xs={12}>
              <Paragraph>• {t('reservation.time-to-move-in')}:</Paragraph>
            </Col>
            <Col xs={12} style={{ textAlign: 'right' }}>
              {/* <DatePickerAnt /> */}
            </Col>
          </Row>
          <Row className="main-payment section">
            <Col xs={24}>
              {' '}
              <SubHeading size={230} strong>
                {t('reservation.payment')}Payment
              </SubHeading>
            </Col>
            <Col className="banner-payment" xs={24}>
              <img src={VNPay1} className="img-vnpay-1" alt="" />
              <img src={VNPay2} className="img-vnpay-2" alt="" />
            </Col>
          </Row>
          <Row className="section">
            <SubHeading size={230} strong>
              {t('reservation.cancellation-policy')}
            </SubHeading>
            <Paragraph>{t('reservation.des-policy')}</Paragraph>
          </Row>
          <Row className="section">
            <SubHeading size={230} strong>
              {t('reservation.general-standards')}
            </SubHeading>
            <Paragraph>
              All guests are urged to adhere to the following simple rules to ensure the best
              experience:
              <ul>
                <li>Comply with house rules</li>
                <li>Use supplies and equipment carefully and responsibly.</li>
                <li>
                  Report any problems or damage immediately so the homeowner can promptly resolve
                  them.
                </li>
                <li>
                  Understand and comply with all house policies and regulations, including
                  cancellation and refund regulations.
                </li>
                <li>
                  Remember that you are staying in someone else s home, so show respect and be a
                  good guest.
                </li>
              </ul>
            </Paragraph>
          </Row>
          <Row className="section">
            <Col xs={3}>
              {' '}
              <FieldTimeOutlined className="field-time-icon" />
            </Col>
            <Col xs={21}>
              <Paragraph style={{ color: 'black' }} strong>
                {t('reservation.description-field-time')}
              </Paragraph>
            </Col>
          </Row>
          <Row className="main-reservation-required">
            <Caption size={120}>
              {/* {t('detail-house.estimated')} */}nibh praesent tristique magna sit amet purus
              gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis
              purus sit amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris
              a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing
              enim eu turpis
            </Caption>
            <Button className="reservation-btn">
              <b> {t('reservation.reservation-btn')} </b>
            </Button>
          </Row>
        </Col>
        <Col className="side" xs={24} lg={8}>
          <div className="fee-table">
            <div className="fee-table-section-1">
              <img
                src="https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg"
                className="img-fee"
                alt=""
              />
              <div className="fee-table-section-1-description">
                <Caption size={120}>Apartment</Caption>
                <SubHeading size={230} strong>
                  $500 /{t('reservation.month')}
                </SubHeading>
                <Caption size={120}>
                  <StarFilled />
                  &nbsp;4.99
                </Caption>
              </div>
            </div>
            <div className="fee-table-section-2">
              <SubHeading size={230} strong>
                {t('reservation.reservation-fee')}
              </SubHeading>
              <Paragraph classNames="fee-table-section-2-description">
                <span>
                  {t('reservation.the-deposit')} x 2 ({t('reservation.month')}):
                </span>
                <span>$1.000</span>
              </Paragraph>
              <Paragraph classNames="fee-table-section-2-description">
                <span>{t('reservation.exception-fee')}:</span>
                <span>0</span>
              </Paragraph>
            </div>
            <div className="fee-table-section-3">
              <Paragraph classNames="fee-table-section-3-description">
                <b>{t('reservation.total')} (USD):</b>
                <b>$1.000</b>
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ReservationPage;
