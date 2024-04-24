import React from 'react';
import { Layout } from '../../hoc/Layout';
import { TabName } from '../../components/TabName';
import { useTranslation } from 'react-i18next';
import { Collapse, Typography } from 'antd';
import './styles.scss';

export const FAQ = () => {
  const data = [
    {
      id: 1,
      title: 'Paying invoices and fees?',
      content:
        'Wondering how to pay your fees? Just head to the "Payment" section on our platform, select the invoice you would like to pay, and follow the prompts to complete your transaction. Whether you prefer credit card, bank transfer, or another method, we have got you covered. Once payment is processed, you will receive confirmation, and your account will be updated accordingly.',
    },
    {
      id: 2,
      title: 'Requesting extra service?',
      content:
        'Need to request an extra service? No problem! Simply navigate to the "Extra Services" section on our platform, choose the service you require, and submit your request. Our team will handle the rest, ensuring your needs are met promptly and efficiently.',
    },
    {
      id: 3,
      title: 'Fixing Invoice Mistakes',
      content:
        "If you spot errors on your invoice, don't worry. Take a moment to review it and then reach out to us. Just explain what's wrong, and we'll work quickly to fix it. Stay in touch for updates, and we'll make sure everything is sorted out smoothly.",
    },
    {
      id: 4,
      title: 'Canceling Your Contract',
      content:
        "If you need to cancel a contract, we've got you covered. Simply reach out to our support team and let them know you'd like to cancel. They'll guide you through the process and ensure everything is taken care of smoothly.",
    },
  ];
  const { t } = useTranslation();
  return (
    <Layout>
      <TabName>{t('faq')}</TabName>
      <div className="faq-container">
        <h1>{t('faq')}</h1>
        <Collapse accordion={true}>
          <Collapse.Panel key={data[0].id} header={data[0].title}>
            <Typography.Text> {data[0].content}</Typography.Text>
          </Collapse.Panel>
          <Collapse.Panel key={data[1].id} header={data[1].title}>
            <Typography.Text>{data[1].content}</Typography.Text>
          </Collapse.Panel>
          <Collapse.Panel key={data[2].id} header={data[2].title}>
            <Typography.Text>{data[2].content}</Typography.Text>
          </Collapse.Panel>
          <Collapse.Panel key={data[3].id} header={data[3].title}>
            <Typography.Text>{data[3].content}</Typography.Text>
          </Collapse.Panel>
        </Collapse>
      </div>
    </Layout>
  );
};
