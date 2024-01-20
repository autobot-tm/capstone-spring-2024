import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { Button } from 'antd';

import './styles.scss';
import SignIn from '../../components/SignIn/SignIn';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../store/slices/modalSlice';
import Register from '../../components/Register/Register';
export const ModalContext = createContext();

export const Home = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
        <h2>{t('welcome-text')}</h2>
        <Button
          type="primary"
          onClick={() => {
            dispatch(openLoginModal());
          }}>
          Open Modal
        </Button>
        <SignIn />
        <Register />
      </div>
    </Layout>
  );
};
