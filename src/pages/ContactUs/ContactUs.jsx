import React from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { Button, Col, Form, Row, Select } from 'antd';
import { Headline, SubHeading } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <header id="header-contact-us">
        <Row className="header-row" align="middle">
          <Headline size={600} classNames="title-page" strong>
            {t('contactUs')}
          </Headline>
        </Row>
      </header>
      <div className="contactUs-container">
        <Row>
          <Col lg={12}>
            <SubHeading size={260} strong>
              Send Us a Message
            </SubHeading>
            <div>
              <Form>
                <Form.Item>
                  <Select placeholder="Select your house" />
                </Form.Item>
                <Form.Item>
                  <Select placeholder="Select category" />
                </Form.Item>
                <Form.Item>
                  <TextArea rows={4} placeholder="Message" maxLength={200} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col lg={12}></Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ContactUs;
