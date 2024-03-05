import React, { useEffect } from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import Houses from './components/Houses/Houses';
import { useSelector } from 'react-redux';

const HousesPage = () => {
  const page = useSelector(state => state.house.page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <Layout>
      <div className="houses-container">
        <Houses />
      </div>
    </Layout>
  );
};

export default HousesPage;
