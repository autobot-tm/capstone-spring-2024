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
import { Paragraph } from '../../../../components/Typography';
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
      <Menu.Item onClick={() => navigate('/')} style={{ marginRight: 'auto', padding: 0 }}>
        <h1>Logo</h1>
      </Menu.Item>
      <Menu.Item key={routeNames.Home} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {' '}
          {t('home').toUpperCase()}
        </Paragraph>
      </Menu.Item>
      <Menu.Item key={routeNames.About} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {' '}
          {t('about').toUpperCase()}
        </Paragraph>
      </Menu.Item>
      <Menu.Item key={routeNames.Contact} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {' '}
          {t('contact').toUpperCase()}{' '}
        </Paragraph>
      </Menu.Item>

      <Menu.Item style={{ marginLeft: 'auto', padding: 0 }}>
        <Button
          type="text"
          style={{ margin: 0 }}
          icon={<UserOutlined style={{ fontSize: 16 }} />}
          onClick={() => dispatch(openLoginModal())}>
          <Paragraph classNames="color-black" strong>
            {t('join-us').toUpperCase()}
          </Paragraph>
        </Button>
      </Menu.Item>

      <Menu.Item key="translation">
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
