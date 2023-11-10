import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Section = () => {
  const { t } = useTranslation();

  return (
    <Row id="section">
      <Col xs={24} sm={24} md={24} lg={8} xl={8} className="about-us">
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="info">
            <span>{t`about-imgdes`}</span>
            <span>{t`about-imgdes2`}</span>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={14} xl={14} className="content">
        <h2>{t`about-title`}</h2>
        <p>
          {t`about-content.line-1`}
          <br />
          {t`about-content.line-2`}
          <br />
          {t`about-content.line-3`}
          <br /> <br />
          {t`about-content.line-4`}
          <br />
          {t`about-content.line-5`}
          <br />
          {t`about-content.line-6`}
          <br />
          {t`about-content.line-7`}
          <br /> <br />
          {t`about-content.line-8`}
          <br />
          {t`about-content.line-9`}
          <br /> <br />
          {t`about-content.line-10`}
          <br /> <br />
          {t`about-content.line-11`}
          <br /> <br />
          {t`about-content.line-12`}
          <br /> <br />
          {t`about-content.line-13`}
        </p>
      </Col>
    </Row>
  );
};

export default Section;
