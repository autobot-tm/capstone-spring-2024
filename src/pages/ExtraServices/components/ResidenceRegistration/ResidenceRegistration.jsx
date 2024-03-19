import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph } from '../../../../components/Typography';

const ResidenceRegistration = () => {
  return (
    <div>
      <Paragraph classNames="d-block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Paragraph>
      <Paragraph classNames="d-block">
        Nec nam aliquam sem et tortor consequat id porta. Praesent tristique magna sit amet purus
        gravida quis blandit turpis.
      </Paragraph>
      <BaseButton className="bg-tertiary">Request</BaseButton>
    </div>
  );
};

export default ResidenceRegistration;
