import { Space, Layout as AntdLayout } from 'antd';
import React from 'react';
import { LayoutTopSection } from './components/LayoutTopSection';
import './styles.scss';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutMenu } from './components/LayoutMenu';
const { Header, Footer, Content } = AntdLayout;
export const Layout = ({ children }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout>
        <LayoutTopSection />
        <Header className="layout-header">
          <LayoutMenu />
        </Header>
        <Content>{children}</Content>
        <LayoutFooter />
      </AntdLayout>
    </Space>
  );
};
