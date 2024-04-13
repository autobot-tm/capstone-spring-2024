import './styles.scss';
import React from 'react';
import { Card } from 'antd'; // Import các component cần thiết
import { ThunderboltOutlined, FileProtectOutlined } from '@ant-design/icons';
import { SubHeading } from '../../../../components/Typography';
import WATER from '../../../../assets/images/water-drop-svgrepo-com.svg';

const CardRequest = ({ type, color, onClickRequest, t }) => {
  return (
    <Card
      hoverable
      className="cs-card"
      onClick={() => onClickRequest(type)}
      style={{
        border: `2px solid ${color}`,
      }}>
      <div className="content-card">
        <span className="content-card-top">
          {type === 'electricity' && (
            <>
              <SubHeading size={230} strong style={{ width: '60%' }}>
                {t('EXTRA-SERVICES.electricity-card')}
              </SubHeading>
              <ThunderboltOutlined className="es-icon es-icon-primary" style={{ fontSize: 30 }} />
            </>
          )}
          {type === 'water' && (
            <>
              <SubHeading size={230} strong style={{ width: '60%' }}>
                {t('EXTRA-SERVICES.water-card')}
              </SubHeading>
              <img src={WATER} className="es-icon es-icon-tertiary" alt="" />
            </>
          )}
          {type === 'residence' && (
            <>
              <SubHeading size={230} strong style={{ width: '60%' }}>
                {t('EXTRA-SERVICES.residence-card')}
              </SubHeading>
              <FileProtectOutlined className="es-icon es-icon-others" style={{ fontSize: 30 }} />
            </>
          )}
        </span>
        <span>
          <a href="#" style={{ color: `${color}`, fontWeight: 600 }}>
            {t('button.request')}
          </a>
        </span>
      </div>
    </Card>
  );
};

export default CardRequest;
