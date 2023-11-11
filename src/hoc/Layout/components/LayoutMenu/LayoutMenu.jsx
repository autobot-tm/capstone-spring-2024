import React, { useEffect, useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';

import { useTranslation } from 'react-i18next';
import { BarsOutlined } from '@ant-design/icons';
export const LayoutMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState(routeNames.Home);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const onItemClick = event => {
    const { key } = event;
    if (key === 'translation') {
      return;
    }
    navigate(key);
  };
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <>
      <div className="mobile-menu">
        <Button onClick={toggleDrawer} className="mobile-menu-button">
          <BarsOutlined />
        </Button>
        <Drawer
          title={t('menu')}
          placement="right"
          closable={true}
          onClose={toggleDrawer}
          open={drawerVisible}
          key="left">
          <Menu
            className="mobile-menu-drawer"
            defaultSelectedKeys={[selectedKeys]}
            onClick={onItemClick}
            selectedKeys={[selectedKeys]}>
            <Menu.Item key={routeNames.Home}>{t('home')}</Menu.Item>
            <Menu.Item key={routeNames.About}>{t('about')}</Menu.Item>
            <Menu.Item key={routeNames.News}>{t('news')}</Menu.Item>
            <Menu.ItemGroup>
              <Menu.Item key="translation" className="translation-mobile">
                <TranslationSelector classNames={'translation-selector-mobile'} />
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Drawer>
      </div>
      <div className="desktop-menu">
        <Menu
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={[selectedKeys]}
          onClick={onItemClick}
          selectedKeys={[selectedKeys]}
          className="menu">
          <Menu.Item key={routeNames.Home}>{t('home')}</Menu.Item>
          <Menu.Item key={routeNames.About}>{t('about')}</Menu.Item>
          <Menu.Item key={routeNames.News}>{t('news')}</Menu.Item>
          <Menu.Item key="translation" style={{ marginLeft: 'auto' }}>
            <TranslationSelector />
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
