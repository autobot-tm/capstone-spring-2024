import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const UtilityBill = () => {
  return (
    <div className="rr-container">
      <SubHeading classNames="d-block" strong>
        Pay Renter Utility Bills in Advance
      </SubHeading>
      <Paragraph classNames="d-block" style={{ padding: 10 }}>
        This service helps renters pay their utility bills early, ensuring they are always covered
        for electricity and water without any hassle or late fees.
      </Paragraph>
      <BaseButton className="bg-primary">Request</BaseButton>
      {/* <BaseButton style={{ width: 'auto', marginTop: 20 }} type="primary">
        Request
      </BaseButton> */}
    </div>
  );
};

export default UtilityBill;
