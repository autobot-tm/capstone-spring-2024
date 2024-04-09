import './styles.scss';
import { Breadcrumb, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Caption, Headline, Paragraph } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import { Layout } from '../../hoc/Layout/Layout';
import { getExtraServiceRequests, getExtraServices } from '../../services/apis/extra-services.service';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, openShowLeaseModal } from '../../store/slices/modalSlice';
import CardRequest from './components/CardRequest/CardRequest';
import { setExtraServicesRequest } from '../../store/slices/extraServices.slice';
import { getLeasesService } from '../../services/apis/contracts.service';
import { Helmet } from 'react-helmet';

const ExtraServices = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { access_token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);
  const [services, setServices] = useState('');
  const electricity = services[0];
  const water = services[1];
  const residence = services[2];

  const { data: extraServices } = useSWR('/api/extra-services', async () => {
    try {
      const res = await getExtraServices();
      return res;
    } catch (error) {
      console.error('Error fetching extra services:', error);
      throw new Error('Failed to fetch extra services');
    }
  });

  useEffect(() => {
    if (extraServices) {
      setServices(extraServices);
    }
  }, [extraServices]);

  const fetchLeases = async () => {
    const response = await getLeasesService({
      renter_email: user.email,
      offset: 0,
      status: 'ACTIVE',
      limit: 20,
    });
    return response.leases;
  };

  const fetchExtraServiceRequests = async () => {
    const response = await getExtraServiceRequests({ renter_email: user.email });
    return response.extra_service_requests;
  };

  const { data: leasesData } = useSWR('/leases', fetchLeases);
  const { data: extraServiceRequests } = useSWR('/extraServiceRequests', fetchExtraServiceRequests);
  useEffect(() => {
    if (leasesData && extraServiceRequests) {
      dispatch(
        setExtraServicesRequest({
          extraServicesRequests: extraServiceRequests,
        }),
      );
    }
  }, [leasesData, extraServiceRequests]);

  const handleCardClick = type => {
    if (!access_token) {
      dispatch(openLoginModal());
      return;
    }
    let extraServiceId = null;
    switch (type) {
      case 'electricity':
        extraServiceId = electricity?.id;
        break;
      case 'water':
        extraServiceId = water?.id;
        break;
      case 'residence':
        extraServiceId = residence?.id;
        break;
      default:
        extraServiceId = null;
    }
    dispatch(openShowLeaseModal({ extraServiceId, leases: leasesData }));
  };

  return (
    <Layout>
      <Helmet>
        <title>{t('title-tab-ourService')}</title>
      </Helmet>
      <header id="header-extra-services">
        <Row className="header-row" align="middle">
          <Col xs={24} sm={12}>
            <Headline size={600} classNames="title-page" strong>
              {t('EXTRA-SERVICES.our-services')}
            </Headline>
          </Col>
          <Col xs={24} sm={12} className="breadcrumb">
            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: <HomeOutlined style={{ color: 'black' }} />,
                },
                {
                  title: `${t('EXTRA-SERVICES.extra-services')}`,
                },
              ]}
            />
          </Col>
        </Row>
      </header>
      <main id="es-container">
        <Row className="es-wrap" gutter={[0, 30]}>
          <Col xs={24} style={{ textAlign: 'start' }}>
            <Paragraph classNames="color-black">{t('EXTRA-SERVICES.services')}</Paragraph>
            <Headline strong classNames="d-block">
              {t('EXTRA-SERVICES.what-we-do-offer')}
            </Headline>
            <Caption size={140} classNames="d-block" style={{ marginTop: 6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </Caption>
            <Caption size={140}>Nec nam aliquam sem et tortor consequat id porta.</Caption>
          </Col>
        </Row>
        <Row justify="center" gutter={[40, 12]}>
          <Col xs={24} sm={10} md={12} xl={16} className="des-services">
            <Paragraph classNames="right-text">
              {t('EXTRA-SERVICES.des-electricity-be')} {extraServices?.type}{' '}
            </Paragraph>
          </Col>
          <Col xs={24} sm={14} md={12} xl={8}>
            <CardRequest color="#f8a11e" type="electricity" onClickRequest={handleCardClick} t={t} />
          </Col>
        </Row>
        <Row justify="center" gutter={[40, 12]}>
          <Col xs={24} sm={14} md={12} xl={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CardRequest color="#28aae1" type="water" onClickRequest={handleCardClick} t={t} />
          </Col>
          <Col xs={24} sm={10} md={12} xl={16} className="des-services" style={{ justifyContent: 'flex-start' }}>
            <Paragraph> {t('EXTRA-SERVICES.des-water-be')}</Paragraph>
          </Col>
        </Row>
        <Row justify="center" gutter={[40, 12]}>
          <Col xs={24} sm={10} md={12} xl={16} className="des-services">
            <Paragraph classNames="right-text"> {t('EXTRA-SERVICES.des-residence-be')}</Paragraph>
          </Col>
          <Col xs={24} sm={14} md={12} xl={8}>
            <CardRequest color="#ccc" type="residence" onClickRequest={handleCardClick} t={t} />
          </Col>
        </Row>
      </main>
    </Layout>
  );
};

export default ExtraServices;
