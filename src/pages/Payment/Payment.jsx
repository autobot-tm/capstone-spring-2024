import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../config';
import { Headline } from '../../components/Typography';
import { Button } from 'antd';
import Loading from '../../components/Loading/Loading';
import { VNPayTransactionStatus } from '../../constants/vnpay.constant';

const PaymentView = ({ handleUrlChange }) => {
  useEffect(() => {
    handleUrlChange({ url: window.location.href });
  }, [handleUrlChange]);

  return (
    <div className="container">
      <Loading />
    </div>
  );
};

const PaymentSuccess = ({ onNavigate }) => {
  return (
    <div className="container">
      <Headline size={600}>Payment Success</Headline>
      <Button onClick={onNavigate}>View your reservation</Button>
    </div>
  );
};

const PaymentError = ({ onNavigate }) => {
  return (
    <div className="container">
      <Headline size={600}>Payment Error</Headline>
      <Button onClick={onNavigate}>Back to home</Button>
    </div>
  );
};

export const Payment = () => {
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
    navigate(routeNames.About);
  };

  const onError = () => {
    navigate(routeNames.Home);
  };

  const renderStep = () => {
    switch (step) {
      case 'payment':
        return <PaymentView handleUrlChange={handleUrlChange} />;
      case 'success':
        return <PaymentSuccess onNavigate={onSuccess} />;
      case 'error':
        return <PaymentError onNavigate={onError} />;
      default:
        return null;
    }
  };

  return renderStep();
};

export default Payment;
