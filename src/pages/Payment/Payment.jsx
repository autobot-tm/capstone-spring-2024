import React, { useEffect, useState } from 'react';
import './styles.scss';
import { VNPayTransactionStatus } from '../../constants/vnpay.constant';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../config';
import { useTranslation } from 'react-i18next';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import ResultSuccessfully from './components/ResultSucessfully/ResultSuccessfully';
import ResultFailed from './components/ResultFailed/ResultFailed';

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

  const leadingDashboard = () => {
    navigate(routeNames.UserDashboard);
  };

  const leadingOrderSuccess = () => {
    navigate(routeNames.OrderSuccess);
  };

  const leadingHouses = () => {
    navigate(routeNames.Houses);
  };

  const renderStep = () => {
    switch (step) {
      case 'payment':
        return <PaymentView handleUrlChange={handleUrlChange} />;
      case 'success':
        return (
          <ResultSuccessfully
            t={t}
            leadingDashboard={leadingDashboard}
            leadingOrderSuccess={leadingOrderSuccess}
          />
        );
      case 'error':
        return (
          <ResultFailed t={t} leadingDashboard={leadingDashboard} leadingHouses={leadingHouses} />
        );
      default:
        return null;
    }
  };

  return renderStep();
};

export default Payment;
