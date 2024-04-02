import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  closeInvoiceDetailModal,
  openChooseMethodPaymentModal,
  openContactUsAboutFeeModal,
} from '../../store/slices/modalSlice';
import { setInvoiceLoading } from '../../store/slices/invoiceSlice';
import { getInvoiceByIdService } from '../../services/apis/invoices.service';
import { Col, Image, Popconfirm, Row, Table } from 'antd';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Caption, Headline, Paragraph } from '../Typography';
import { LoadingOutlined, TagsFilled } from '@ant-design/icons';
import './styles.scss';
import BaseButton from '../Buttons/BaseButtons/BaseButton';

const InvoiceDetail = () => {
  const { t } = useTranslation();
  const invoiceDetailModal = useSelector(state => state.modal.invoiceDetailModal);
  const invoiceId = useSelector(state => state.modal.invoiceId);
  const loading = useSelector(state => state.invoice.loading);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [statusFee, setStatusFee] = useState('');
  const [items, setItems] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    if (invoiceId) {
      getInvoiceByIdService({ invoiceId }).then(response => {
        setData(response);
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
    description: <b style={{ color: '#f8a11e' }}>{t('label.total')}</b>,
    price: <b style={{ color: '#f8a11e' }}>{formatCustomCurrency(amount)}</b>,
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

  const confirm = () => {
    dispatch(openContactUsAboutFeeModal());
    dispatch(closeInvoiceDetailModal());
  };
  const cancel = () => {
    dispatch(openChooseMethodPaymentModal());
    dispatch(closeInvoiceDetailModal());
  };

  return (
    <CustomModal
      width={900}
      nameOfModal={invoiceDetailModal}
      title=""
      action={closeInvoiceDetailModal}
      footer={[
        statusFee === 'PENDING' && (
          <Popconfirm
            placement="top"
            onConfirm={confirm}
            onCancel={cancel}
            title={t('popconfirm.confirmation')}
            description={t('popconfirm.ques-about-fee')}
            okText={t('yes')}
            cancelText={t('no')}>
            <BaseButton
              type="primary"
              key=""
              block
              size="large"
              loading={loading ? true : false}
              disabled={loading ? true : false}>
              {!loading && t('button.pay') + ' ' + formatCustomCurrency(amount)}
            </BaseButton>
          </Popconfirm>
        ),
      ]}>
      {loading ? (
        <div className="loading-container">
          <LoadingOutlined size="large" />
        </div>
      ) : (
        <div className="invoice-container">
          <Row className="title-invoice">
            <Col xs={24} sm={18}>
              <Headline classNames="d-block" strong>
                {t('invoice').toUpperCase()}
              </Headline>

              <Caption size={140}>#{data?.id}</Caption>
              <Paragraph classNames="d-block color-black">{data?.description}</Paragraph>
            </Col>

            <Col xs={24} sm={6} style={{ textAlign: 'end' }}>
              <Image
                width={100}
                src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/logo-main.png"></Image>
            </Col>
          </Row>
          <Row className="info-invoice">
            <Col xs={24} sm={8} className="info-invoice-inner">
              <Paragraph strong classNames="d-block color-black">
                {t('invoice.issued')}
              </Paragraph>
              <Paragraph strong classNames="d-block" style={{ marginBottom: 10 }}>
                {data?.lease?.move_in_date}
              </Paragraph>

              <Paragraph strong classNames="d-block color-black">
                {t('invoice.due')}
              </Paragraph>
              <Paragraph strong classNames="d-block ">
                {data?.due_date}
              </Paragraph>
            </Col>
            <Col xs={24} sm={8} className="info-invoice-inner border">
              <Paragraph strong classNames="d-block color-black">
                {t('invoice.billedTo')}
              </Paragraph>
              <Paragraph strong classNames="d-block" style={{ marginBottom: 10 }}>
                {data?.lease?.reservation?.house?.name}
              </Paragraph>
              <Caption strong classNames="d-block" style={{ marginBottom: 10 }}>
                {data?.lease?.reservation?.house?.address}
              </Caption>
              <Paragraph classNames="d-block">
                {' '}
                {t(`detail-house.${data?.lease?.reservation?.house?.category.replace(/\s/g, '')}`)}
                {/* {data?.lease?.reservation?.house?.category} */}
              </Paragraph>
            </Col>
            <Col xs={24} sm={8} className="info-invoice-inner">
              <Paragraph strong classNames="d-block color-black">
                {t('invoice.from')}
              </Paragraph>
              <Paragraph strong classNames="d-block" style={{ marginBottom: 10 }}>
                Lotus | {t('invoice.houseForRent')}
              </Paragraph>
              <Caption strong classNames="d-block" style={{ marginBottom: 10 }}>
                8F Miss Aodai Building, 21 Nguyen Trung Ngan, HCM City
              </Caption>
              <Paragraph classNames="d-block">+028 3827 5068</Paragraph>
            </Col>
          </Row>
          <Row className="content-invoice">
            <Table
              pagination={false}
              columns={columns}
              dataSource={updatedDataSource}
              style={{ width: '100%' }}
            />
          </Row>

          <Row>
            <Col xs={24} style={{ paddingBottom: 10 }}>
              <Paragraph strong classNames="d-block color-black">
                {t('invoice.tks')}!
              </Paragraph>
              <Paragraph classNames="d-block">
                <TagsFilled /> {t('invoice.payWithin15')}
              </Paragraph>
            </Col>
            <Col xs={24} className="footer-invoice">
              <Paragraph strong>Lotus | {t('invoice.houseForRent')}</Paragraph>

              <Paragraph strong>+028 3827 5068</Paragraph>
              <Paragraph strong classNames="color-black">
                info@aodaihousing.com{' '}
              </Paragraph>
            </Col>
          </Row>
        </div>
      )}
    </CustomModal>
  );
};

export default InvoiceDetail;
