import React from 'react';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import './styles.scss';
export const Home = () => {
  return (
    <Layout>
      <TabName>Home</TabName>
      <div className="home-container">
        <h1>Home</h1>
      </div>
    </Layout>
  );
};
