import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { openShowLeaseModal } from '../../../../store/slices/modalSlice';

const UtilityBill = ({ electricity, water, alert }) => {
  const dispatch = useDispatch();

  return (
    <Row className="rr-container" gutter={[16, 24]}>
      <Col xs={24}>
        <SubHeading classNames="d-block" strong>
          Pay Renter Utility Bills in Advance
        </SubHeading>
        <Paragraph classNames="d-block">
          This service helps renters pay their utility bills early, ensuring they are always covered
          for electricity and water without any hassle or late fees.
        </Paragraph>
      </Col>
      <Col xs={12}>
        <SubHeading>{electricity?.name}</SubHeading>
        <Paragraph classNames="d-block" style={{ padding: 4 }}>
          {' '}
          {electricity?.description}{' '}
        </Paragraph>

        <BaseButton
          onClick={() => dispatch(openShowLeaseModal(electricity?.id))}
          className="bg-primary">
          Request
        </BaseButton>
      </Col>

      <Col xs={12}>
        <SubHeading>{water?.name}</SubHeading>
        <Paragraph classNames="d-block" style={{ padding: 4 }}>
          {' '}
          {water?.description}{' '}
        </Paragraph>
        <BaseButton onClick={alert} className="bg-primary">
          Request
        </BaseButton>
      </Col>
    </Row>
  );
};

export default UtilityBill;
