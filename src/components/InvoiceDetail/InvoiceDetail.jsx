import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeInvoiceDetailModal } from '../../store/slices/modalSlice';
import { setInvoiceLoading } from '../../store/slices/invoiceSlice';
import { getInvoiceByIdService, payInvoiceById } from '../../services/apis/invoices.service';
import { Button, Table } from 'antd';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Paragraph } from '../Typography';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './InvoiceDetail.module.scss';
import { PAYMENT_METHOD } from '../../constants/payment.constant';

const InvoiceDetail = () => {
  const { t } = useTranslation();
  const invoiceDetailModal = useSelector(state => state.modal.invoiceDetailModal);
  const invoiceId = useSelector(state => state.modal.invoiceId);
  const loading = useSelector(state => state.invoice.loading);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [statusFee, setStatusFee] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (invoiceId) {
      getInvoiceByIdService({ invoiceId }).then(response => {
        setDescription(response.description);
        setAmount(response.amount);
        setItems(response.items);
        setStatusFee(response.status);
        dispatch(setInvoiceLoading({ loading: false }));
      });
    }
  }, [loading]);

  const columns = [
    {
      title: t('label.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('label.price'),
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const additionalItem = {
    description: <b>{t('label.total')}</b>,
    price: <b>{formatCustomCurrency(amount)}</b>,
  };

  const updatedDataSource = [
    ...items.map((item, index) => ({
      key: index,
      description: item.description,
      price: formatCustomCurrency(item.amount),
    })),
    {
      key: items.length,
      description: additionalItem.description,
      price: additionalItem.price,
    },
  ];

  const handlePayFees = async () => {
    if (invoiceId) {
      try {
        const urlCallback = window.location.origin + `/payments/${invoiceId}?typeOfPayment=invoice`;
        console.log('urlCallback INVOICE', urlCallback);
        const response_url = await payInvoiceById({
          id: invoiceId,
          gateway_provider: PAYMENT_METHOD.VNPAY,
          callback_base_url: urlCallback,
        });
        return (window.location.href = response_url);
      } catch (error) {
        console.warn('Error at handle pay fees', error);
      }
    }
  };

  return (
    <CustomModal
      width={650}
      nameOfModal={invoiceDetailModal}
      title={description}
      action={closeInvoiceDetailModal}
      footer={[
        statusFee === 'PENDING' && (
          <Button
            type="primary"
            key=""
            onClick={handlePayFees}
            block
            size="large"
            loading={loading ? true : false}
            disabled={loading ? true : false}>
            <Paragraph strong style={{ color: 'white' }}>
              {!loading && t('button.pay') + ' ' + formatCustomCurrency(amount)}
            </Paragraph>
          </Button>
        ),
      ]}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingOutlined size="large" />
        </div>
      ) : (
        <Table pagination={false} columns={columns} dataSource={updatedDataSource} />
      )}
    </CustomModal>
  );
};

export default InvoiceDetail;
