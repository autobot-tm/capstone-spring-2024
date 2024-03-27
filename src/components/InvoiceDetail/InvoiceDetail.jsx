import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeInvoiceDetailModal } from '../../store/slices/modalSlice';
import { setInvoiceLoading } from '../../store/slices/invoiceSlice';
import { getInvoiceByIdService } from '../../services/apis/invoices.service';
import { Button, Table } from 'antd';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Paragraph } from '../Typography';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './InvoiceDetail.module.scss';

const InvoiceDetail = () => {
  const { t } = useTranslation();
  const invoiceDetailModal = useSelector(state => state.modal.invoiceDetailModal);
  const invoiceId = useSelector(state => state.modal.invoiceId);
  const loading = useSelector(state => state.invoice.loading);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (invoiceId) {
      getInvoiceByIdService({ invoiceId }).then(response => {
        setDescription(response.description);
        setAmount(response.amount);
        setItems(response.items);
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

  return (
    <CustomModal
      width={650}
      nameOfModal={invoiceDetailModal}
      title={description}
      action={closeInvoiceDetailModal}
      footer={[
        <Button type="primary" key="" onClick={() => {}} block size="large">
          <Paragraph strong style={{ color: 'white' }}>
            {t('button.pay') + ' ' + formatCustomCurrency(amount)}
          </Paragraph>
        </Button>,
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
