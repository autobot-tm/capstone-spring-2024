import React from 'react';
import { Layout } from 'antd';
import './styles.scss';

const { Footer } = Layout;
export const LayoutFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-top">
        <div className="footer-container">footer top</div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-container">
          <div className="footer-logo-container">Logo</div>
          <div className="footer-address-container">Address</div>
          <div className="footer-contact-container">Contact</div>
        </div>
      </div>
    </Footer>
  );
};
