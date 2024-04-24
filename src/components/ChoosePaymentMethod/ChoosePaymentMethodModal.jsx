import './styles.scss';
import React, { useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { closeChooseMethodPaymentModal, openInvoiceDetailModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { payInvoiceById } from '../../services/apis/invoices.service';
import { PAYMENT_METHOD } from '../../constants/payment.constant';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import VNPAY1 from '../../assets/images/Logo-VNPAY-QR.webp';
import ONEPAY from '../../assets/images/onepay.svg';
import MOMO from '../../assets/images/momoLogo.jpeg';
import BaseButton from '../Buttons/BaseButtons/BaseButton';

const ChoosePaymentMethodModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { chooseMethodPaymentModal, invoiceId } = useSelector(state => state.modal);
  const loading = useSelector(state => state.invoice.loading);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHOD.VNPAY);

  const handleCardSelect = name => {
    setSelectedMethod(name);
  };

  const handleBack = () => {
    dispatch(openInvoiceDetailModal({ invoiceId: invoiceId }));
    dispatch(closeChooseMethodPaymentModal());
  };

  const handlePayFees = async () => {
    if (invoiceId && selectedMethod) {
      try {
        const urlCallback = window.location.origin + `/payments/${invoiceId}?typeOfPayment=invoice`;
        const response_url = await payInvoiceById({
          id: invoiceId,
          gateway_provider: selectedMethod,
          callback_base_url: urlCallback,
        });
        return (window.location.href = response_url);
      } catch (error) {
        console.warn('Error at handle pay fees', error);
      }
    }
  };

  return (
    <>
      <CustomModal
        width={700}
        nameOfModal={chooseMethodPaymentModal}
        title={t('modal.choose-payment-method')}
        action={closeChooseMethodPaymentModal}
        footer={[
          <div className="btn-container" key="">
            <BaseButton style={{ width: 'auto' }} key="" onClick={handleBack} block size="large">
              {t('button.back')}
            </BaseButton>
            <BaseButton
              style={{ width: 'auto' }}
              type="primary"
              key=""
              onClick={handlePayFees}
              block
              size="large"
              loading={loading ? true : false}
              disabled={loading ? true : false}>
              {!loading && t('button.submitPayment')}
            </BaseButton>
          </div>,
        ]}>
        <Row className="payment-method-modal-container" gutter={[24, 16]}>
          <Col
            xs={24}
            sm={7}
            className={`payment-method-card ${selectedMethod === 'VNPAY' ? 'selected' : ''}`}
            onClick={() => handleCardSelect(PAYMENT_METHOD.VNPAY)}>
            <img alt="vnpay" src={VNPAY1} />
          </Col>
          <Col
            xs={24}
            sm={7}
            className={`payment-method-card ${selectedMethod === 'MOMO' ? 'selected' : ''}`}
            onClick={() => handleCardSelect(PAYMENT_METHOD.MOMO)}>
            <img alt="momo" src={MOMO} />
          </Col>
          <Col
            xs={24}
            sm={7}
            className={`payment-method-card ${selectedMethod === 'ONEPAY' ? 'selected' : ''}`}
            // onClick={() => handleCardSelect(PAYMENT_METHOD.ONEPAY)}
          >
            <img alt="onepay" src={ONEPAY} />
          </Col>
        </Row>
      </CustomModal>
    </>
  );
};

export default ChoosePaymentMethodModal;
