import React from 'react';
import './styles.scss';

const BigCard = ({ props }) => {
  return (
    <div className="bigcard">
      <div className="img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=2643&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="content-wrapper">{props}</div>
    </div>
  );
};

export default BigCard;
