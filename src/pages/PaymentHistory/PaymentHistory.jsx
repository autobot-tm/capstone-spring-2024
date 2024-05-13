import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Divider, Table } from 'antd';
import { getPaymentsService } from '../../services/apis/payments.service';
import { formatCustomCurrency } from '../../utils/number-seperator';
import moment from 'moment';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import { SubHeading } from '../../components/Typography';
import PaymentType from './components/PaymentType/PaymentType';
import PaymentProvider from './components/PaymentProvider/PaymentProvider';

const PaymentHistory = () => {
  const { t } = useTranslation();
  const LIMIT = 100;
  const [data, setData] = useState([]);

  useEffect(() => {
    getPaymentsService({ limit: LIMIT, offset: 0 })
      .then(response => setData(response.payments))
      .catch(error => console.log(error));
  }, []);

  const columns = [
    {
      title: t('label.status'),
      dataIndex: 'status',
      key: 'status',
      render: status => <PaymentStatus status={status} />,
      filters: [
        {
          text: t('status.PENDING'),
          value: 'PENDING',
        },
        {
          text: t('status.SUCCESS'),
          value: 'SUCCESS',
        },
        {
          text: t('status.FAILED'),
          value: 'FAILED',
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: t('label.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: amount => formatCustomCurrency(amount),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t('label.date'),
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date).format('H:mm -  DD/MM/YYYY'),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    { title: t('label.content'), dataIndex: 'content', key: 'content', render: content => content },
    {
      title: t('label.paymentMethod'),
      dataIndex: 'method',
      key: 'method',
      render: method => <PaymentMethod method={method} />,
      filters: [
        {
          text: t('paymentMethod.ATM'),
          value: 'ATM',
        },
        {
          text: t('paymentMethod.QR_CODE'),
          value: 'QR_CODE',
        },
      ],
      onFilter: (value, record) => record.method === value,
    },
    {
      title: t('label.gatewateProvider'),
      dataIndex: 'gatewayProvider',
      key: 'gatewayProvider',
      render: gatewayProvider => <PaymentProvider provider={gatewayProvider} />,
      filters: [
        {
          text: 'MOMO',
          value: 'MOMO',
        },
        {
          text: 'VNPAY',
          value: 'VNPAY',
        },
      ],
      onFilter: (value, record) => record.gatewayProvider === value,
    },
    {
      title: t('label.paymentType'),
      dataIndex: 'type',
      key: 'type',
      render: type => <PaymentType type={type} />,
      filters: [
        {
          text: t('type.RESERVATION'),
          value: 'RESERVATION',
        },
        {
          text: t('type.DEPOSIT'),
          value: 'DEPOSIT',
        },
        {
          text: t('type.INVOICE'),
          value: 'INVOICE',
        },
        {
          text: t('type.REFUND'),
          value: 'REFUND',
        },
      ],
      onFilter: (value, record) => record.type === value,
    },
  ];

  const dataSource = data?.map((item, index) => ({
    key: index,
    status: item.status,
    date: item.created_at,
    type: item.type,
    method: item.method,
    gatewayProvider: item.gateway_provider,
    amount: item.amount,
    content: item.content,
  }));
  return (
    <Layout>
      <div className="paymentHistory-container">
        <div style={{ marginTop: '60px' }}>
          <SubHeading size={260} strong>
            {t('label.paymentHistory')}
          </SubHeading>
          <Divider />
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              showSizeChanger: false,
              onChange: () => window.scrollTo(0, 0),
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PaymentHistory;
