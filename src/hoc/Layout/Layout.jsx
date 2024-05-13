import { Space, Layout as AntdLayout, Drawer } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutMenu } from './components/LayoutMenu';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserNotification from '../../components/UserNotification/UserNotification';
import { useTranslation } from 'react-i18next';
import { TranslationSelector } from './components/TranslationSelector';
import LOGO from '../../assets/images/logo-Dub9QTYA.png';
const { Header, Content } = AntdLayout;
export const Layout = ({ children }) => {
  const { access_token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout>
        <Header className="layout-header">
          <div className="menuIcon">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MenuOutlined
                onClick={() => {
                  setOpenMenu(true);
                }}
              />
              <div onClick={() => navigate('/')}>
                <div className="logo-container">
                  <img src={LOGO} style={{ width: 44 }} alt="" />
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <TranslationSelector />
                {access_token && <UserNotification t={t} />}
              </div>
            </div>
          </div>
          <span className="headerMenu">
            <LayoutMenu />
          </span>
          <Drawer
            placement="left"
            open={openMenu}
            onClose={() => {
              setOpenMenu(false);
            }}>
            <LayoutMenu isInline />
          </Drawer>
        </Header>
        <Content style={{ background: 'white', paddingBottom: 100 }}>{children}</Content>
        <LayoutFooter />
      </AntdLayout>
    </Space>
  );
};
