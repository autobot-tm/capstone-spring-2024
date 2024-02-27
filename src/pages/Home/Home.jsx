import React, { createContext } from 'react';
import { Layout } from '../../hoc/Layout';
// import { Caption, Headline, Paragraph, SubHeading } from '../../components/Typography';
import './styles.scss';
// import { getDemoCheckoutURL } from '../../services/apis/payments.service';
// import { Button } from 'antd';
// import UploadFile from '../../components/UploadFile/UploadFile';
// import { HOUSE_ID } from '../../constants/vnpay.constant';
import HomeCarousel from './components/HomeCarousel/HomeCarousel';
import Houses from './components/Houses/Houses';

export const ModalContext = createContext();

export const Home = () => {
  // const handlePayments = async () => {
  //   const url = await getDemoCheckoutURL(HOUSE_ID);
  //   window.location.href = url;
  // };

  const demoImages = [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <Layout>
      <HomeCarousel images={demoImages} />
      <div className="home-container">
        <Houses />
        {/* <UploadFile />
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
            <Caption size={110}>Caption 110</Caption> */}
      </div>
    </Layout>
  );
};
