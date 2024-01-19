import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { Button } from 'antd';

import './styles.scss';
import SignIn from '../../components/SignIn/SignIn';
export const ModalContext = createContext();

export const Home = ({ contextHolder }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      {contextHolder}
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
        <h2>{t('welcome-text')}</h2>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <SignIn open={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      </div>
    </Layout>
  );
};
