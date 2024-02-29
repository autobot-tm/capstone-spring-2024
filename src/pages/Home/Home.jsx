import './styles.scss';
import React from 'react';
import { Layout } from '../../hoc/Layout';
import { imagesHomePage } from '../../assets/images';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import Houses from './components/Houses/Houses';

export const Home = () => {
  return (
    <Layout>
      <HomeCarousel images={imagesHomePage} />
      <div className="home-container">
        <Houses />
      </div>
    </Layout>
  );
};
