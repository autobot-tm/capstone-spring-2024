import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import PostCard from './PostCard';
import './styles.scss';

const FbCard = () => {
  return (
    <div className="fbcard">
      <div className="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1693974660255-049ab5cbefdb?auto=format&fit=crop&q=80&w=2663&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="fb-info-wrapper">
          <div className="avatar">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2680&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="content">
            <h4>Lorem ipsum dolor</h4>
            <span>Lorem, ipsum.</span>
          </div>
        </div>
        <div className="fb-card">
          <span>
            <FontAwesomeIcon icon={faSquareFacebook} style={{ color: '#375798' }} />
            Lorem ipsum dolor sit.
          </span>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="items">
          <span>Lorem ipsum</span>
          <span>Lorem ipsum</span>
          <span>Lorem ipsum</span>
        </div>
        <div className="body">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default FbCard;
