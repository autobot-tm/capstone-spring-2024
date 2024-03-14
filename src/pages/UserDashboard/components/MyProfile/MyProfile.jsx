import { Avatar, Row, Col } from 'antd';
import './style.scss';
import React from 'react';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const MyProfile = ({ user, t, avatarDefault }) => {
  console.log(user);
  return (
    <Row gutter={[0, 24]} id="mp-container">
      <Col xs={24} sm={7} style={{ display: 'flex', justifyContent: 'center' }}>
        {user?.avatar ? (
          <Avatar
            src={user?.avatar_url}
            shape="square"
            size={220 | { xs: 100, sm: 150, md: 200 }}
          />
        ) : (
          <Avatar src={avatarDefault} shape="square" size={220 | { xs: 150, md: 200 }} />
        )}
      </Col>
      <Col xs={24} sm={10}>
        <SubHeading size={230} strong>
          {user?.first_name ? user?.first_name : `${t('USER-DASHBOARD.username')}`}
        </SubHeading>
        <Row style={{ marginTop: 20 }}>
          <Col xs={24}>
            <div className="attr-user">
              <span className="attr-user-gap">
                <Paragraph>{t('USER-DASHBOARD.mobile-phone')}:</Paragraph>
                <Paragraph classNames="color-black">
                  {user?.phone_number ? user?.phone_number : '-'}
                </Paragraph>
              </span>
            </div>
            <div className="attr-user">
              <span className="attr-user-gap">
                <Paragraph>{t('USER-DASHBOARD.country')}:</Paragraph>
                <Paragraph classNames="color-black">
                  {user?.country ? user?.country : '-'}
                </Paragraph>
              </span>
            </div>
            <div className="attr-user">
              <span className="attr-user-gap">
                <Paragraph>{t('USER-DASHBOARD.email')}:</Paragraph>
                <Paragraph classNames="color-black">{user?.email}</Paragraph>
              </span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MyProfile;
