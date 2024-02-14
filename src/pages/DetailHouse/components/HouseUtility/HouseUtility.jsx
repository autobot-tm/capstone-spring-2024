import React from 'react';
import './HouseUtility.scss';
import { Col, Row } from 'antd';
import { Paragraph } from '../../../../components/Typography';
import { formatCustomCurrency } from '../../../../utils/number-seperator';

const HouseUtility = ({ utilities }) => {
  const halfLength = Math.ceil(utilities.length / 2);

  const firstColumn = utilities.slice(0, halfLength);
  const secondColumn = utilities.slice(halfLength);
  return (
    <div>
      <Row>
        <Col xs={24} md={10} style={{ marginRight: 40 }}>
          {firstColumn.map((utility, index) => (
            <div key={index} className="property-detail-item">
              <Paragraph className="property-detail-group-1">{utility.name}:</Paragraph>{' '}
              <Paragraph className="property-detail-group-2" classNames="color-black" strong>
                {formatCustomCurrency(utility.price_per_unit)}/{utility.unit}
              </Paragraph>
            </div>
          ))}
        </Col>
        <Col xs={24} md={10}>
          {secondColumn.map((utility, index) => (
            <div key={index} className="property-detail-item">
              <Paragraph className="property-detail-group-1">{utility.name}:</Paragraph>{' '}
              <Paragraph className="property-detail-group-2" classNames="color-black" strong>
                {formatCustomCurrency(utility.price_per_unit)}/{utility.unit}
              </Paragraph>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default HouseUtility;
