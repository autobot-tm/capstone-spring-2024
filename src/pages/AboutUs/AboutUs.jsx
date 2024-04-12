import React from 'react';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { useTranslation } from 'react-i18next';
import './styles.scss';

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <TabName>{t('about')}</TabName>
      <div className="about-container">
        <h1>{t('about')}</h1>
      </div>
    </Layout>
  );
};
