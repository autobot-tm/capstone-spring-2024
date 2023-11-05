import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import './styles.scss';
export const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
        <h2>{t('welcome-text')}</h2>
      </div>
    </Layout>
  );
};
