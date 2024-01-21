import { Space, Layout as AntdLayout } from 'antd';
import React from 'react';
import './styles.scss';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutMenu } from './components/LayoutMenu';
const { Header, Content } = AntdLayout;
export const Layout = ({ children }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout>
        <Header className="layout-header">
          <LayoutMenu />
        </Header>
        <Content>{children}</Content>
        <LayoutFooter />
      </AntdLayout>
    </Space>
  );
};
