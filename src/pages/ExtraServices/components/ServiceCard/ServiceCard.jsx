import './styles.scss';
import React from 'react';
import HOUSE_CLEAN from '../../../../assets/images/house_clean.png';
import WATER from '../../../../assets/images/water-drop-svgrepo-com.svg';
import SERVICE_OTHER from '../../../../assets/images/services.png';
import { FileProtectOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { SubHeading } from '../../../../components/Typography';

const ServiceCard = ({ i18n, id, name, name_in_jp, onClickCard, service }) => {
  const electricityId = '6c97d820-c715-4cdb-95b4-75d28d4b9330';
  const waterId = 'ccd0f4e1-c163-46b5-a926-7989d8664234';
  const residenceId = '3cda8873-adc6-4c44-bf10-993177baa513';
  const houseCleanId = '96209508-423c-4f80-b944-51c8a78f1a55';

  return (
    <>
      <Card hoverable className="service-card" onClick={() => onClickCard(service)}>
        <div className="service-card-icon">
          {id === electricityId ? (
            <>
              <ThunderboltOutlined className="es-icon es-icon-primary" style={{ fontSize: 40 }} />
            </>
          ) : id === waterId ? (
            <>
              <span className="es-icon es-icon-tertiary">
                <img src={WATER} alt="" />
              </span>
            </>
          ) : id === residenceId ? (
            <>
              <FileProtectOutlined className="es-icon es-icon-residence" style={{ fontSize: 40 }} />
            </>
          ) : id === houseCleanId ? (
            <>
              <span className="es-icon es-icon-secondary">
                <img src={HOUSE_CLEAN} alt="" />
              </span>
            </>
          ) : (
            <>
              <span className="es-icon es-icon-other">
                <img src={SERVICE_OTHER} alt="" />
              </span>
            </>
          )}
        </div>
        <SubHeading classNames="d-block" strong>
          {i18n.language === 'en' || !name_in_jp ? name : name_in_jp}
        </SubHeading>
      </Card>
    </>
  );
};

export default ServiceCard;
