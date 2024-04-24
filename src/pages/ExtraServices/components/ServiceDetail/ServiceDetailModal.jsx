import './styles.scss';
import React, { useEffect, useState } from 'react';
import CustomModal from '../../../../components/Modal/CustomModal';
import { closeServiceDetailModal, openLoginModal, openShowLeaseModal } from '../../../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { Col, Row } from 'antd';
import PRICE_ICON from '../../../../assets/images/best-price.png';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { useTranslation } from 'react-i18next';

const ServiceDetailModal = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [leaseActive, setLeaseActive] = useState([]);
  const { access_token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);
  const { serviceDetailModal } = useSelector(state => state.modal);
  const { extraServices } = useSelector(state => state.extraServices);

  const fetchLeases = async () => {
    try {
      const response = await getLeasesService({
        renter_email: user.email,
        offset: 0,
        status: 'ACTIVE',
        limit: 30,
      });
      setLeaseActive(response.leases);
    } catch (error) {
      console.error('Error fetch lease active', error);
    }
  };

  useEffect(() => {
    fetchLeases();
  }, [serviceDetailModal]);

  const handleNext = () => {
    if (!access_token) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(openShowLeaseModal({ leases: leaseActive, extraServiceId: extraServices.id }));
    dispatch(closeServiceDetailModal());
  };
  return (
    <CustomModal
      width={520}
      nameOfModal={serviceDetailModal}
      title={
        <SubHeading size={260}>
          {i18n.language === 'en' || !extraServices.name_in_jp ? extraServices.name : extraServices.name_in_jp}
        </SubHeading>
      }
      action={closeServiceDetailModal}
      footer={
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <BaseButton style={{ width: 140 }} onClick={handleNext}>
            {t('EXTRA-SERVICES.apply-btn')}
          </BaseButton>
        </span>
      }>
      <Row className="service-container" align="center" gutter={[0, 24]}>
        <Col xs={24} style={{ textAlign: 'center', marginBottom: 10 }}>
          <Paragraph>
            {' '}
            {i18n.language === 'en' || !extraServices.description_in_jp
              ? extraServices.description
              : extraServices.description_in_jp}
          </Paragraph>
        </Col>
        <Col xs={12} className="service-type">
          <Paragraph classNames="color-black">{t('EXTRA-SERVICES.service-type')}</Paragraph>
        </Col>
        <Col xs={12} className="service-type">
          <span className="bg-element">
            <Paragraph style={{ color: 'white' }} strong>
              {extraServices.type === 'ONE_TIME' ? t('type.ONE_TIME') : t('type.RECURRING')}
            </Paragraph>
          </span>
        </Col>

        <Col xs={12} className="service-type">
          <img src={PRICE_ICON} alt="" style={{ width: 54 }} />
        </Col>

        <Col xs={12} className="service-type">
          <span className="bg-element">
            {extraServices.price !== null ? (
              <Paragraph style={{ color: 'white' }} strong>
                {formatCustomCurrency(extraServices.price)}
              </Paragraph>
            ) : (
              <Paragraph style={{ color: 'white' }} strong>
                {t('reference-fee')}
              </Paragraph>
            )}
          </span>
        </Col>
      </Row>
    </CustomModal>
  );
};

export default ServiceDetailModal;
