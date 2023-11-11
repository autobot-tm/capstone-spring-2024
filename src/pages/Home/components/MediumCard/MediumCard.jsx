import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const MediumCard = ({ title, description }) => {
  return (
    <div className="medium-card">
      <div className="medium-card-img-container">
        <img src="https://picsum.photos/600" alt="" className="medium-card-img" />
      </div>
      <div className="medium-card-content-wrapper">
        <Link to="/">
          <h3 className="medium-card-title">{title}</h3>
        </Link>
        <p className="medium-card-description">{description}</p>
      </div>
    </div>
  );
};

export default MediumCard;
