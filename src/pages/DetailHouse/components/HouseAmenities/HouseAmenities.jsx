import React from 'react';
import './HouseAmenities.scss';
import { Col, Row } from 'antd';
import { Paragraph } from '../../../../components/Typography';
import { imagesAmenities } from '../../../../assets/images';
import { useTranslation } from 'react-i18next';

const HouseAmenities = ({ amenities }) => {
  const { t } = useTranslation();
  const halfLength = Math.ceil(amenities.length / 2);
  const firstColumn = amenities.slice(0, halfLength);
  const secondColumn = amenities.slice(halfLength);
  return (
    <>
      <Row>
        <Col xs={24} md={10} style={{ marginRight: 60 }}>
          {firstColumn.map((amenity, index) => (
            <div key={index} className="property-detail-item">
              <span className="property-detail-group-1">
                <img
                  src={imagesAmenities[amenity.name.replace(/\s/g, '')]}
                  alt={amenity.name}
                  className="icon"
                />
                <Paragraph>{t(`detail-house.${amenity.name.replace(/\s/g, '')}`)}: </Paragraph>
              </span>
              <Paragraph strong className="property-detail-group-2" classNames="color-black">
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
                <Paragraph>{t(`detail-house.${amenity.name.replace(/\s/g, '')}`)}: </Paragraph>
              </span>
              <Paragraph strong className="property-detail-group-2" classNames="color-black">
                {amenity.amount}
              </Paragraph>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default HouseAmenities;
