import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';

const ResidenceRegistration = () => {
  return (
    <div className="rr-container">
      <SubHeading classNames="d-block" strong>
        Assist with Temporary Residence Registration
      </SubHeading>
      <Paragraph classNames="d-block" style={{ padding: 10 }}>
        We assist renters with registering their temporary residence, making it easier for
        travelers, expats, or short-term movers to complete the necessary paperwork and get settled
        quickly.
      </Paragraph>

      <BaseButton className="bg-tertiary">Request</BaseButton>
    </div>
  );
};

export default ResidenceRegistration;
