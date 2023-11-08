import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const NewsCard = () => {
  return (
    <div id="newscard">
      <div className="header">
        <span className="news-card-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas.
        </span>
        <span className="news-time">Lorem, ipsum dolor.</span>
      </div>
      <div className="body">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, maiores reprehenderit
          magni omnis voluptatibus commodi enim soluta numquam ipsum deserunt?
        </span>
      </div>
      <div className="button-wrapper">
        <div className="custome-button">
          view the detail
          <FontAwesomeIcon icon={faArrowRight} style={{ color: '#ffffff' }} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NewsCard;
