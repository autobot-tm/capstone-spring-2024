import React from 'react';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DoubleRightOutlined } from '@ant-design/icons';

export const LayoutTopSection = () => {
  const { t } = useTranslation();
  return (
    <Layout id="layout-top-section">
      <Content className="container">
        <Row gutter={12}>
          <Col className="logo" xs={24} sm={24} md={6}>
            <Link to="/">
              <div className="navbar-brand"></div>
            </Link>
          </Col>

          <Col className="info hide-on-sm" xs={0} sm={0} md={6}>
            <p className="info-text">
              {t`top-section-establishment.line-1`}
              <br />
              {t`top-section-establishment.line-2`}
              <br />
              {t`top-section-establishment.line-3`}
              <br />
              {t`top-section-establishment.line-4`}
            </p>
          </Col>

          <Col className="contact hide-on-sm" sm={0} md={5}>
            <FontAwesomeIcon className="contact-phone-icon" icon={faPhone} />
            <div className="contact-info">
              <p className="contact-info-group">
                <span>
                  {t`top-section-contact-1`}:{' '}
                  <a href="tel:028 3827 5068" className="contact-link">
                    {' '}
                    028 3827 5068
                  </a>
                </span>
              </p>
              <p className="contact-info-group">
                <span>
                  {t`top-section-contact-2`}:
                  <a href="tel: +84(0)28 3827 5068" className="contact-link">
                    {' '}
                    +84(0)28 3827 5068
                  </a>
                </span>
              </p>
            </div>
          </Col>

          <Col className="contact-button-container hide-on-sm" sm={0} md={6}>
            <Link to="/" className="contact-button">
              <p className="contact-button-text">{t`top-section-support`}</p>
              <DoubleRightOutlined className="contact-button-icon" />
            </Link>
          </Col>
          <Col className="phone-container hide-upper-sm" xs={24} sm={24} md={0}>
            <a className="phone-header" href="tel:+842838275068">
              <FontAwesomeIcon className="phone-icon" icon={faPhone} />
              <span>+84(0)28 3827 5068</span>
            </a>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
