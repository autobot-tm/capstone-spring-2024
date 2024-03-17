import './style.scss';
import React from 'react';
import { Result } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Caption, SubHeading } from '../../../../components/Typography';
const ResultFailed = ({ t, leadingHomepage, leadingHouses }) => (
  <div className="center-container">
    <Result
      status="error"
      title={
        <SubHeading size={230} strong>
          {t('PAYMENT.fail')}
        </SubHeading>
      }
      subTitle={<Caption size={140}>{t('PAYMENT.fail-des')}</Caption>}
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
            <BaseButton style={{ width: 'auto' }} key="buy" onClick={leadingHouses}>
              {t('PAYMENT.reserve-again-btn')}
            </BaseButton>
          </div>
        </>,
      ]}></Result>
  </div>
);

export default ResultFailed;
