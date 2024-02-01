import React from 'react';
import './PropertyHouseDetail.scss';
import { Paragraph } from '../Typography';

const PropertyHouseDetail = ({ icon, name, description }) => {
  return (
    <div className="property-detail">
      <div className="property-detail-group-1">
        <img src={icon} alt="" />
        <Paragraph>{name}:</Paragraph>
      </div>
      <div className="property-detail-group-2">
        <Paragraph strong>{description}</Paragraph>
      </div>
    </div>
  );
};

export default PropertyHouseDetail;
