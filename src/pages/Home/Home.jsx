import React from 'react';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import './styles.scss';
import { useTranslation } from 'react-i18next';
export const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
      </div>
    </Layout>
  );
};
