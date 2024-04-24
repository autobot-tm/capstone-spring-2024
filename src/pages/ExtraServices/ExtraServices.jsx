import './styles.scss';
import { Breadcrumb, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Caption, Headline } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import { Layout } from '../../hoc/Layout/Layout';
import { getExtraServiceRequests, getExtraServices } from '../../services/apis/extra-services.service';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { openServiceDetailModal } from '../../store/slices/modalSlice';
import { setExtraService, setExtraServicesRequest } from '../../store/slices/extraServices.slice';
import { Helmet } from 'react-helmet';
import ServiceCard from './components/ServiceCard/ServiceCard';

const ExtraServices = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useSelector(state => state.user);
  const [services, setServices] = useState([]);

  const { data: extraServices } = useSWR('/api/extra-services', async () => {
    try {
      const res = await getExtraServices();
      return res.extra_services;
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
  const fetchExtraServiceRequests = async () => {
    try {
      const response = await getExtraServiceRequests({ renter_email: user.email });
      return response.extra_service_requests;
    } catch (error) {
      console.error('An error occurred while fetching extra service requests:', error);
    }
  };
  const { data: extraServiceRequests } = useSWR('/extraServiceRequests', fetchExtraServiceRequests);
  useEffect(() => {
    if (extraServiceRequests) {
      dispatch(
        setExtraServicesRequest({
          extraServicesRequests: extraServiceRequests,
        }),
      );
    }
  }, [extraServiceRequests]);
  const handleCardClick = service => {
    dispatch(openServiceDetailModal());
    dispatch(setExtraService({ extraServices: service }));
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
        <Row className="es-wrap" gutter={[0, 30]} align="center">
          <Col xs={24} style={{ textAlign: 'center' }}>
            <Headline strong classNames="d-block">
              {t('EXTRA-SERVICES.our').toUpperCase()}{' '}
              <span style={{ color: '#f8a11e' }}>{t('EXTRA-SERVICES.services').toUpperCase()}</span>
            </Headline>
            <Caption size={140} classNames="d-block" style={{ marginTop: 6 }}>
              {t('description-first-service')}
            </Caption>
            <Caption size={140}> {t('description-second-service')}</Caption>
          </Col>
        </Row>
        <Row justify="center" gutter={[24, 24]}>
          {services?.map(service => (
            <Col key={service?.id} xs={24} sm={12} md={6}>
              <ServiceCard
                i18n={i18n}
                onClickCard={handleCardClick}
                id={service.id}
                name={service.name}
                name_in_jp={service.name_in_jp}
                service={service}
              />
            </Col>
          ))}
        </Row>
      </main>
    </Layout>
  );
};

export default ExtraServices;
