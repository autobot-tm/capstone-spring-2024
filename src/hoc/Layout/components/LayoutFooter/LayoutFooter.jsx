import React from 'react';
import { Layout } from 'antd';
import './styles.scss';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import logo from '../../../../assets/images/logo_footer.png';

const { Footer } = Layout;
export const LayoutFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer className="footer">
      <Row className="footer-top">
        <Col xs={24} sm={20} md={12} lg={12} xl={12} className="footer-container">
          {t`top-footer`}
        </Col>
      </Row>

      <Row className="footer-bottom footer-container">
        <Col className="footer-logo-container" xs={24} sm={24} md={6} lg={6} xl={5}>
          <img src={logo} alt="logo" />
        </Col>

        <Col className="footer-address-container" xs={24} sm={24} md={12} lg={12} xl={14}>
          <p>
            {t`bottom-footer-address.line-1`} <br />
            {t`bottom-footer-address.line-2`} <br />
            {t`bottom-footer-address.line-3`} <br />
            {t`bottom-footer-address.line-4`} <br />
            {t`bottom-footer-address.line-5`} <br />
            {t`bottom-footer-address.line-6`} <br /> <br />
            {t`bottom-footer-address.line-7`}
          </p>
        </Col>

        <Col className="footer-contact-container" xs={24} sm={24} md={6} lg={6} xl={5}>
          <p>
            {t`top-section-contact-1`}: 028 3827 5068
            <br />
            {t`top-section-contact-2`}: +84(0)28 3827 5068
            <br />
          </p>
        </Col>
      </Row>
    </Footer>
  );
};
