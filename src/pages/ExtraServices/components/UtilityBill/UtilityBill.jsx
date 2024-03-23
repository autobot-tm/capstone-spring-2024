import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const UtilityBill = ({ electricity, water, alert }) => {
  return (
    <div className="rr-container">
      <SubHeading classNames="d-block" strong>
        Pay Renter Utility Bills in Advance
      </SubHeading>
      <Paragraph classNames="d-block" style={{ padding: 4, marginTop: 6 }}>
        This service helps renters pay their utility bills early, ensuring they are always covered
        for electricity and water without any hassle or late fees.
      </Paragraph>
      <Paragraph classNames="d-block" style={{ padding: 4 }}>
        {' '}
        {electricity?.description}{' '}
      </Paragraph>
      <Paragraph classNames="d-block" style={{ padding: 4 }}>
        {' '}
        {water?.description}{' '}
      </Paragraph>
      <BaseButton onClick={alert} className="bg-primary">
        Request
      </BaseButton>
    </div>
  );
};

export default UtilityBill;
