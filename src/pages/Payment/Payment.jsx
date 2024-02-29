import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../config';
import { Headline, SubHeading } from '../../components/Typography';
import { Col, Row } from 'antd';
import { VNPayTransactionStatus } from '../../constants/vnpay.constant';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import { useTranslation } from 'react-i18next';

const PaymentView = ({ handleUrlChange }) => {
  useEffect(() => {
    handleUrlChange({ url: window.location.href });
  }, [handleUrlChange]);

  return (
    <div className="container">
      <SpinLoading />
    </div>
  );
};

const PaymentSuccess = ({ t, onNavigate }) => {
  return (
    <Row className="container" gutter={[16, 16]}>
      <Col xs={24}>
        <Headline classNames="text-color-success" size={600}>
          <CheckCircleFilled />
        </Headline>
      </Col>
      <Col xs={24}>
        <SubHeading size={230} strong>
          {t('PAYMENT.success')}
        </SubHeading>
      </Col>
      <Col xs={24} className="reservation-btn">
        <BaseButton type="primary" style={{ width: 220 }} onClick={onNavigate}>
          {t('PAYMENT.view-your-reservation')}
        </BaseButton>
      </Col>
    </Row>
  );
};

const PaymentError = ({ t, onNavigate }) => {
  return (
    <Row className="container" gutter={[16, 16]}>
      <Col xs={24}>
        <Headline classNames="text-color-fail" size={600}>
          <CloseCircleFilled />
        </Headline>
      </Col>
      <Col xs={24}>
        <SubHeading size={230} strong>
          {t('PAYMENT.fail')}
        </SubHeading>
      </Col>
      <Col xs={24} className="reservation-btn">
        <BaseButton type="primary" style={{ width: 170 }} onClick={onNavigate}>
          {t('PAYMENT.back-to-home')}
        </BaseButton>
      </Col>
    </Row>
  );
};

export const Payment = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState('payment');
  const navigate = useNavigate();

  const handleUrlChange = urlState => {
    if (urlState && urlState.url) {
      const url = urlState.url;
      const match = url.match(/vnp_TransactionStatus=([^&]*)/);
      const vnp_TransactionStatus = match ? match[1] : null;

      if (vnp_TransactionStatus) {
        if (vnp_TransactionStatus === VNPayTransactionStatus.Success) {
          setStep('success');
        } else {
          setStep('error');
        }
      }
    }
  };

  const onSuccess = () => {
    navigate(routeNames.OrderSuccess);
  };

  const onError = () => {
    navigate(routeNames.Home);
  };

  const renderStep = () => {
    switch (step) {
      case 'payment':
        return <PaymentView handleUrlChange={handleUrlChange} />;
      case 'success':
        return <PaymentSuccess t={t} onNavigate={onSuccess} />;
      case 'error':
        return <PaymentError t={t} onNavigate={onError} />;
      default:
        return null;
    }
  };

  return renderStep();
};

export default Payment;
