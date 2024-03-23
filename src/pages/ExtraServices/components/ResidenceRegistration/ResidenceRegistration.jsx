import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { useSelector } from 'react-redux';
import { openLoginModal, openShowLeaseModal } from '../../../../store/slices/modalSlice';
import { Col, Row } from 'antd';

const ResidenceRegistration = ({ residence, dispatch, t }) => {
  const { access_token } = useSelector(state => state.auth);

  const requestResidence = () => {
    if (!access_token) {
      return dispatch(openLoginModal());
    }
    dispatch(openShowLeaseModal({ extraServiceId: residence?.id }));
  };
  return (
    <Row className="rr-container">
      <Col xs={24} style={{ textAlign: 'center' }}>
        <SubHeading classNames="d-block" strong>
          {t('EXTRA-SERVICES.title-residence')}
        </SubHeading>
        <Paragraph classNames="d-block" style={{ padding: 4, marginTop: 6 }}>
          {t('EXTRA-SERVICES.des-residence')}
        </Paragraph>
      </Col>
      <Col xs={24} style={{ textAlign: 'center' }}>
        {/* <SubHeading> {t('EXTRA-SERVICES.title-residence-be')}</SubHeading> */}
        <Paragraph classNames="d-block" style={{ padding: 4 }}>
          {t('EXTRA-SERVICES.des-residence-be')}
        </Paragraph>

        <BaseButton onClick={requestResidence} className="bg-tertiary">
          {t('button.request')}
        </BaseButton>
      </Col>
    </Row>
  );
};

export default ResidenceRegistration;
