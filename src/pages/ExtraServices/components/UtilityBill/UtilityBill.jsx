import './styles.scss';
import React from 'react';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { openLoginModal, openShowLeaseModal } from '../../../../store/slices/modalSlice';

const UtilityBill = ({ electricity, water, dispatch, t }) => {
  const { access_token } = useSelector(state => state.auth);

  const requestElectricity = () => {
    if (!access_token) {
      return dispatch(openLoginModal());
    }
    dispatch(openShowLeaseModal({ extraServiceId: electricity?.id }));
  };

  const requestWater = () => {
    if (!access_token) {
      return dispatch(openLoginModal());
    }
    dispatch(openShowLeaseModal({ extraServiceId: water?.id }));
  };

  return (
    <Row className="rr-container" gutter={[16, 24]}>
      <Col xs={24} style={{ textAlign: 'center' }}>
        <SubHeading classNames="d-block" strong>
          {t('EXTRA-SERVICES.title-utility')}
        </SubHeading>
        <Paragraph classNames="d-block">{t('EXTRA-SERVICES.des-utility')}</Paragraph>
      </Col>
      <Col xs={24} md={12}>
        <SubHeading>{t('EXTRA-SERVICES.title-electricity-be')}</SubHeading>
        <Paragraph classNames="d-block utility-section" style={{ padding: '10px 2px' }}>
          {' '}
          {t('EXTRA-SERVICES.des-electricity-be')}{' '}
        </Paragraph>
        <BaseButton onClick={requestElectricity} className="bg-primary">
          {t('button.request')}
        </BaseButton>
      </Col>

      <Col xs={24} md={12}>
        <SubHeading> {t('EXTRA-SERVICES.title-water-be')} </SubHeading>
        <Paragraph classNames="d-block utility-section" style={{ padding: '10px 2px' }}>
          {' '}
          {t('EXTRA-SERVICES.des-water-be')}{' '}
        </Paragraph>
        <BaseButton onClick={requestWater} className="bg-primary">
          {t('button.request')}
        </BaseButton>
      </Col>
    </Row>
  );
};

export default UtilityBill;
