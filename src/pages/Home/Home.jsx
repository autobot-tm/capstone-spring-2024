import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../hoc/Layout';
// import { TabName } from '../../components/TabName';
import './styles.scss';
import { Carousel, Row, Col } from 'antd';
import BigCard from './components/BigCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faQuestion } from '@fortawesome/free-solid-svg-icons';
import SmallCard from './components/SmallCard';
import MediumCard from './components/MediumCard/MediumCard';
import TextCard from './components/TextCard';
import FbCard from '../../components/SideSection/FbCard';
import InfoCards from '../../components/SideSection/InfoCards';
import { truncate } from '../../utils/text';
export const Home = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div id="home">
        <Row>
          <Col xs={24}>
            <Carousel autoplay>
              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>{t`home-carousel-1.line-1`}</h1>
                    <h2>{t`home-carousel-1.line-2`}</h2>
                    <p>{t`home-carousel-1.line-3`}</p>
                  </div>
                </div>
              </div>

              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>{t`home-carousel-2.line-1`}</h1>
                    <h2>{t`home-carousel-2.line-2`}</h2>
                    <p>{t`home-carousel-2.line-3`}</p>
                  </div>
                </div>
              </div>

              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>{t`home-carousel-3.line-1`}</h1>
                    <h2>{t`home-carousel-3.line-2`}</h2>
                    <p>{t`home-carousel-3.line-3`}</p>
                  </div>
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>

        <Row className="container">
          <Col xs={24} sm={24} md={18} lg={18} xl={18} className="main">
            <BigCard props={t`home-slogan`} />

            <div className="title">
              <FontAwesomeIcon icon={faQuestion} style={{ color: '#009aac' }} />
              {t`home-introduce-question`}
            </div>

            <hr />
            <SmallCard props={t`home-introduce-company`} />

            <div className="title">
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#009aac' }} />
              {t`home-strengths`}
            </div>

            <hr />
            <Row gutter={[24, 24]}>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-1`}
                  description={truncate(t('home-strengths-detail-1'), 70)}
                />
              </Col>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-2`}
                  description={truncate(t('home-strengths-detail-2'), 70)}
                />
              </Col>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-3`}
                  description={truncate(t('home-strengths-detail-3'), 70)}
                />
              </Col>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-4`}
                  description={truncate(t('home-strengths-detail-4'), 70)}
                />
              </Col>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-5`}
                  description={truncate(t('home-strengths-detail-5'), 70)}
                />
              </Col>
              <Col sm={24} md={12} lg={12} xl={12}>
                <MediumCard
                  title={t`home-strengths-6`}
                  description={truncate(t('home-strengths-detail-6'), 70)}
                />
              </Col>
            </Row>

            <TextCard
              title={t`home-greeting`}
              description1={t`home-greeting-description.line-1`}
              description2={t`home-greeting-description.line-2`}
              description3={t`home-greeting-description.line-3`}
              description4={t`home-greeting-description.line-4`}
            />
          </Col>

          <Col xs={24} sm={24} md={6} lg={6} xl={6} className="side">
            <h2>{t`home-side-inf-fb`}</h2>
            <hr />

            <FbCard />
            <h2>{t`home-side-inf`}</h2>
            <hr />

            <InfoCards />
            <div className="image">
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRDdyV8KnQnInE06q1U2hKgX-67wCCNeAyRroKxTUfR6oO1Skcz"
                alt=""
              />
            </div>
            <div className="image">
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRDdyV8KnQnInE06q1U2hKgX-67wCCNeAyRroKxTUfR6oO1Skcz"
                alt=""
              />
            </div>
            <div className="image">
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRDdyV8KnQnInE06q1U2hKgX-67wCCNeAyRroKxTUfR6oO1Skcz"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};
