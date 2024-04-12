import React, { useState, useEffect } from 'react';
import { Avatar, Button, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
import { HeartOutlined, LogoutOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmLogoutModal, openLoginModal } from '../../../../store/slices/modalSlice';
import { Paragraph } from '../../../../components/Typography';
import AVATAR from '../../../../assets/images/avatar.png';
import UserNotification from '../../../../components/UserNotification/UserNotification';
import LOGO from '../../../../assets/images/logo-Dub9QTYA.png';

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
      label: <Avatar src={user?.avatar_url || AVATAR} alt="avatar" shape="square" size={30} />,
      children: [
        {
          label: <span>{t('account')}</span>,
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
          label: <span>{t('wishlist')}</span>,
          icon: (
            <span>
              <HeartOutlined />
            </span>
          ),
          key: '/wishlist',
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
        <div className="menuItem" style={{ width: '69px' }}>
          <Paragraph classNames="color-black" strong>
            {t('support').toUpperCase()}
          </Paragraph>
        </div>
      ),
      children: [
        {
          label: <span>{t('services').toUpperCase()}</span>,
          key: '/extra-services',
        },
        {
          label: <span>{t('CONTACT-US.contact-us').toUpperCase()}</span>,
          key: '/contact-us',
        },
        {
          label: <span>{t('faq').toUpperCase()}</span>,
          key: '/faqs',
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
      {!isInline && (
        <Menu.Item onClick={() => navigate('/')} style={{ marginRight: 'auto', padding: 0 }}>
          <div className="logo-container">
            {' '}
            <img src={LOGO} style={{ width: 44 }} alt="" />
          </div>
        </Menu.Item>
      )}

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
      <Menu.Item
        key="usermenu"
        style={{
          marginLeft: 'auto',
          padding: 0,
          height: '100%',
        }}>
        {access_token ? (
          <Menu onClick={onItemClick} mode={isInline ? 'inline' : 'horizontal'} items={items} style={{ margin: 0 }} />
        ) : (
          <Button
            type="text"
            style={{ margin: 0 }}
            icon={<UserOutlined style={{ fontSize: '20px' }} />}
            onClick={() => dispatch(openLoginModal())}>
            <Paragraph classNames="color-black" strong>
              {t('join-us').toUpperCase()}
            </Paragraph>
          </Button>
        )}
      </Menu.Item>
      {access_token && !isInline && (
        <Menu.Item key="notification">
          <UserNotification t={t} />
        </Menu.Item>
      )}
      {!isInline && (
        <Menu.Item key="translation">
          <TranslationSelector />
        </Menu.Item>
      )}
    </Menu>
  );
};
