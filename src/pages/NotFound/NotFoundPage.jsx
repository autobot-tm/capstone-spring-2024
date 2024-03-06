import './style.scss';
import React from 'react';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import { useNavigate } from 'react-router-dom';
import { Headline, Paragraph } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { Helmet } from 'react-helmet';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title> {t('NOT-FOUND.title')} </title>
      </Helmet>
      <div id="bg-not-found">
        <div className="not-found-section">
          <Row className="not-found-section-inner">
            <Col xs={24}>
              <Headline style={{ marginBottom: 15 }} strong>
                {t('NOT-FOUND.title')}
              </Headline>
            </Col>
            <Col xs={24}>
              <Paragraph>{t('NOT-FOUND.description')}</Paragraph>
            </Col>
            <Col xs={24}>
              <BaseButton onClick={() => navigate('/')} className="btn" type="primary">
                {t('NOT-FOUND.back-to-home')}
              </BaseButton>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
