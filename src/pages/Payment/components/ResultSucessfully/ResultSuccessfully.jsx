import './style.scss';
import React from 'react';
import { Result } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { SubHeading } from '../../../../components/Typography';

const ResultSuccessfully = ({ t, leadingDashboard, leadingOrderSuccess }) => (
  <div className="center-container">
    <Result
      status="success"
      title={
        <SubHeading size={230} strong>
          {' '}
          {t('PAYMENT.success')}
        </SubHeading>
      }
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <>
          <div className="flex-btn">
            <BaseButton
              style={{ width: 'auto' }}
              type="primary"
              key="console"
              onClick={leadingDashboard}>
              {t('PAYMENT.go-console-btn')}
            </BaseButton>
            ,
            <BaseButton style={{ width: 'auto' }} key="buy" onClick={leadingOrderSuccess}>
              {t('PAYMENT.view-your-reservation-btn')}
            </BaseButton>
            ,
          </div>
        </>,
      ]}
    />
  </div>
);

export default ResultSuccessfully;
