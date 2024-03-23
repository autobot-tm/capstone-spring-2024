import './styles.scss';
import { Breadcrumb, Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Caption, Headline, Paragraph, SubHeading } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import { FileProtectOutlined, HomeOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Layout } from '../../hoc/Layout/Layout';
import UtilityBill from './components/UtilityBill/UtilityBill';
import ResidenceRegistration from './components/ResidenceRegistration/ResidenceRegistration';
import { getExtraServices } from '../../services/apis/extra-services.service';
import useSWR from 'swr';
import { useDispatch } from 'react-redux';

const ExtraServices = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [services, setServices] = useState('');
  const dispatch = useDispatch();
  const handleCardClick = cardName => {
    setSelectedCard(cardName);
  };

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

  return (
    <Layout>
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
          <Col xs={24} className="es-section">
            <Card
              onClick={() => handleCardClick('utility')}
              hoverable
              className="cs-card"
              style={{
                // width: 320,
                border: selectedCard === 'utility' ? '2px solid #f8a11e' : 'none',
              }}>
              <div className="content-card">
                <span className="content-card-top">
                  <SubHeading size={230} strong style={{ width: '60%' }}>
                    {t('EXTRA-SERVICES.utility-card')}
                  </SubHeading>
                  <ThunderboltOutlined className="es-icon-primary" style={{ fontSize: 30 }} />
                </span>
                <span>
                  <a href="#" className="primary-link">
                    {t('EXTRA-SERVICES.read-more')}
                  </a>
                </span>
              </div>
            </Card>
            <Card
              hoverable
              className="cs-card"
              onClick={() => handleCardClick('residence')}
              style={{
                // width: 320,
                border: selectedCard === 'residence' ? '2px solid #28aae1' : 'none',
              }}>
              <div className="content-card">
                <span className="content-card-top">
                  <SubHeading size={230} strong style={{ width: '60%' }}>
                    {t('EXTRA-SERVICES.residence-card')}
                  </SubHeading>
                  <FileProtectOutlined className="es-icon-tertiary" style={{ fontSize: 30 }} />
                </span>
                <span>
                  <a href="#" className="tertiary-link">
                    {t('EXTRA-SERVICES.read-more')}
                  </a>
                </span>
              </div>
            </Card>
          </Col>
          <Col xs={24} className="es-section-detail">
            {selectedCard === 'utility' && (
              <UtilityBill
                dispatch={dispatch}
                electricity={services[0]}
                water={services[1]}
                t={t}
              />
            )}
            {selectedCard === 'residence' && (
              <ResidenceRegistration dispatch={dispatch} residence={services[2]} t={t} />
            )}
          </Col>
        </Row>
      </main>
    </Layout>
  );
};

export default ExtraServices;
