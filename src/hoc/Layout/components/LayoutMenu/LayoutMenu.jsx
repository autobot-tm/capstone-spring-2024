import React, { useEffect } from 'react';
import { Button, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../../../store/slices/modalSlice';
export const LayoutMenu = () => {
  const dispatch = useDispatch();
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
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      className="menu"
      style={{
        padding: 0,
      }}>
      <Menu.Item style={{ marginRight: 'auto', padding: 0 }}>
        <h1>Logo</h1>
      </Menu.Item>
      <Menu.Item key={routeNames.Home} className="menuItem" onClick={onItemClick}>
        {t('home')}
      </Menu.Item>
      <Menu.Item key={routeNames.About} className="menuItem" onClick={onItemClick}>
        {t('about')}
      </Menu.Item>
      <Menu.Item key={routeNames.Contact} className="menuItem" onClick={onItemClick}>
        Contact
      </Menu.Item>

      <Menu.Item style={{ marginLeft: 'auto', padding: 0 }}>
        <Button type="text" icon={<UserOutlined />} onClick={() => dispatch(openLoginModal())}>
          JOIN US
        </Button>
      </Menu.Item>

      <Menu.Item key="translation">
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
