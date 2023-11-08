import React from 'react';
import './styles.scss';
import { Col } from 'antd';

const SmallCard = () => {
  return (
    <div className="smallcard">
      <Col xl={10} className="img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=2643&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </Col>
      <Col xl={14} className="content-wrapper">
        <p>
          ロータスサービスは、PROPOLIFE VIETNAM
          CO.,LTDの運営するコンサルティングサービスです。経験豊富な日本人コンサルタント、弁護士、会計資格者が在籍し、主にベトナムで事業を行う際に必要な許認可、ライセンスコンサルティングを主要業務にしております。会社設立、ライセンス、労働許可証、ベトナムビザなどベトナム進出前と進出後の全般的なアドバイスをさせて頂きながらのサポートが可能です。
        </p>
      </Col>
    </div>
  );
};

export default SmallCard;
