import './style.scss';
import React from 'react';
import { Result } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { SubHeading } from '../../../../components/Typography';

const ResultSuccessfully = ({ t, leadingHomepage, leadingOrderSuccess }) => (
  <div className="center-container">
    <Result
      status="success"
      title={
        <SubHeading size={230} strong>
          {' '}
          {t('PAYMENT.success')}
        </SubHeading>
      }
      subTitle="Thank you for your reservation request. The process typically takes 1-5 minutes to complete. We appreciate your patience."
      extra={[
        <>
          <div className="flex-btn">
            <BaseButton
              style={{ width: 'auto' }}
              type="primary"
              key="console"
              onClick={leadingHomepage}>
              {t('PAYMENT.back-to-home-btn')}
            </BaseButton>
            <BaseButton style={{ width: 'auto' }} key="buy" onClick={leadingOrderSuccess}>
              {t('PAYMENT.view-your-reservation-btn')}
            </BaseButton>
          </div>
        </>,
      ]}
    />
  </div>
);

export default ResultSuccessfully;
