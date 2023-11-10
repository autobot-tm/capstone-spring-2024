import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const LayoutTopSection = () => {
  const { t } = useTranslation();
  return (
    <Layout id="layout-top-section">
      <Content className="container">
        <Row>
          <Col className="ant-col" xs={24} sm={24} md={5} lg={5} xl={5}>
            <div className="navbar-brand"></div>
          </Col>

          <Col className="ant-col ant-col-xs" xs={24} sm={24} md={6} lg={6} xl={6}>
            <a className="phone-header-section" href="tel:+842838275068">
              +84(0)28 3827 5068
            </a>
          </Col>

          <Col className="ant-col ant-col-xl" xs={0} sm={0} md={4} lg={4} xl={4}>
            <p style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
              {t`top-section-establishment.line-1`}
              <br />
              {t`top-section-establishment.line-2`}
              <br />
              {t`top-section-establishment.line-3`}
              <br />
              {t`top-section-establishment.line-4`}
            </p>
          </Col>

          <Col className="ant-col ant-col-xl ant-col-lg" xs={24} sm={24} md={7} lg={7} xl={7}>
            <div className="contact-layout">
              <i>
                <FontAwesomeIcon className="phone-icon" icon={faPhone} />
              </i>
              <span>
                {t`top-section-contact-1`}:<a href="tel:028 3827 5068"> 028 3827 5068</a> <br />
                {t`top-section-contact-2`}:<a href="tel: +84(0)28 3827 5068"> +84(0)28 3827 5068</a>
              </span>
            </div>
          </Col>

          <Col className="ant-col ant-col-xl ant-col-lg" md={6} lg={6} xl={6} span={6}>
            <Button
              size="small"
              className="btn-top-section"
              type="primary"
              onBlur={() => {
                alert('Đang chuyển đến Contact page');
              }}>
              <span className="btn-component-section">
                <p>{t`top-section-support`}</p>
                <DoubleRightOutlined style={{ fontSize: '30px' }} />
              </span>
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
