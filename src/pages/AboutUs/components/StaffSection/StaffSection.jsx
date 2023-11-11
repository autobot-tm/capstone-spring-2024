import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const StaffSection = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="title">
        <h2>{t`about-staff`}</h2>
        <hr />
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="staff-item">
          <Link to="/about">
            <img src="https://picsum.photos/400" alt="staff" className={'staff-item-img'} />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default StaffSection;
