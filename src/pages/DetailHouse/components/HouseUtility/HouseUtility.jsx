import React from 'react';
import './HouseUtility.scss';
import { Col, Row } from 'antd';
import { Paragraph } from '../../../../components/Typography';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { imagesUtility } from '../../../../assets/images';
import { useTranslation } from 'react-i18next';

const HouseUtility = ({ utilities }) => {
  const { t } = useTranslation();
  const halfLength = Math.ceil(utilities.length / 2);
  const firstColumn = utilities.slice(0, halfLength);
  const secondColumn = utilities.slice(halfLength);
  return (
    <>
      <Row gutter={[48, 16]}>
        <Col xs={24} md={12}>
          {firstColumn.map((utility, index) => (
            <div key={index} className="property-detail-item">
              <span className="property-detail-group-1">
                <img src={imagesUtility[utility.name.replace(/\s/g, '')]} alt={utility.name} className="icon" />
                <Paragraph>{t(`detail-house.${utility.name.replace(/\s/g, '')}`)} </Paragraph>
              </span>
              <Paragraph className="property-detail-group-2" classNames="color-black" strong>
                {formatCustomCurrency(utility.price_per_unit)}/{utility.unit}
              </Paragraph>
            </div>
          ))}
        </Col>
        <Col xs={24} md={12}>
          {secondColumn.map((utility, index) => (
            <div key={index} className="property-detail-item">
              <span className="property-detail-group-1">
                <img src={imagesUtility[utility.name.replace(/\s/g, '')]} alt={utility.name} className="icon" />
                <Paragraph>{t(`detail-house.${utility.name.replace(/\s/g, '')}`)} </Paragraph>
              </span>
              <Paragraph className="property-detail-group-2" classNames="color-black" strong>
                {formatCustomCurrency(utility.price_per_unit)}
              </Paragraph>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default HouseUtility;
