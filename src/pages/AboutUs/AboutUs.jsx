import React from 'react';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import './styles.scss';
export const AboutUs = () => {
  return (
    <Layout>
      <TabName>AboutUs</TabName>
      <div className="about-container">
        <h1>About</h1>
      </div>
    </Layout>
  );
};
