import React, { useState, useEffect } from 'react';
import { Avatar, Button, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
import { LogoutOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmLogoutModal, openLoginModal } from '../../../../store/slices/modalSlice';
import { Paragraph } from '../../../../components/Typography';
import AVATAR from '../../../../assets/images/avatar.svg';
import UserNotification from '../../../../components/UserNotification/UserNotification';
import { getNotiUserCurrentService } from '../../../../services/apis/notification.service';
import { setNotifications } from '../../../../store/slices/notification.slice';

export const LayoutMenu = ({ isInline = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState(routeNames.Home);
  const location = useLocation();
  const { access_token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);
  const { notifications } = useSelector(state => state.notification);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await getNotiUserCurrentService();
        console.log(res);
        dispatch(setNotifications([...res.notifications]));
        console.log('notifications', notifications);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotification();
  }, []);

  console.log('notification', notifications);

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

  const notificationItems = [
    {
      key: 'SubMenu3',
      icon: <UserNotification numbers={notifications?.length} />,
      children: notifications.map((item, index) => ({
        label: <span key={index}>{item.description}</span>,
        key: `/notification/${index}`,
      })),
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
      {/* <Menu.Item key={routeNames.Support} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {t('support').toUpperCase()}
        </Paragraph>
      </Menu.Item> */}
      <Menu.Item key="usermenu2" style={{ padding: 0 }}>
        <Menu onClick={onItemClick} mode="horizontal" items={supportItem} style={{ margin: 0 }} />
      </Menu.Item>
      <Menu.Item key="usermenu" style={{ marginLeft: 'auto', padding: 0 }}>
        {access_token ? (
          <Menu onClick={onItemClick} mode="horizontal" items={items} style={{ margin: 0 }} />
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
      {/* <Menu.Item key="notification">
        <div className="notification-popup">
          {notificationItems.map(item => (
            <div key={item.key} className="notification-item" onClick={() => onItemClick(item.key)}>
              <span className="notification-icon">{item.icon}</span>
              <span>{item.children[0].label}</span>
            </div>
          ))}
        </div>
      </Menu.Item> */}

      <Menu.Item key="notification">
        <Menu
          onClick={onItemClick}
          mode="horizontal"
          items={notificationItems}
          style={{ margin: 0 }}
        />
      </Menu.Item>
      <Menu.Item key="translation">
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
