import { Space, Layout as AntdLayout, Drawer } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutMenu } from './components/LayoutMenu';
import { MenuOutlined } from '@ant-design/icons';
const { Header, Content } = AntdLayout;
export const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout>
        <Header className="layout-header">
          <div className="menuIcon">
            <MenuOutlined
              onClick={() => {
                setOpenMenu(true);
              }}
            />
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
        <Content>{children}</Content>
        <LayoutFooter />
      </AntdLayout>
    </Space>
  );
};
