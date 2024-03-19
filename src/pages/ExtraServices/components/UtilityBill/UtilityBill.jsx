import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph } from '../../../../components/Typography';

const UtilityBill = () => {
  return (
    <>
      <div>
        <Paragraph classNames="d-block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Paragraph>
        <Paragraph classNames="d-block">
          Nec nam aliquam sem et tortor consequat id porta. Praesent tristique magna sit amet purus
          gravida quis blandit turpis.
        </Paragraph>
        <BaseButton style={{ width: 'auto', marginTop: 20 }} type="primary">
          Request
        </BaseButton>
      </div>
    </>
  );
};

export default UtilityBill;
