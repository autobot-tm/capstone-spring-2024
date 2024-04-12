import './styles.scss';
import React from 'react';
import { Layout } from '../../hoc/Layout';
import { imagesHomePage } from '../../assets/images';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import Houses from './components/Houses/Houses';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Helmet>
        <title>{t('title-tab-main')}</title>
      </Helmet>
      <HomeCarousel images={imagesHomePage} />
      <div className="home-container">
        <Houses />
      </div>
    </Layout>
  );
};
