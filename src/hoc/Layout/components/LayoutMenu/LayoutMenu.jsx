import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
export const LayoutMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = React.useState(routeNames.Home);
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
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={[selectedKeys]}
      onClick={onItemClick}
      selectedKeys={[selectedKeys]}
      className="menu">
      <Menu.Item key={routeNames.Home}>{t('home')}</Menu.Item>
      <Menu.Item key={routeNames.About}>{t('about')}</Menu.Item>
      <Menu.Item key="translation" style={{ marginLeft: 'auto' }}>
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
