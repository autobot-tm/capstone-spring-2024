import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { Col, Menu, Row } from 'antd';
import Contract from './components/Contract/Contract';
import Fee from './components/Fee/Fee';
import Reservation from './components/Reservation/Reservation';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPage, setStatus } from '../../store/slices/reservationSlice';
import { useTranslation } from 'react-i18next';
import { setContractPage, setContractStatus } from '../../store/slices/contractSlice';
import { CarryOutOutlined, FileTextOutlined, PayCircleOutlined } from '@ant-design/icons';
import { setInvoicePage, setInvoiceStatus } from '../../store/slices/invoiceSlice';

const Management = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.reservation.page);
  const contractPage = useSelector(state => state.contract.page);
  const invoicePage = useSelector(state => state.invoice.page);

  // const menuItem = useSelector(state => state.reservation.menuItem);
  const [menuItem, setMenuItem] = useState('contract');
  const { t } = useTranslation();
  console.log(menuItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, contractPage, invoicePage]);

  const items = [
    {
      icon: <FileTextOutlined />,
      label: <b>{t('contract')}</b>,
      key: 'contract',
    },
    {
      icon: <PayCircleOutlined />,
      label: <b>{t('utilityFees')}</b>,
      key: 'fee',
    },
    {
      icon: <CarryOutOutlined />,
      label: <b>{t('reservation')}</b>,
      key: 'reservation',
    },
  ];
  const onClick = e => {
    // dispatch(setMenuItem({ menuItem: e.key }));
    setMenuItem(e.key);

    dispatch(setPage({ page: 1 }));
    dispatch(setStatus({ status: 'ALL' }));
    dispatch(setName({ name: '' }));

    dispatch(setContractPage({ page: 1 }));
    dispatch(setContractStatus({ status: 'ALL' }));

    dispatch(setInvoicePage({ page: 1 }));
    dispatch(setInvoiceStatus({ status: 'ALL' }));
  };

  return (
    <Layout>
      <div className="management-container">
        <div style={{ marginTop: '16px' }}>
          <Row gutter={16}>
            <Col xl={5} xs={24}>
              <Menu
                onClick={onClick}
                selectedKeys={[menuItem]}
                mode="inline"
                items={items}
                className="management-menu"
              />
              <Menu
                onClick={onClick}
                selectedKeys={[menuItem]}
                mode="horizontal"
                items={items}
                className="management-menu2"
              />
            </Col>
            <Col xl={19} xs={24}>
              {menuItem === 'contract' ? (
                <Contract />
              ) : menuItem === 'fee' ? (
                <Fee />
              ) : (
                <Reservation />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Management;
