import React, { useEffect, useState } from 'react';
import './styles.scss';
import { VNPayTransactionStatus } from '../../constants/vnpay.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { routeNames } from '../../config';
import { useTranslation } from 'react-i18next';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import ResultSuccessfully from './components/ResultSucessfully/ResultSuccessfully';
import ResultFailed from './components/ResultFailed/ResultFailed';
import { getReservationIdByHouseIdService } from '../../services/apis/payments.service';
import { useDispatch } from 'react-redux';
import { setOrderSuccessfully } from '../../store/slices/payment.slice';
import { getInvoiceByIdService } from '../../services/apis/invoices.service';
import { MOMOResultCodeStatus } from '../../constants/momo.constant';

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
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id: id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const typeOfPayment = queryParams.get('typeOfPayment');

  const handleUrlChange = urlState => {
    if (urlState && urlState.url) {
      const url = urlState.url;
      const match = url.match(/vnp_TransactionStatus=([^&]*)/);
      const matchMomo = url.match(/resultCode=(\d+)/);
      const vnp_TransactionStatus = match ? match[1] : null;
      const momo_ResultCodeStatus = matchMomo ? matchMomo[1] : null;
      if (vnp_TransactionStatus) {
        if (vnp_TransactionStatus === VNPayTransactionStatus.Success) {
          setStep('success');
        } else {
          setStep('error');
        }
      } else {
        if (momo_ResultCodeStatus === MOMOResultCodeStatus.Success) {
          setStep('success');
        } else {
          setStep('error');
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeOfPayment === 'reservation') {
        try {
          const res = await getReservationIdByHouseIdService({
            house_id: id,
            status: 'PAYMENT_COMPLETE',
          });
          if (res && res.reservations && res.reservations.length > 0) {
            dispatch(
              setOrderSuccessfully({
                typeOfPayment: typeOfPayment,
                dataOrderSuccessfully: res.reservations[0],
              }),
            );
          } else {
            console.log('No reservation found');
          }
        } catch (error) {
          console.error('Error fetching reservation:', error);
        }
      } else if (typeOfPayment === 'invoice') {
        try {
          const res = await getInvoiceByIdService({ invoiceId: id });
          dispatch(
            setOrderSuccessfully({
              typeOfPayment: typeOfPayment,
              dataOrderSuccessfully: res,
            }),
          );
        } catch (error) {
          console.error('Error fetching invoice:', error);
        }
      }
    };

    fetchData();
  }, [typeOfPayment, id]);

  const leadingToHomepage = () => {
    navigate(routeNames.Home);
  };

  const leadingToOrderSuccessfulReservation = () => {
    navigate('/orders');
  };

  const leadingToCurrentHouses = () => {
    navigate('/houses/' + id);
  };

  const leadingToCurrentManager = () => {
    navigate('/management');
  };

  const renderStep = () => {
    switch (step) {
      case 'payment':
        return <PaymentView handleUrlChange={handleUrlChange} />;
      case 'success':
        return (
          <ResultSuccessfully
            t={t}
            leadingToHomepage={leadingToHomepage}
            leadingToOrderSuccessfulReservation={leadingToOrderSuccessfulReservation}
          />
        );
      case 'error':
        return (
          <ResultFailed
            t={t}
            typeOfPayment={typeOfPayment}
            leadingToHomepage={leadingToHomepage}
            leadingToCurrentHouses={leadingToCurrentHouses}
            leadingToCurrentManager={leadingToCurrentManager}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
};

export default Payment;
