import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { Caption, Headline, Paragraph, SubHeading } from '../../components/Typography';
import './styles.scss';
import UploadFile from '../../components/UploadFile/UploadFile';

export const ModalContext = createContext();

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
        <h2>{t('welcome-text')}</h2>
        <UploadFile />
      </div>
      <div>
        <Headline size={600}>Headline 600</Headline>
        <Headline size={450}>Headline 450</Headline>
        <SubHeading size={260} strong>
          SubHeading 260 bold
        </SubHeading>
        <SubHeading size={260}>SubHeading 260</SubHeading>
        <SubHeading size={230} strong>
          SubHeading 230
        </SubHeading>
        <SubHeading size={230}>SubHeading 230</SubHeading>
        <Paragraph strong>Paragraph 160 Bold</Paragraph>
        <Paragraph>Paragraph 160</Paragraph>
        <Caption size={140} strong>
          Caption 140 Bold
        </Caption>
        <Caption size={140}>Caption 140</Caption>
        <Caption size={110}>Caption 110</Caption>
      </div>
    </Layout>
  );
};
