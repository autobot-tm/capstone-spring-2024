import React, { useState } from 'react';
import './style.scss';
import { Breadcrumb, Col, Modal, Row, Tabs } from 'antd';
import { Headline, Paragraph } from '../../components/Typography';
import {
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout/Layout';
import EditProfile from './components/EditProfile/EditProfile';
import MyWishlist from './components/MyWishlist/MyWishlist';
import MyProfile from './components/MyProfile/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmLogoutModal, openConfirmLogoutModal } from '../../store/slices/modalSlice';
import { signOut } from '../../store/slices';
import MyOrder from './components/MyOrder/MyOrder';
import { Helmet } from 'react-helmet';
const { TabPane } = Tabs;
const UserDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.modal.signOutModal);
  const [activeTabKey, setActiveTabKey] = useState('1');

  const handleTabChange = key => {
    setActiveTabKey(key);
  };

  const handleOk = () => {
    dispatch(closeConfirmLogoutModal());
    dispatch(signOut());
  };

  const handleCancel = () => {
    dispatch(closeConfirmLogoutModal());
    setActiveTabKey('1');
  };

  const tabPanes = [
    {
      title: (
        <>
          <Row justify="center">
            <UserOutlined className="icon-tab-item" />
          </Row>
          <Row>My Profile</Row>
        </>
      ),
      key: '1',
    },
    {
      title: (
        <>
          <Row justify="center">
            <SettingOutlined className="icon-tab-item" />
          </Row>
          <Row>Edit Profile</Row>
        </>
      ),
      key: '2',
    },
    {
      title: (
        <>
          <Row justify="center">
            <HeartOutlined className="icon-tab-item" />
          </Row>
          <Row> My Wishlist</Row>
        </>
      ),
      key: '3',
    },
    {
      title: (
        <>
          <Row justify="center">
            <MoneyCollectOutlined className="icon-tab-item" />
          </Row>
          <Row> My Order</Row>
        </>
      ),
      key: '4',
    },
    {
      title: (
        <div onClick={() => dispatch(openConfirmLogoutModal())}>
          <Row justify="center">
            <LogoutOutlined className="icon-tab-item" />
          </Row>
          <Row>Log Out</Row>
        </div>
      ),
      key: '5',
    },
  ];
  return (
    <Layout>
      <Helmet>
        <title>{t('USER-DASHBOARD.user-dashboard')}</title>
      </Helmet>
      <header id="header-user-dashboard">
        <Row className="header-row" align="middle">
          <Col xs={24} sm={12}>
            <Headline size={450} strong>
              {t('USER-DASHBOARD.user-dashboard')}
            </Headline>
          </Col>
          <Col xs={24} sm={12} className="breadcrumb">
            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: <HomeOutlined style={{ color: 'black' }} />,
                },
                {
                  title: `${t('USER-DASHBOARD.user-dashboard')}`,
                },
              ]}
            />
          </Col>
          <Col xs={24}>
            <Row className="tabs-bar" justify="center">
              <Tabs
                activeKey={activeTabKey}
                onChange={handleTabChange}
                className="tabs-bar-inner"
                centered>
                {tabPanes.map(pane => (
                  <TabPane
                    tab={
                      <Paragraph classNames="color-black" strong>
                        {pane.title}
                      </Paragraph>
                    }
                    key={pane.key}
                  />
                ))}
              </Tabs>
            </Row>
          </Col>
        </Row>
      </header>
      <main id="container-user-dashboard">
        <Row justify="center">
          <Col xs={24}>
            {activeTabKey === '1' && <MyProfile />}
            {activeTabKey === '2' && <EditProfile />}
            {activeTabKey === '3' && <MyWishlist />}
            {activeTabKey === '4' && <MyOrder />}
            {activeTabKey === '5' && (
              <Modal
                title="Confirm Logout"
                open={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
                centered>
                <p>Are you sure you want to log out?</p>
              </Modal>
            )}
          </Col>
        </Row>
      </main>
    </Layout>
  );
};

export default UserDashboard;
