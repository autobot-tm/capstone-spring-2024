import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout/Layout';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import './styles.scss';
import { Avatar, Col, Row } from 'antd';
import AccountItem from './components/AccountItem/AccountItem';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { Paragraph, SubHeading } from '../../components/Typography';
import AVATAR from '../../assets/images/avatar.png';

const UserDashboard = () => {
  const { t } = useTranslation();
  const { user, loading } = useSelector(state => state.user);
  return (
    <Layout>
      {loading ? (
        <SpinLoading size="large" />
      ) : (
        <>
          <Helmet>
            <title>{t('USER-DASHBOARD.user-dashboard')}</title>
          </Helmet>
          <div className="account-container">
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '56px',
              }}>
              <Avatar src={user?.avatar_url || AVATAR} size={120} />
              <SubHeading size={260} strong>
                {user?.first_name ? user?.first_name : `-`} {user?.last_name ? user?.last_name : `-`}
              </SubHeading>
              <Paragraph>{user?.email}</Paragraph>
            </div>
            <Row gutter={[14, 14]} style={{ marginTop: 56 }} align="center">
              <Col xs={24} sm={12} lg={8}>
                {
                  <AccountItem
                    title={t('label.personal')}
                    des={t('personal.disclaimer')}
                    icon={<IdcardOutlined style={{ fontSize: 30 }} />}
                    route="edit-user-info"
                    type="userInfo"
                  />
                }
              </Col>
              <Col xs={24} sm={12} lg={8}>
                {
                  <AccountItem
                    title={t('label.password')}
                    des={t('password.disclaimer')}
                    icon={<LockOutlined style={{ fontSize: 30 }} />}
                    route="change-password"
                    type="password"
                    auth={user?.auth_method}
                  />
                }
              </Col>
            </Row>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserDashboard;
