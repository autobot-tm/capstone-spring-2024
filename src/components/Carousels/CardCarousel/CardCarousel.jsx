import { Button, Carousel } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './CardCarousel.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CardCarousel = ({ images, limit, isHovered }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const ref = useRef();

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        draggable
        ref={ref}
        infinite={false}
        afterChange={current => {
          if (current > 0) {
            setShowLeft(true);
          } else setShowLeft(false);
          if (current === limit - 1) {
            setShowRight(false);
          } else setShowRight(true);
        }}>
        {images.slice(0, limit).map((image, index) => {
          return (
            <LazyLoadImage
              key={index}
              effect="blur"
              src={image}
              width="100%"
              height="290px"
              className={styles.image}
            />
          );
        })}
      </Carousel>
      {showLeft && isHovered && (
        <div className={styles.prevButtonContainer}>
          <Button
            icon={<LeftOutlined />}
            size="medium"
            shape="circle"
            onClick={event => {
              ref.current.prev();
              event.stopPropagation();
            }}
          />
        </div>
      )}
      {showRight && isHovered && (
        <div className={styles.nextButtonContainer}>
          <Button
            icon={<RightOutlined />}
            size="medium"
            shape="circle"
            onClick={event => {
              ref.current.next();
              event.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
