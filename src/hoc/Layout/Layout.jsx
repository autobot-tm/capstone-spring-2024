import { Space, Layout as AntdLayout } from 'antd';
import React from 'react';
import { LayoutTopSection } from './components/LayoutTopSection';
import LayoutMenu from './components/LayoutMenu/LayoutMenu';
const { Header, Footer, Content } = AntdLayout;
export const Layout = ({ children }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout>
        <LayoutTopSection />
        <Header>
          <LayoutMenu />
        </Header>
        <Content>{children}</Content>
        <Footer>Made by hand</Footer>
      </AntdLayout>
    </Space>
  );
};
