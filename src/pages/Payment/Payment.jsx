import React, { useEffect, useState } from 'react';
import './styles.scss';
import { VNPayTransactionStatus } from '../../constants/vnpay.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { routeNames } from '../../config';
import { useTranslation } from 'react-i18next';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import ResultSuccessfully from './components/ResultSucessfully/ResultSuccessfully';
import ResultFailed from './components/ResultFailed/ResultFailed';
import {
  // getReservationById,
  getReservationIdByHouseIdService,
} from '../../services/apis/payments.service';

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
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();
  const { house_id: house_id } = useParams();
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

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await getReservationIdByHouseIdService({
          house_id,
          status: 'PAYMENT_COMPLETE',
        });
        if (res && res.reservations && res.reservations.length > 0) {
          const reservationId = res.reservations[0].id;
          setReservation(reservationId);
        } else {
          console.log('No reservation found');
        }

        // const order = await getReservationById(reservationId);
        // console.log(order);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    fetchReservation();
  }, [house_id]);

  console.log('Reservation ID:', reservation);
  const leadingHomepage = () => {
    navigate(routeNames.Home);
  };

  const leadingOrderSuccess = () => {
    navigate(`/payments/${house_id}?reservation_id=${reservation}`);
  };

  const leadingHouses = () => {
    navigate('/houses/' + house_id);
  };

  const renderStep = () => {
    switch (step) {
      case 'payment':
        return <PaymentView handleUrlChange={handleUrlChange} />;
      case 'success':
        return (
          <ResultSuccessfully
            t={t}
            reservation={reservation}
            leadingHomepage={leadingHomepage}
            leadingOrderSuccess={leadingOrderSuccess}
          />
        );
      case 'error':
        return (
          <ResultFailed t={t} leadingHomepage={leadingHomepage} leadingHouses={leadingHouses} />
        );
      default:
        return null;
    }
  };

  return renderStep();
};

export default Payment;
