import { Carousel } from 'antd';
import React from 'react';
import styles from './CardCarousel.module.scss';

const CardCarousel = ({ images, limit }) => {
  return (
    <Carousel>
      {images.slice(0, limit).map((image, index) => {
        return (
          <div key={index}>
            <img className={styles.cardImage} src={image} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CardCarousel;
