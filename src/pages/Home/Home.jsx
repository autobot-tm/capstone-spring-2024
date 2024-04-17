import './styles.scss';
import React from 'react';
import { Layout } from '../../hoc/Layout';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import Houses from './components/Houses/Houses';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { getHousesService } from '../../services/apis/houses.service';

export const Home = () => {
  const LIMIT = 6;
  const { t } = useTranslation();
  const { data, isLoading } = useSWR(`getHousesService`, async () => {
    return await getHousesService({
      offset: 0,
      limit: LIMIT,
    });
  });
  return (
    <Layout>
      <Helmet>
        <title>{t('title-tab-main')}</title>
      </Helmet>
      <HomeCarousel data={data} />
      <div className="home-container">
        <Houses data={data} isLoading={isLoading} limit={LIMIT} />
      </div>
    </Layout>
  );
};
