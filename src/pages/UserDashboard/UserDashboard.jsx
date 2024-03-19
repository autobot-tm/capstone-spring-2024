import React, { useEffect, useState } from 'react';
import './style.scss';
import { Breadcrumb, Col, Modal, Row, Tabs } from 'antd';
import { Headline, Paragraph } from '../../components/Typography';
import {
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
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
import { Helmet } from 'react-helmet';
import AVATAR from '../../assets/images/avatar.svg';
import { useUserSlice } from '../../store/slices/user.slice';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

const { TabPane } = Tabs;

const UserDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.modal.signOutModal);
  const { access_token } = useSelector(state => state.auth);
  const { user, loading } = useSelector(state => state.user);
  const { actions: userActions } = useUserSlice();
  const [activeTabKey, setActiveTabKey] = useState('1');

  console.log(user);

  useEffect(() => {
    if (access_token) {
      dispatch(userActions.getUserProfile());
    }
  }, [access_token]);

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
          <Row>{t('USER-DASHBOARD.my-profile')}</Row>
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
          <Row>{t('USER-DASHBOARD.edit-profile')}</Row>
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
          <Row>{t('USER-DASHBOARD.my-wishlist')}</Row>
        </>
      ),
      key: '3',
    },
    {
      title: (
        <div onClick={() => dispatch(openConfirmLogoutModal())}>
          <Row justify="center">
            <LogoutOutlined className="icon-tab-item" />
          </Row>
          <Row>{t('USER-DASHBOARD.log-out')}</Row>
        </div>
      ),
      key: '4',
    },
  ];

  const handleProfileUpdate = async () => {
    setActiveTabKey('1');
  };
  return (
    <Layout>
      {loading ? (
        <SpinLoading size="large" />
      ) : (
        <>
          <Helmet>
            <title>{t('USER-DASHBOARD.user-dashboard')}</title>
          </Helmet>
          <header id="header-user-dashboard">
            <Row className="header-row" align="middle" justify="center">
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
                <Tabs
                  activeKey={activeTabKey}
                  onChange={handleTabChange}
                  className="tabs-bar"
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
              </Col>
            </Row>
          </header>
          <main id="container-user-dashboard">
            <Row justify="center">
              <Col xs={24}>
                {activeTabKey === '1' && <MyProfile user={user} t={t} avatarDefault={AVATAR} />}
                {activeTabKey === '2' && (
                  <EditProfile
                    user={user}
                    t={t}
                    avatarDefault={AVATAR}
                    onUpdate={handleProfileUpdate}
                  />
                )}
                {activeTabKey === '3' && <MyWishlist />}
                {activeTabKey === '4' && (
                  <Modal
                    title="Confirm Logout"
                    open={showModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    centered>
                    <p>Are you sure you want to log ousst?</p>
                  </Modal>
                )}
              </Col>
            </Row>
          </main>
        </>
      )}
    </Layout>
  );
};

export default UserDashboard;
