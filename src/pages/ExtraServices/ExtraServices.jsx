import './styles.scss';
import { Breadcrumb, Card, Col, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Caption, Headline, Paragraph, SubHeading } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import {
  FileProtectOutlined,
  HomeOutlined,
  SmileOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Layout } from '../../hoc/Layout/Layout';
import UtilityBill from './components/UtilityBill/UtilityBill';
import ResidenceRegistration from './components/ResidenceRegistration/ResidenceRegistration';
import { getExtraServices } from '../../services/apis/extra-services.service';
import useSWR from 'swr';

const ExtraServices = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [services, setServices] = useState('');

  const handleCardClick = cardName => {
    setSelectedCard(cardName);
  };

  const { data: extraServices } = useSWR('/api/extra-services', async () => {
    try {
      const res = await getExtraServices();
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching extra services:', error);
      throw new Error('Failed to fetch extra services');
    }
  });
  console.log('services', services);

  useEffect(() => {
    if (extraServices) {
      setServices(extraServices);
    }
  }, [extraServices]);

  const requestSuccessfullyNoti = () => {
    return notification.open({
      message: (
        <Paragraph size={230} classNames="color-black" strong>
          Extra Services Request
        </Paragraph>
      ),
      description: 'Your request has been successful!',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };

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
        <Row justify="center" gutter={[0, 30]}>
          <Col xs={24} style={{ textAlign: 'center' }}>
            <Headline strong classNames="d-block">
              We Provide Professional
            </Headline>
            <Headline strong>Business Solutions</Headline>
            <Caption size={140} classNames="d-block" style={{ marginTop: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore.
            </Caption>
            <Caption size={140}>
              Nec nam aliquam sem et tortor consequat id porta. Praesent tristique magna.
            </Caption>
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
                    Utility Bill Collection
                  </SubHeading>
                  <ThunderboltOutlined className="es-icon-primary" style={{ fontSize: 30 }} />
                </span>
                <span>
                  <a href="#" className="primary-link">
                    Read More
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
                    Residence Registration
                  </SubHeading>
                  <FileProtectOutlined className="es-icon-tertiary" style={{ fontSize: 30 }} />
                </span>
                <span>
                  <a href="#" className="tertiary-link">
                    Read More
                  </a>
                </span>
              </div>
            </Card>
          </Col>
          <Col xs={24} className="es-section-detail">
            {selectedCard === 'utility' && (
              <UtilityBill
                electricity={services[0]}
                water={services[1]}
                alert={requestSuccessfullyNoti}
              />
            )}
            {selectedCard === 'residence' && (
              <ResidenceRegistration residence={services[2]} alert={requestSuccessfullyNoti} />
            )}
          </Col>
        </Row>
      </main>
    </Layout>
  );
};

export default ExtraServices;
