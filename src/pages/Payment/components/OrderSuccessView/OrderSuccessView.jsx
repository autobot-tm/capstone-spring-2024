import { Breadcrumb, Button, Col, Row } from 'antd';
import { Layout } from '../../../../hoc/Layout/Layout';
import './style.scss';
import React from 'react';
import { Headline, Paragraph } from '../../../../components/Typography';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const OrderSuccessView = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <header id="header-checkout">
        <Row className="header-row" align="middle">
          <Col xs={24} sm={12}>
            <Headline size={450} strong>
              {t('reservation.checkout')}
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
                  title: `${t('reservation.checkout')}`,
                },
              ]}
            />
          </Col>
        </Row>
      </header>
      <Row id="order-container">
        <Col xs={24}>
          <Headline size={450} strong>
            Thank you. Your order has been received.
          </Headline>
        </Col>
        <Col xs={24}>
          <Paragraph> Order: </Paragraph>
          <Paragraph strong> 1111 </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> Date: </Paragraph>
          <Paragraph strong> 28. January 2024. </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> Email: </Paragraph>
          <Paragraph strong> username@gmail.com </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> Total: </Paragraph>
          <Paragraph strong> 1000.00$ </Paragraph>
        </Col>
        <Col xs={24}>
          <Paragraph> Payment method: </Paragraph>
          <Paragraph strong> Direct bank transfer </Paragraph>
        </Col>
        <Col xs={24}>
          <Button className="return-btn">
            {' '}
            <Paragraph classNames="color-black" strong>
              Return to User Dashboard
            </Paragraph>
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default OrderSuccessView;
