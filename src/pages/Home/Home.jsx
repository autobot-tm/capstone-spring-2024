import './styles.scss';
import React from 'react';
import { Layout } from '../../hoc/Layout';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import Houses from './components/Houses/Houses';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { getHousesService } from '../../services/apis/houses.service';
import SpinLoading from '../../components/SpinLoading/SpinLoading';

export const Home = () => {
  const LIMIT = 6;
  const { t } = useTranslation();
  const fetchHouses = async () => {
    try {
      const response = await getHousesService({
        offset: 0,
        limit: LIMIT,
      });
      return response;
    } catch (error) {
      console.error('An error occurred while fetching houses:', error);
      throw error;
    }
  };
  const { data, error, isLoading } = useSWR('getHousesService', fetchHouses);
  if (isLoading) {
    return <SpinLoading />;
  }
  if (error) {
    return <p>{t('Failed to fetch houses. Please try again later.')}</p>;
  }
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
