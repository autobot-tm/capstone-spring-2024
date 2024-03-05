import React, { useState, useEffect } from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { Headline } from '../../components/Typography/Headline/Headline';
import {
  ExclamationCircleOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  LeftOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Radio, Row, notification } from 'antd';
import { SubHeading } from '../../components/Typography/SubHeading/SubHeading';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { Caption } from '../../components/Typography/Caption/Caption';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Layout } from '../../hoc/Layout/Layout';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { requestReserveHouse } from '../../services/apis/payments.service';
import { PROMOTION_PACKAGE_MONTHS } from '../../constants/house.constant';
import { BASE_URL_STATUS, PAYMENT_METHOD } from '../../constants/payment.constant';
import VNPay1 from '../../assets/images/Logo-VNPAY-QR.webp';
import ONEPay from '../../assets/images/onepay.svg';
import Selection from '../DetailHouse/components/Selection/Selection';
import DatePickerAnt from '../DetailHouse/components/DatePickerComponent/DatePickerAnt';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

const ReservationPage = () => {
  const { t } = useTranslation();
  const { house_id: house_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { house, reviews, selectedDate, selectedMonths } = location.state || {};
  const [selectedNewDate, setSelectedNewDate] = useState(selectedDate || null);
  const [selectedNewMonths, setSelectedNewMonths] = useState(selectedMonths || 1);
  const [priceOfMonths, setPriceOfMonths] = useState(null);
  const [idPricingPolicy, setIdPricingPolicy] = useState(null);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingMonths, setIsEditingMonths] = useState(false);
  const [opPayment, setOpPayment] = useState(PAYMENT_METHOD.VNPAY);

  const handleBack = () => {
    navigate(`/houses/${house_id}`);
  };

  const getPriceAndIdFromHouse = months => {
    if (house && months) {
      const selectedMonthsInt = parseInt(months);
      if (PROMOTION_PACKAGE_MONTHS.includes(selectedMonthsInt)) {
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
  };

  useEffect(() => {
    const { id, price_per_month } = getPriceAndIdFromHouse(selectedNewMonths);
    setPriceOfMonths(price_per_month);
    setIdPricingPolicy(id);
    setIsLoading(false);
  }, [selectedNewMonths, idPricingPolicy, selectedNewDate]);

  const handleOptionPayment = e => {
    setOpPayment(e.target.value);
  };

  function errorPaymentNotification() {
    return notification.error({
      message: t('RESERVATION.error'),
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      description: t('RESERVATION.error-option-payment'),
    });
  }

  const handlePayments = async () => {
    if (!opPayment) return errorPaymentNotification();
    try {
      const response_url = await requestReserveHouse({
        house_id: house_id,
        pricing_policy_id: idPricingPolicy,
        total_months: selectedNewMonths,
        expected_move_in_date: selectedNewDate,
        gateway_provider: opPayment,
        callback_base_url: BASE_URL_STATUS,
      });
      window.location.href = response_url;
    } catch (error) {
      console.error('Error reserving house:', error.errorCode);
    }
  };

  const handleBookNowClick = () => {
    const priceSection = document.querySelector('.reservation-btn');
    if (priceSection) {
      priceSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
            <BaseButton
              shape="circle"
              type="primary"
              size="large"
              className="book-now-btn"
              onClick={handleBookNowClick}>
              {t('RESERVATION.reserve-btn')}
            </BaseButton>
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
                <Col style={{ paddingLeft: 10 }} xs={24} sm={14}>
                  <Paragraph classNames="color-black" strong>
                    {t('RESERVATION.rental-period')}
                  </Paragraph>
                </Col>
                <Col xs={16} sm={7} style={{ textAlign: 'right' }}>
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
                <Col style={{ paddingLeft: 10 }} xs={24} sm={14}>
                  <Paragraph classNames="color-black" strong>
                    {t('RESERVATION.time-to-move-in')}
                  </Paragraph>
                </Col>
                <Col xs={16} sm={7} style={{ textAlign: 'right' }}>
                  {isEditingDate ? (
                    <DatePickerAnt propValue={selectedDate} onDateChange={handleDateChange} />
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
                  <SubHeading size={230} strong>
                    {t('RESERVATION.payment')}
                  </SubHeading>
                </Col>
                <Col xs={24}>
                  <Radio.Group
                    onChange={handleOptionPayment}
                    value={opPayment}
                    size="large"
                    optionType="button">
                    <Radio value={PAYMENT_METHOD.VNPAY} className="main-payment-banner">
                      <span className="main-payment-banner-inner">
                        <img src={VNPay1} />
                      </span>
                    </Radio>
                    <Radio disabled value={PAYMENT_METHOD.ONEPAY} className="main-payment-banner">
                      <span className="main-payment-banner-inner">
                        <img src={ONEPay} />
                        <Caption>(Coming soon)</Caption>
                      </span>
                    </Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row className="section">
                <SubHeading size={230} classNames="block" strong>
                  {t('RESERVATION.reservation-cancellation-policy')}
                </SubHeading>
                <Paragraph>
                  &nbsp;&nbsp;{t('RESERVATION.reservation-des-1')}:
                  <ul>
                    <li>{t('RESERVATION.reservation-des-2')}</li>
                    <li>{t('RESERVATION.reservation-des-3')}</li>
                  </ul>
                </Paragraph>
              </Row>
              <Row style={{ padding: '20px 0', gap: 20 }}>
                <Col xs={24} xl={2}>
                  <FieldTimeOutlined className="field-time-icon" />
                </Col>
                <Col xs={24} xl={18}>
                  <Caption size={120}>{t('RESERVATION.conclude-cancellation-policy')}</Caption>
                </Col>
              </Row>
            </Col>
            <Col className="side" xs={23} lg={8}>
              <div className="fee-table">
                <div className="fee-table-section-1">
                  <img src={house?.image_urls?.[0]} className="img-fee" alt={house?.name} />
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
                      <StarFilled style={{ color: '#f8a11e' }} />
                      &nbsp;
                      {reviews?.average_rating > 0 ? `${reviews?.average_rating}` : 'No rating'}
                    </Caption>
                  </div>
                </div>
                <div className="fee-table-section-2">
                  <SubHeading size={230} strong>
                    {t('RESERVATION.total-fee')}
                  </SubHeading>
                  <Paragraph classNames="fee-table-section-2-description">
                    <span>{t('RESERVATION.reservation-fee')}:</span>
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
              <Row>
                <Col className="reservation-btn" xs={24}>
                  <BaseButton style={{ width: '100%' }} type="primary" onClick={handlePayments}>
                    {t('RESERVATION.reservation-btn')}
                  </BaseButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default ReservationPage;
