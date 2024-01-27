import React from 'react';
import { Layout } from 'antd';
import './styles.scss';

const { Footer } = Layout;
export const LayoutFooter = () => {
  return (
    <Footer className="page-footer">
      <div className="page-footer-top-area">
        <div className="page-footer-top-area-inner">
          <div className="page-footer-top-area-inner-info">
            <span className="logo" />
            <span className="contemporary-theme">
              A contemporary theme we designed specifically for real estate and property showcase
              websites, equipped with every option, element and feature your site may need.
            </span>
            <span className="read-more">Read more</span>
          </div>
          <div className="page-footer-top-area-inner-info">
            <span className="title">Contact Us</span>
            <p>Staten Island, NY 10314, USA</p>
            <p>+111 222 369 45</p>
            <p>+123 456 789 11</p>
            <p>newhome@example.com</p>
          </div>
          <div className="page-footer-top-area-inner-info">
            <span className="title">Categories</span>
            <p>Recent property</p>
            <p>To Buy</p>
            <p>To Sell</p>
            <p>To Rent</p>
          </div>
          <div className="page-footer-top-area-inner-info">
            <span className="title">Links</span>
            <p>Latest News</p>
            <p>About Us</p>
            <p>FAQ Page</p>
            <p>Contact Us</p>
          </div>
        </div>
      </div>
      <div className="page-footer-bottom-area">
        <div className="page-footer-bottom-area-info-left">
          <p>© 2024 Qoode Interactive, All Rights Reserved</p>
        </div>
        <div className="page-footer-bottom-area-info-right">
          <p>
            <b>Follow us:</b>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Youtube</a>
            <a href="#">Twitter</a>
          </p>
        </div>
      </div>
    </Footer>
  );
};
