import React from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { Col, Row } from 'antd';
import { Headline, Paragraph, SubHeading } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import ContactForm from './components/ContactForm/ContactForm';

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <header id="header-contact-us">
        <Row className="header-row" align="middle">
          <Headline size={600} classNames="title-page" strong>
            {t('CONTACT-US.contact-us')}
          </Headline>
        </Row>
      </header>
      <div className="contactUs-container">
        <Row gutter={[0, 44]} align="center">
          <Col xs={24} md={12}>
            <ContactForm />
          </Col>
          <Col xs={24} md={12}>
            <SubHeading size={260} style={{ paddingLeft: 20 }} strong>
              {t('CONTACT-US.contact-us')}
            </SubHeading>
            <Row className="contactUs-info" gutter={[32, 16]} align="center">
              <Col xs={24} sm={12}>
                <SubHeading size={230} classNames="d-block" strong>
                  {t('CONTACT-US.main-office')}
                </SubHeading>
                <Paragraph classNames="d-block" strong style={{ marginTop: 20 }}>
                  21 Nguyen Trung Ngan St, Ben Nghe W, District 1, HCM City, VN
                </Paragraph>
                <Paragraph classNames="d-block">+028 3827 5068</Paragraph>
                <Paragraph classNames="d-block">+123 456 789 11</Paragraph>
                <Paragraph classNames="d-block">info@aodaihousing.com</Paragraph>
                <Paragraph classNames="d-block" style={{ marginTop: 26 }}>
                  Monday – Friday 09:00 – 20:30{' '}
                </Paragraph>
                <Paragraph classNames="d-block">Saturday 09:00 – 18:00 </Paragraph>
              </Col>
              <Col xs={24} sm={12}>
                <SubHeading size={230} classNames="d-block" strong>
                  {t('CONTACT-US.second-office')}
                </SubHeading>
                <Paragraph classNames="d-block" strong style={{ marginTop: 20 }}>
                  42 W 33rd St, NY 10001, USA
                </Paragraph>
                <Paragraph classNames="d-block">+222 333 444 56</Paragraph>
                <Paragraph classNames="d-block">+987 654 321 33</Paragraph>
                <Paragraph classNames="d-block">newhome@example.com</Paragraph>
                <Paragraph classNames="d-block" style={{ marginTop: 26 }}>
                  Monday – Friday 09:00 – 20:30{' '}
                </Paragraph>
                <Paragraph classNames="d-block">Saturday 09:00 – 18:00 </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ContactUs;
