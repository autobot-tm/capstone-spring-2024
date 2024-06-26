import { Carousel } from 'antd';
import React from 'react';
import './style.scss';

const CarouselHeader = ({ img }) => {
  return (
    <div id="container-carousel">
      <Carousel autoplay>
        {img.map((image, index) => (
          <div key={index} className="header-carousel">
            <img src={image} alt={`Carousel Image ${index}`} className="img-carousel" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHeader;
