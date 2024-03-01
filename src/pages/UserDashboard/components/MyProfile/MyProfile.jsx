import { Avatar, Row, Col } from 'antd';
import './style.scss';
import React from 'react';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const MyProfile = () => {
  return (
    <Row gutter={[12, 24]}>
      <Col xs={24} lg={7}>
        <Avatar
          src="https://i.ibb.co/vmJ9bpt/IMG-7379.png"
          shape="square"
          className="avatar-user"
        />
      </Col>
      <Col xs={24} lg={17}>
        <SubHeading size={230} strong>
          username
        </SubHeading>
        <Row style={{ marginTop: 30 }}>
          <Col xs={6}>
            <Paragraph classNames="d-block">Office phone:</Paragraph>
            <Paragraph classNames="d-block">Mobile phone:</Paragraph>
            <Paragraph classNames="d-block">Address:</Paragraph>
            <Paragraph classNames="d-block">Email:</Paragraph>
          </Col>
          <Col xs={6}>
            <Paragraph classNames="color-black d-block">-</Paragraph>
            <Paragraph classNames="color-black d-block">-</Paragraph>
            <Paragraph classNames="color-black d-block">-</Paragraph>
            <Paragraph classNames="color-black d-block">username@gmail.com</Paragraph>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MyProfile;
