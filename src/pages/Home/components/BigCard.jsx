import React from 'react';
import './styles.scss';

const BigCard = ({ props }) => {
  return (
    <div className="bigcard">
      <div className="img-wrapper">
        <img src="https://picsum.photos/600" alt="" />
      </div>
      <div className="content-wrapper">{props}</div>
    </div>
  );
};

export default BigCard;
