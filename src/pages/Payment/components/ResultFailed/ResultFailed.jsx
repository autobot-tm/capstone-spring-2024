import './style.scss';
import React from 'react';
import { Result } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Caption, SubHeading } from '../../../../components/Typography';
const ResultFailed = ({
  t,
  leadingToHomepage,
  leadingToCurrentHouses,
  typeOfPayment,
  leadingToCurrentManager,
}) => (
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
              onClick={leadingToHomepage}>
              {t('PAYMENT.back-to-home-btn')}
            </BaseButton>
            {typeOfPayment === 'invoice' ? (
              <>
                <BaseButton style={{ width: 'auto' }} key="" onClick={leadingToCurrentManager}>
                  {t('ORDER.return-to-user-management')}
                </BaseButton>
              </>
            ) : (
              <BaseButton style={{ width: 'auto' }} key="" onClick={leadingToCurrentHouses}>
                {t('PAYMENT.reserve-again-btn')}
              </BaseButton>
            )}
          </div>
        </>,
      ]}></Result>
  </div>
);

export default ResultFailed;
