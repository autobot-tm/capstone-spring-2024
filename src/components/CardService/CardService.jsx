import { Card } from 'antd';
import './styles.scss';
import React from 'react';
import { FileProtectOutlined, ThunderboltOutlined } from '@ant-design/icons';
import ServiceStatus from '../../pages/ExtraServices/components/ServiceStatus/ServiceStatus';
import { Caption, SubHeading } from '../Typography';
import WATER from '../../assets/images/water-drop-svgrepo-com.svg';
import HOUSE_CLEANING from '../../assets/images/house_clean.png';
import SERVICE_OTHER from '../../assets/images/services.png';
import { CLEANING_HOUSE_ID, ELECTRICITY_ID, RESIDENCE_ID, WATER_ID } from '../../constants/extraService.constant';

const iconMap = {
  [ELECTRICITY_ID]: <ThunderboltOutlined className="es-icon es-iconPrimary" />,
  [WATER_ID]: (
    <span className="es-icon es-iconTertiary">
      <img src={WATER} alt="Water Service" />
    </span>
  ),
  [RESIDENCE_ID]: <FileProtectOutlined className="es-icon es-iconResidence" />,
  [CLEANING_HOUSE_ID]: (
    <span className="es-icon es-iconSecondary">
      <img src={HOUSE_CLEANING} alt="House Cleaning Service" />
    </span>
  ),
};

const ServiceContent = ({ service, service_req, t, i18n }) => {
  const serviceIcon = iconMap[service?.id] || (
    <span className="es-icon es-iconOthers">
      <img src={SERVICE_OTHER} alt="Other Service" />
    </span>
  );
  return (
    <span className="name-services">
      {serviceIcon}
      <SubHeading size={230} strong style={{ width: '100%' }}>
        {i18n.language === 'en' || !service?.name_in_jp ? service?.name : service?.name_in_jp}
        <Caption size={140} style={{ padding: '4px' }} classNames="d-block color-black">
          {t('placeholder.type')}: <b>{t(`type.${service?.type.replace(/\s/g, '')}`)}</b> - {t('label.category')}:{' '}
          <b>{t(`category.${service?.category.replace(/\s/g, '')}`)}</b>
        </Caption>
        <Caption style={{ padding: '4px' }} classNames="color-black" size={140}>
          {t('label.title')}: <b>{service_req?.title}</b>
        </Caption>
      </SubHeading>
      <ServiceStatus status={service_req?.status} />
    </span>
  );
};

const CardService = ({ data, onClickDetail, t, i18n }) => {
  if (!data) return null;
  return (
    <Card hoverable className="card-item" onClick={() => onClickDetail(data?.id)}>
      <div className="inner-card">
        <ServiceContent service={data?.extra_service} service_req={data} t={t} i18n={i18n} />
      </div>
    </Card>
  );
};

export default CardService;
