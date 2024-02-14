import React from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import Houses from '../../components/Houses/Houses';

const HousesPage = () => {
  return (
    <Layout>
      <div className="houses-container">
        <Houses />
      </div>
    </Layout>
  );
};

export default HousesPage;
