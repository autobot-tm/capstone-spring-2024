import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';

const MediumCard = () => {
  return (
    <Row>
      <Col sm={24} md={24} lg={24} xl={24} className="mediumcard">
        <div className="img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=2643&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="content-wrapper">
            <h4>Lorem ipsum dolor sit.</h4>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aperiam ipsum nesciunt
              itaque, delectus velit laborum quam blanditiis sapiente nobis?
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MediumCard;
