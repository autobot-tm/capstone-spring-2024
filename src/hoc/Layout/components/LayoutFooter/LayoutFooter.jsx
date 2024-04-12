import React from 'react';
import { Col, Divider, Layout, Row } from 'antd';
import './styles.scss';
import { Caption } from '../../../../components/Typography/Caption/Caption';
import { Paragraph } from '../../../../components/Typography/Paragraph/Paragraph';
import { HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SubHeading } from '../../../../components/Typography';
import { useNavigate } from 'react-router-dom';

const { Footer } = Layout;
export const LayoutFooter = () => {
  const { t } = useTranslation();
  const { access_token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <Footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <Row gutter={[10, 10]}>
            <Col lg={7} xs={24}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                <div style={{ width: '150px', height: '50px' }}>
                  <SubHeading strong size="260">
                    Logo
                  </SubHeading>
                </div>
                <Caption size={110} classNames="color-black">
                  A contemporary theme we designed specifically for real estate and property showcase websites, equipped
                  with every option, element and feature your site may need.
                </Caption>
              </div>
            </Col>

            <Col lg={4} sm={8} xs={12}>
              <Paragraph strong classNames="color-black">
                {t('footer.links')}
              </Paragraph>
              <ul>
                <li>
                  <Caption
                    size={140}
                    onClick={() => {
                      navigate('/');
                    }}>
                    {t('home')}
                  </Caption>
                </li>
                <li>
                  <Caption
                    size={140}
                    onClick={() => {
                      navigate('/about');
                    }}>
                    {t('about')}
                  </Caption>
                </li>
                <li>
                  <Caption
                    size={140}
                    onClick={() => {
                      navigate('/support');
                    }}>
                    {t('support')}
                  </Caption>
                </li>

                {access_token && (
                  <>
                    <li>
                      <Caption
                        size={140}
                        onClick={() => {
                          navigate('/management');
                        }}>
                        {t('management')}
                      </Caption>
                    </li>
                    <li>
                      <Caption
                        size={140}
                        onClick={() => {
                          navigate('/wishlist');
                        }}>
                        {t('wishlist')}
                      </Caption>
                    </li>
                  </>
                )}
              </ul>
            </Col>
            <Col lg={8} sm={16} xs={24}>
              <Paragraph strong classNames="color-black">
                {t('footer.contact')}
              </Paragraph>
              <ul>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                  <HomeOutlined style={{ marginTop: '4px' }} />

                  <Caption size={140}>
                    8F Miss Aodai Building, 21 Nguyen Trung Ngan, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam
                  </Caption>
                </li>

                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <MailOutlined />
                  <Caption size={140}>info@aodaihousing.com</Caption>
                </li>
                <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <PhoneOutlined />
                  <Caption size={140}>028-3827-5068</Caption>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer-bottom">
        <Divider style={{ margin: 0 }} />

        <div className="footer-container footer-bottom-container">
          <div className="footer-logo-container">
            <Caption size={110}> Copyright © 2024 SZK VIETNAM. All Rights Reserved.</Caption>
          </div>
          <div className="footer-contact-container">
            <Caption size={110} strong classNames="color-black">
              Follow us:
            </Caption>
            <Caption size={110}> Instagram, </Caption>
            <Caption size={110}>Facebook, </Caption>
            <Caption size={110}>Youtube, </Caption>
            <Caption size={110}>Twitter</Caption>
          </div>
        </div>
      </div>
    </Footer>
  );
};
