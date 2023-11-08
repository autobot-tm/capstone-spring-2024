import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faComment, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const PostCard = () => {
  return (
    <div className="postcard">
      <div className="header">
        <div className="avatar">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2680&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="title">
          <span className="text">Lorem ipsum dolor sit amet.</span>
          <span className="time">Lorem ipsum.</span>
        </div>
        <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877f2' }} />
      </div>
      <div className="body-post">
        <div className="text">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem minima
            dolores voluptates velit fugit.
          </span>
        </div>
        <div className="post">
          <div className="img">
            <img
              src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="info">
            <span className="link">Lorem ipsum dolor sit.</span>
            <span className="name">Lorem ipsum dolor sit...</span>
            <span className="description">Lorem ipsum dolor sit amet...</span>
          </div>
        </div>
        <hr />
        <div className="stats">
          <div className="like">
            <span>
              <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#91959d' }} /> 100
            </span>
          </div>
          <div className="comment">
            <span>
              <FontAwesomeIcon icon={faComment} style={{ color: '#91959d' }} /> 100
            </span>
          </div>
          <div className="share">
            <span>
              <FontAwesomeIcon icon={faShare} style={{ color: '#91959d' }} /> 100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
