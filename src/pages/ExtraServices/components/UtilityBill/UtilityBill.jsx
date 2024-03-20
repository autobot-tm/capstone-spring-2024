import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const UtilityBill = () => {
  return (
    <div className="rr-container">
      <SubHeading classNames="d-block">Utility Bill Collection</SubHeading>
      <Paragraph classNames="d-block" style={{ padding: 10 }}>
        Nec nam aliquam sem et tortor consequat id porta. Praesent tristique magna sit amet purus
        gravida quis blandit turpis. Nec nam aliquam sem et tortor consequat id porta. Praesent
        tristique magna sit amet purus gravida quis blandit turpis. Nec nam aliquam sem et tortor
        consequat id porta. Praesent tristique magna sit amet purus gravida quis blandit turpis. Nec
        nam aliquam sem et tortor consequat id porta. Praesent tristique magna sit amet purus
        gravida quis blandit turpis. Nec nam aliquam sem et tortor consequat id porta. Praesent
        tristique magna sit amet purus gravida quis blandit turpis. Nec nam aliquam sem et tortor
        consequat id porta. Praesent tristique magna sit amet purus gravida quis blandit turpis.
      </Paragraph>
      <Paragraph classNames="d-block" style={{ padding: 10 }}>
        Nec nam aliquam sem et tortor consequat id porta. Praesent tristique magna sit amet purus
        gravida quis blandit turpis. Nec nam aliquam sem et tortor consequat id porta. Praesent
        tristique magna sit amet purus gravida quis blandit turpis. Nec nam aliquam sem et tortor
        consequat id porta.
      </Paragraph>

      <BaseButton className="bg-primary">Request</BaseButton>
      {/* <BaseButton style={{ width: 'auto', marginTop: 20 }} type="primary">
        Request
      </BaseButton> */}
    </div>
  );
};

export default UtilityBill;
