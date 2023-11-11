import React from 'react';
import { PageLayout } from '../../hoc/Layout';
import { Carousel, Col, Row } from 'antd';
import './styles.scss';
import NewsCard from './components/NewsCard';
import FbCard from '../../components/SideSection/FbCard';
import InfoCards from '../../components/SideSection/InfoCards';
import { useTranslation } from 'react-i18next';
import data from '../../store/testNews.json';
import { TabName } from '../../components/TabName';

export const News = () => {
  const { t } = useTranslation();

  return (
    <>
      <TabName>{t('news-tabName')}</TabName>
      <PageLayout>
        <div id="news">
          <Carousel autoplay>
            <div className="carousel-content">
              <div className="flex">
                <div className="text-wrapper">
                  <h1>{t`news`}</h1>
                </div>
              </div>
            </div>
          </Carousel>
          <div className="container">
            <Row gutter={16}>
              <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                <div className="main">
                  <div className="news-title">{t`news`}</div>
                  <hr />

                  <div className="flex">
                    {data.map(item => (
                      <NewsCard
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        date={item.date}
                        description={item.description}
                      />
                    ))}
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                <div className="side">
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
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
