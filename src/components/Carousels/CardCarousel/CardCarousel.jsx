import { Carousel } from 'antd';
import React from 'react';
import styles from './CardCarousel.module.scss';

const CardCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map(image => {
        return (
          <div key={image.key}>
            <img className={styles.cardImage} src={image.image} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CardCarousel;
