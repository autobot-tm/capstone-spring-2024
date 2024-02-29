import './style.scss';
import { Avatar, Col, Input, Row, Select } from 'antd';
import React from 'react';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import UploadFile from '../../../../components/UploadFile/UploadFile';

const EditProfile = () => {
  return (
    <>
      <Row id="edit-profile" gutter={[32, 44]}>
        <Col xs={24} className="line">
          <SubHeading size={230} strong>
            <UserOutlined className="icon" /> General info
          </SubHeading>
        </Col>
        <Col xs={3} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Profile image:
          </Paragraph>
          <Avatar
            src="https://i.ibb.co/vmJ9bpt/IMG-7379.png"
            shape="square"
            className="avatar-user"
          />
        </Col>
        <Col xs={21} className="upload-file">
          <UploadFile />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Full name:
          </Paragraph>
          <Input placeholder="username" />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Last name:
          </Paragraph>
          <Input />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Password:
          </Paragraph>
          <Input />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Reset Password:
          </Paragraph>
          <Input />
        </Col>
        <Col xs={24} className="line">
          <SubHeading size={230} strong>
            <InfoCircleOutlined className="icon" /> Contact info
          </SubHeading>
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Address:
          </Paragraph>
          <Input />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Email:
          </Paragraph>
          <Input placeholder="username@gmail.com" disabled />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Mobile Phone:
          </Paragraph>
          <Input />
        </Col>
        <Col xs={24} md={12} className="flex-item">
          <Paragraph classNames="color-black" strong>
            Gender:
          </Paragraph>
          <Select
            style={{ width: '20%' }}
            defaultValue="1"
            options={[
              {
                value: '1',
                label: 'Male',
              },
              {
                value: '2',
                label: 'Female',
              },
            ]}
          />
        </Col>
      </Row>
      <Row justify="center">
        <BaseButton style={{ width: '15%' }} type="primary">
          Update Profile
        </BaseButton>
      </Row>
    </>
  );
};

export default EditProfile;
