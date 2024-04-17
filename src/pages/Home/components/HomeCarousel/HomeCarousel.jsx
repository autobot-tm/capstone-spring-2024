import { Carousel } from 'antd';
import React from 'react';
import styles from './HomeCarousel.module.scss';
import { Headline } from '../../../../components/Typography';
import SearchBar from '../SearchBar/SearchBar';
import { useTranslation } from 'react-i18next';

const HomeCarousel = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.carouselContainer}>
      <Carousel autoplay effect="fade">
        {data?.houses?.map((item, index) => {
          return (
            <div key={index} className={styles.imagesContainer}>
              <img className={styles.homeImage} src={item?.image_urls?.[0]} />
            </div>
          );
        })}
      </Carousel>
      <div className={styles.typographyContainer}>
        <div>
          <Headline size={450} classNames="headline-white">
            {t('carousel.disclaimer')}
          </Headline>
        </div>
      </div>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomeCarousel;
