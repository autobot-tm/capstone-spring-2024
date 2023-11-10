import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const NewsCard = ({ title, date, description }) => {
  return (
    <div id="newscard">
      <div className="header">
        <span className="news-card-title">{title}</span>
        <span className="news-time">
          {' '}
          <i>{date}</i>
        </span>
      </div>
      <div className="body">
        <span>{description}</span>
      </div>
      <div
        onClick={() => {
          alert('updating..');
        }}
        className="button-wrapper">
        <div className="custome-button">
          view the detail
          <FontAwesomeIcon icon={faArrowRight} style={{ color: '#ffffff' }} />
        </div>
        <hr />
      </div>
    </div>
  );
};

export default NewsCard;
