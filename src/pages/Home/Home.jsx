import React from 'react';
// import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../hoc/Layout';
// import { TabName } from '../../components/TabName';
import './styles.scss';
import { Carousel, Row, Col } from 'antd';
import BigCard from './components/BigCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faQuestion } from '@fortawesome/free-solid-svg-icons';
import SmallCard from './components/SmallCard';
import MediumCard from './components/MediumCard';
import TextCard from './components/TextCard';
import FbCard from '../../components/SideSection/FbCard';
import InfoCards from '../../components/SideSection/InfoCards';

export const Home = () => {
  // const { t } = useTranslation();

  return (
    <PageLayout>
      <div id="home">
        <Row>
          <Col xs={24}>
            <Carousel autoplay>
              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>Lorem, ipsum.</h1>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus,
                      explicabo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>Lorem, ipsum.</h1>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus,
                      explicabo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-content">
                <div className="flex">
                  <div className="text-wrapper">
                    <h1>Lorem, ipsum.</h1>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus,
                      explicabo.
                    </p>
                  </div>
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>

        <Row className="container">
          <Col xs={24} sm={24} md={18} lg={18} xl={18} className="main">
            <BigCard />

            <div className="title">
              <FontAwesomeIcon icon={faQuestion} style={{ color: '#009aac' }} />
              Lorem ipsum dolor sit.
            </div>

            <hr />
            <SmallCard />

            <div className="title">
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#009aac' }} />
              Lorem ipsum dolor sit.
            </div>

            <hr />
            <div className="flex">
              <MediumCard />
              <MediumCard />
              <MediumCard />
              <MediumCard />
              <MediumCard />
              <MediumCard />
            </div>

            <TextCard />
          </Col>

          <Col xs={24} sm={24} md={6} lg={6} xl={6} className="side">
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
            <hr />

            <FbCard />
            <h2>Lorem</h2>
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
