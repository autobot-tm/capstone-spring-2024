import React, { useState, useEffect } from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { Headline } from '../../components/Typography/Headline/Headline';
import { FieldTimeOutlined, HomeOutlined, LeftOutlined, StarFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row } from 'antd';
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { Caption } from '../../components/Typography/Caption/Caption';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Layout } from '../../hoc/Layout/Layout';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { requestReserveHouse } from '../../services/apis/payments.service';
import VNPay2 from '../../assets/images/vnpay-qr-23-06-2020-2.jpg';
import VNPay1 from '../../assets/images/Logo-VNPAY-QR.webp';
import Selection from '../DetailHouse/components/Selection/Selection';
import DatePickerAnt from '../DetailHouse/components/DatePickerComponent/DatePickerAnt';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import { PAYMENT_METHOD } from '../../constants/payment.constant';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

const ReservationPage = () => {
  const { t } = useTranslation();
  const { house_id: house_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { house, reviews, selectedDate, selectedMonths } = location.state || {};
  const [selectedNewDate, setSelectedNewDate] = useState(selectedDate || null);
  const [selectedNewMonths, setSelectedNewMonths] = useState(selectedMonths || '1');
  const [priceOfMonths, setPriceOfMonths] = useState(null);
  const [idPricingPolicy, setIdPricingPolicy] = useState(null);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingMonths, setIsEditingMonths] = useState(false);

  const promotionPackageMonths = [1, 3, 6, 12];

  const getPriceAndIdFromHouse = months => {
    if (house && months) {
      const selectedMonthsInt = parseInt(months);

      if (promotionPackageMonths.includes(selectedMonthsInt)) {
        const selectedPolicy = house?.pricing_policies.find(
          policy => parseInt(policy.total_months) === selectedMonthsInt,
        );

        if (selectedPolicy) {
          const { id, price_per_month } = selectedPolicy;
          return { id, price_per_month };
        } else {
          console.log('No pricing policy for:', months);
          return { id: null, price_per_month: null };
        }
      } else {
        const selectedPolicy = house?.pricing_policies.find(
          policy => parseInt(policy.total_months) === 1,
        );

        if (selectedPolicy) {
          const { id, price_per_month } = selectedPolicy;
          return { id, price_per_month };
        } else {
          console.log('No pricing policy for 1 month');
          return { id: null, price_per_month: null };
        }
      }
    }

    return { id: null, price_per_month: null };
  };

  const handleMonthChange = value => {
    setSelectedNewMonths(value);
    const { id, price_per_month } = getPriceAndIdFromHouse(value);
    setPriceOfMonths(price_per_month);
    setIdPricingPolicy(id);
  };

  const handleDateChange = date => {
    setSelectedNewDate(date);
    console.log(selectedNewDate);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [house, reviews]);

  useEffect(() => {
    const { id, price_per_month } = getPriceAndIdFromHouse(selectedNewMonths);
    setPriceOfMonths(price_per_month);
    setIdPricingPolicy(id);
    console.log('priceOfMonths', priceOfMonths);
    console.log('idPricingPolicy', idPricingPolicy);
    console.log('selectedNewMonths', selectedNewMonths);
    console.log('selectedNewDate', selectedNewDate);
  }, [selectedNewMonths, idPricingPolicy, selectedNewDate]);

  const handleBack = () => {
    navigate(`/houses/${house_id}`);
  };

  const handlePayments = async () => {
    try {
      const response_url = await requestReserveHouse({
        house_id: house_id,
        pricing_policy_id: idPricingPolicy,
        total_months: selectedNewMonths,
        expected_move_in_date: selectedNewDate,
        gateway_provider: PAYMENT_METHOD.VNPAY,
      });
      window.location.href = response_url;
    } catch (error) {
      console.error('Error reserving house:', error);
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <SpinLoading />
      ) : (
        <>
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
          <Row id="reservation-container">
            <Col className="reservation-title" xs={24}>
              <LeftOutlined className="icon-left" onClick={handleBack} />
              <Headline strong>{t('RESERVATION.reservation-required')}</Headline>
            </Col>
            <Col className="main" xs={24} lg={14}>
              <Row className="main-estimated section">
                <Col style={{ marginBottom: 20 }} xs={24}>
                  <SubHeading size={260} strong>
                    {t('RESERVATION.your-intentions')}
                  </SubHeading>
                </Col>
                <Col style={{ marginBottom: 14 }} xs={12}>
                  <Paragraph classNames="color-black" strong>
                    {t('RESERVATION.rental-period')}
                  </Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  {isEditingMonths ? (
                    <Selection defaultValue={selectedMonths} onChange={handleMonthChange} />
                  ) : (
                    <>
                      <span>
                        {selectedNewMonths} {t('RESERVATION.month')}
                      </span>
                      <Button
                        className="edit-date"
                        type="link"
                        onClick={() => setIsEditingMonths(!isEditingMonths)}>
                        {t('RESERVATION.edit')}
                      </Button>
                    </>
                  )}
                </Col>
                <Col xs={12}>
                  <Paragraph classNames="color-black" strong>
                    {t('RESERVATION.time-to-move-in')}
                  </Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  {isEditingDate ? (
                    <DatePickerAnt onDateChange={handleDateChange} />
                  ) : (
                    <>
                      <span>{selectedNewDate}</span>
                      <Button
                        className="edit-date"
                        type="link"
                        onClick={() => setIsEditingDate(!isEditingDate)}>
                        {t('RESERVATION.edit')}
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
              <Row className="main-payment section">
                <Col xs={24}>
                  {' '}
                  <SubHeading size={230} strong>
                    {t('RESERVATION.payment')}
                  </SubHeading>
                </Col>
                <Col className="banner-payment-vnpay" xs={24}>
                  <img src={VNPay1} className="img-vnpay-1" alt="" />
                  <img src={VNPay2} className="img-vnpay-2" alt="" />
                </Col>
                {/* <Col className="banner-payment-vnpay" xs={24}>
              <img src={VNPay1} className="img-vnpay-1" alt="" />
              <img src={VNPay2} className="img-vnpay-2" alt="" />
            </Col> */}
              </Row>
              <Row className="section">
                <SubHeading size={230} strong>
                  {t('RESERVATION.cancellation-policy')}
                </SubHeading>
                <Paragraph>{t('RESERVATION.des-policy')}</Paragraph>
              </Row>
              <Row className="section">
                <SubHeading size={230} strong>
                  {t('RESERVATION.general-standards')}
                </SubHeading>
                <Paragraph>
                  All guests are urged to adhere to the following simple rules to ensure the best
                  experience:
                  <ul>
                    <li>Comply with house rules</li>
                    <li>Use supplies and equipment carefully and responsibly.</li>
                    <li>
                      Report any problems or damage immediately so the homeowner can promptly
                      resolve them.
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
                <Col xs={24} xl={3}>
                  {' '}
                  <FieldTimeOutlined className="field-time-icon" />
                </Col>
                <Col xs={24} xl={21}>
                  <Paragraph style={{ color: 'black' }} strong>
                    {t('RESERVATION.description-field-time')}
                  </Paragraph>
                </Col>
              </Row>
              <Row className="main-reservation-required">
                <Caption size={120}>
                  nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in
                  hac habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat
                  mauris nunc congue nisi vitae suscipit tellus mauris a diam maecenas sed enim ut
                  sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis
                </Caption>
                <span className="reservation-btn">
                  <BaseButton type="primary" onClick={handlePayments}>
                    {t('RESERVATION.reservation-btn')}
                  </BaseButton>
                </span>
              </Row>
            </Col>
            <Col className="side" xs={23} lg={8}>
              <div className="fee-table">
                <div className="fee-table-section-1">
                  <img src={house?.image_urls?.[0]} className="img-fee" alt={house.name} />
                  <div className="fee-table-section-1-description">
                    <Caption size={120}>
                      {' '}
                      {t(`detail-house.${house?.category.replace(/\s/g, '')}`)}
                    </Caption>
                    <Row align="middle">
                      <SubHeading size={230} strong>
                        {formatCustomCurrency(priceOfMonths)}
                      </SubHeading>
                      <Caption size={140}>&nbsp;/{t('RESERVATION.month')}</Caption>
                    </Row>
                    <Caption size={120}>
                      <StarFilled />
                      &nbsp;
                      {reviews?.average_rating > 0 ? `${reviews?.average_rating}/5` : 'No rating'}
                    </Caption>
                  </div>
                </div>
                <div className="fee-table-section-2">
                  <SubHeading size={230} strong>
                    {t('RESERVATION.total-fee')}
                  </SubHeading>
                  <Paragraph classNames="fee-table-section-2-description">
                    <span>
                      {t('RESERVATION.reservation-fee')} ({t('reservation.month')}):
                    </span>
                    <span>{formatCustomCurrency(house?.reservation_fee)}</span>
                  </Paragraph>
                  <Paragraph classNames="fee-table-section-2-description">
                    <span>{t('RESERVATION.exception-fee')}:</span>
                    <span>0</span>
                  </Paragraph>
                </div>
                <div className="fee-table-section-3">
                  <Paragraph classNames="fee-table-section-3-description">
                    <b>{t('RESERVATION.total')} (VND):</b>
                    <b>{formatCustomCurrency(house?.reservation_fee)}</b>
                  </Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default ReservationPage;
