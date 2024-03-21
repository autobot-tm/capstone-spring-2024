import React, { useState, useEffect } from 'react';
import { Avatar, Button, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
import {
  BellOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmLogoutModal, openLoginModal } from '../../../../store/slices/modalSlice';
import { Paragraph } from '../../../../components/Typography';
import AVATAR from '../../../../assets/images/avatar.svg';
export const LayoutMenu = ({ isInline = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState(routeNames.Home);
  const location = useLocation();
  const { access_token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);

  const onItemClick = event => {
    const { key } = event;
    if (key === 'translation') {
      return;
    }
    if (key === 'logout') {
      dispatch(openConfirmLogoutModal());
      return;
    }
    navigate(key);
  };
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);

  const items = [
    {
      key: 'SubMenu',
      icon: <Avatar src={user?.avatar_url || AVATAR} alt="avatar" shape="square" size={22} />,
      children: [
        {
          label: <span>{t('profile')}</span>,
          icon: (
            <span className="color-black">
              <UserOutlined />
            </span>
          ),
          key: '/user-dashboard/' + user?.id,
        },
        {
          label: <span>{t('management')}</span>,
          icon: (
            <span>
              <SolutionOutlined />
            </span>
          ),
          key: '/management',
        },
        {
          label: <span style={{ color: 'red' }}>{t('logout')}</span>,
          icon: (
            <span style={{ color: 'red' }}>
              <LogoutOutlined />
            </span>
          ),
          key: 'logout',
        },
      ],
    },
  ];

  const supportItem = [
    {
      key: 'SubMenu2',
      label: (
        <div className="menuItem">
          <Paragraph classNames="color-black" strong>
            {t('support').toUpperCase()}
          </Paragraph>
        </div>
      ),
      children: [
        {
          label: <span>{t('services')}</span>,
          icon: (
            <span>
              <CustomerServiceOutlined />{' '}
            </span>
          ),
          key: '/services',
        },
        {
          label: <span>{t('faq')}</span>,
          icon: (
            <span>
              <QuestionCircleOutlined />
            </span>
          ),
          key: '/faq',
        },
      ],
    },
  ];

  return (
    <Menu
      mode={isInline ? 'inline' : 'horizontal'}
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
          {t('home').toUpperCase()}
        </Paragraph>
      </Menu.Item>
      <Menu.Item key={routeNames.About} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {t('about').toUpperCase()}
        </Paragraph>
      </Menu.Item>

      <Menu.Item key="usermenu2" style={{ padding: 0, height: '100%' }}>
        <Menu
          onClick={onItemClick}
          mode={isInline ? 'inline' : 'horizontal'}
          items={supportItem}
          style={{ margin: 0 }}
        />
      </Menu.Item>
      <Menu.Item key="usermenu" style={{ marginLeft: 'auto', padding: 0, height: '100%' }}>
        {access_token ? (
          <Menu
            onClick={onItemClick}
            mode={isInline ? 'inline' : 'horizontal'}
            items={items}
            style={{ margin: 0 }}
          />
        ) : (
          <Button
            type="text"
            style={{ margin: 0 }}
            icon={<UserOutlined style={{ fontSize: 16 }} />}
            onClick={() => dispatch(openLoginModal())}>
            <Paragraph classNames="color-black" strong>
              {t('join-us').toUpperCase()}
            </Paragraph>
          </Button>
        )}
      </Menu.Item>
      <Menu.Item key="notification">
        <Button
          type="text"
          style={{ margin: 0 }}
          icon={<BellOutlined style={{ fontSize: 20 }} />}
          onClick={() => {}}></Button>
      </Menu.Item>
      <Menu.Item key="translation">
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
