import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const ColorSection = () => {
  const { t } = useTranslation();
  return (
    <Row id="colorsection">
      <Col xs={24} sm={24} md={24} lg={8} xl={8} className="about-us">
        <div className="image">
          <img
            src="https://ak-d.tripcdn.com/images/200d1a0000018pbcr11F3_R_640_440_R5_D.webp"
            alt=""
          />
          <div className="info">
            <span>{t`about-imgdes`}</span>
            <span>{t`about-imgdes3`}</span>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={14} xl={14} className="content">
        <span>{t`about-content2`}</span>
      </Col>
    </Row>
  );
};

export default ColorSection;
