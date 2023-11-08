import React from 'react';
import { Layout } from 'antd';
import './styles.scss';
import { Row, Col } from 'antd';

const { Footer } = Layout;
export const LayoutFooter = () => {
  return (
    <Footer className="footer">
      <Row className="footer-top">
        <Col xs={24} sm={24} md={6} lg={6} xl={6} className="footer-container">
          ロータスサービスは、PROPOLIFE VIETNAM
          CO.,LTDの運営するコンサルティングサービスです。実績豊富な日本人担当者と法の運用に強く日本語堪能なベトナム人弁護士で、安心のサポートをご提供しており、特に進出支援はご担当者からご好評頂いております。進出ご検討の際や進出後にお困りのことが御座いましたらお気軽に御相談下さい。
        </Col>
      </Row>

      <Row className="footer-bottom">
        <div className="footer-container footer-bottom-container">
          <Col className="footer-logo-container" xs={24} sm={24} md={6} lg={6} xl={6}></Col>

          <Col className="footer-address-container" xs={24} sm={24} md={12} lg={12} xl={12}>
            <p>
              弊社は、ホーチミン市の日本人街レタントン通りすぐにございます。
              <br />
              26 Thi Sach,Ben Nghe Ward,District1,HCMC,Vietnam
              <br />
              （営業事務所は弊社で運営するプロスタイルホテルホーチミン内のオフィスにございます。）
              <br />
              レタントンのCJビルディング19階は現在グループ会社のLogknot Vietnam
              Co.,Ltdのオフィスにしております。
              <br />
              ホーチミン市事務所かオンラインで進出面談を行っております。
              <br />
              株式会社LogProstyle Group
              <br />
              東京都港区北青山3-6-23
              <br />
              <br />
              Vietnam Copyright © 2012 PROPOLIFE VIETNAM. All Rights Reserved.
            </p>
          </Col>

          <Col className="footer-contact-container" xs={24} sm={24} md={6} lg={6} xl={6}>
            <p>
              ベトナム国内から: 028 3827 5068
              <br />
              日本・海外から: +84(0)28 3827 5068
              <br />
            </p>
          </Col>
        </div>
      </Row>
    </Footer>
  );
};
