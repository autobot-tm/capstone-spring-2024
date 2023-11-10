import React from 'react';
import './styles.scss';

const TextCard = ({ title, description1, description2, description3, description4 }) => {
  return (
    <div className="textcard">
      <div className="title-wrapper">
        <h3>{title}</h3>
        <hr />
      </div>
      <div className="content-wrapper">
        <p>
          {description1} <br />
          <br />
          {description2} <br />
          <br />
          {description3} <br />
          <br />
          {description4}
        </p>
      </div>
    </div>
  );
};

export default TextCard;
