import React from 'react';
import './HouseAmenities.scss';
import { Col, Row } from 'antd';
import { Paragraph } from '../../../../components/Typography';
import { imagesAmenities } from '../../../../assets/images';

const HouseAmenities = ({ amenities }) => {
  const halfLength = Math.ceil(amenities.length / 2);

  const firstColumn = amenities.slice(0, halfLength);
  const secondColumn = amenities.slice(halfLength);
  return (
    <div>
      <Row>
        <Col xs={24} md={10} style={{ marginRight: 40 }}>
          {firstColumn.map((amenity, index) => (
            <div key={index} className="property-detail-item">
              <span className="property-detail-group-1">
                <img
                  src={imagesAmenities[amenity.name.replace(/\s/g, '')]}
                  alt={amenity.name}
                  className="icon"
                />
                <Paragraph>{amenity.name}: </Paragraph>
              </span>
              <Paragraph
                strong
                className="property-detail-group-2 color-black"
                classNames="color-black">
                {amenity.amount}
              </Paragraph>
            </div>
          ))}
        </Col>
        <Col xs={24} md={10}>
          {secondColumn.map((amenity, index) => (
            <div key={index} className="property-detail-item">
              <span className="property-detail-group-1">
                <img
                  src={imagesAmenities[amenity.name.replace(/\s/g, '')]}
                  alt={amenity.name}
                  className="icon"
                />
                <Paragraph>{amenity.name}: </Paragraph>
              </span>
              <Paragraph strong className="property-detail-group-2" classNames="color-black">
                {amenity.amount}
              </Paragraph>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default HouseAmenities;
