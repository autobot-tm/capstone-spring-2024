import { Carousel } from 'antd';
import React from 'react';
import styles from './HomeCarousel.module.scss';
import { Headline } from '../../../../components/Typography';
import SearchBar from '../SearchBar/SearchBar';
import { useTranslation } from 'react-i18next';
const HomeCarousel = ({ images, limit }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.carouselContainer}>
      <Carousel autoplay>
        {images.slice(0, limit).map((image, index) => {
          return (
            <div key={index} className={styles.imagesContainer}>
              <img className={styles.homeImage} src={image} />
            </div>
          );
        })}
      </Carousel>
      <div className={styles.typographyContainer}>
        <div>
          <Headline size={600}>{t('carousel.disclaimer')}</Headline>
        </div>
      </div>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomeCarousel;
