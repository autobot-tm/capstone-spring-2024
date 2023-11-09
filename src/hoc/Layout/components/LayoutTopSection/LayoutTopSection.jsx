import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { DoubleRightOutlined } from '@ant-design/icons';

export const LayoutTopSection = () => {
  return (
    <Layout id="layout-top-section">
      <Content className="container">
        <Row gutter={30}>
          <Col className="ant-col" xs={24} sm={24} md={10} lg={10} xl={6}>
            <div className="navbar-brand"></div>
          </Col>

          <Col className="ant-col ant-col-xs" xs={24} sm={24} md={6} lg={6} xl={6}>
            <a className="phone-header-section" href="tel:+842838275068">
              +84(0)28 3827 5068
            </a>
          </Col>

          <Col className="ant-col ant-col-xl" xs={0} sm={0} md={10} lg={6} xl={5}>
            <p>
              会社設立・駐在員事務所設立 <br />
              スタートアップ支援 <br />
              ライセンスの取得・変更・更新 <br />
              ベトナムビザ・労働許可証
            </p>
          </Col>

          <Col className="ant-col ant-col-xl ant-col-lg" xs={24} sm={24} md={6} lg={8} xl={8}>
            <div className="contact-layout">
              <i>
                {' '}
                <FontAwesomeIcon
                  style={{
                    height: '30px',
                    marginRight: '5px',
                    color: '#F4979F',
                  }}
                  icon={faPhone}
                />
              </i>{' '}
              <span>
                ベトナム国内から:{' '}
                <a style={{ color: '#F4979F' }} href="tel:028 3827 5068">
                  028 3827 5068
                </a>{' '}
                <br />
                日本・海外から:
                <a style={{ color: '#F4979F' }} href="tel: +84(0)28 3827 5068">
                  {' '}
                  +84(0)28 3827 5068
                </a>
              </span>
            </div>
          </Col>

          <Col className="ant-col ant-col-xl ant-col-lg" xs={0} sm={0} md={4} lg={4} xl={4}>
            <div className="contact-layout">
              <Button size="small" style={{ height: 'auto' }} type="primary">
                <span style={{ display: 'flex', fontWeight: 700, fontSize: '16px' }}>
                  <p>
                    各支援サービスについて
                    <br />
                    WEBから相談する
                  </p>
                  <DoubleRightOutlined style={{ fontSize: '40px' }} />
                </span>
              </Button>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
