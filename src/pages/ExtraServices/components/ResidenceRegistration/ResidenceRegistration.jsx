import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const ResidenceRegistration = () => {
  return (
    <div className="rr-container">
      <SubHeading classNames="d-block">Residence Registration</SubHeading>
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

      <BaseButton className="bg-tertiary">Request</BaseButton>
    </div>
  );
};

export default ResidenceRegistration;
