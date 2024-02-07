import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { Caption, Headline, Paragraph, SubHeading } from '../../components/Typography';
import './styles.scss';
import { getDemoCheckoutURL } from '../../services/apis/payments.service';
import { Button } from 'antd';
import UploadFile from '../../components/UploadFile/UploadFile';
import { HOUSE_ID } from '../../constants/vnpay.constant';

export const ModalContext = createContext();

export const Home = () => {
  const { t } = useTranslation();

  const handlePayments = async () => {
    const url = await getDemoCheckoutURL(HOUSE_ID);
    window.location.href = url;
  };

  return (
    <Layout>
      <TabName>{t('home')}</TabName>
      <div className="home-container">
        <h1>{t('home')}</h1>
        <h2>{t('welcome-text')}</h2>
        <UploadFile />
        <Button onClick={handlePayments}>Reserve house</Button>

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
