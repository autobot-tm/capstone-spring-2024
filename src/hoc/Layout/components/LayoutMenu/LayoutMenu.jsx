import React, { useEffect } from 'react';
import { Button, Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { TranslationSelector } from '../TranslationSelector';
import { useTranslation } from 'react-i18next';
import { IssuesCloseOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmLogoutModal, openLoginModal } from '../../../../store/slices/modalSlice';
import { Paragraph } from '../../../../components/Typography';
import Avatar from '../../../../assets/images/avatar.svg';
export const LayoutMenu = ({ isInline = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = React.useState(routeNames.Home);
  const location = useLocation();
  const { access_token } = useSelector(state => state.auth);

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
      label: (
        <Paragraph classNames="color-black" strong>
          username
        </Paragraph>
      ),
      key: 'SubMenu',
      icon: (
        <img src={Avatar} alt="" style={{ width: '16px', height: '16px', objectFit: 'cover' }} />
      ),
      children: [
        {
          label: <span className="color-black">{t('account')}</span>,
          icon: (
            <span className="color-black">
              <UserOutlined />
            </span>
          ),
          key: routeNames.UserDashboard,
        },
        {
          label: <span className="color-black">{t('reportlivingissue')}</span>,
          icon: (
            <span className="color-black">
              <IssuesCloseOutlined />
            </span>
          ),
          key: routeNames.ReportLivingIssues,
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
      <Menu.Item key={routeNames.Contact} className="menuItem" onClick={onItemClick}>
        <Paragraph classNames="color-black" strong>
          {t('contact').toUpperCase()}
        </Paragraph>
      </Menu.Item>

      <Menu.Item key="usermenu" style={{ marginLeft: 'auto', padding: 0 }}>
        {access_token ? (
          <Menu onClick={onItemClick} mode="horizontal" items={items} />
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

      <Menu.Item key="translation">
        <TranslationSelector />
      </Menu.Item>
    </Menu>
  );
};
