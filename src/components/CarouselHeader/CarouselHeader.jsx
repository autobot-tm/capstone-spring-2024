import { Carousel } from 'antd';
import React from 'react';
import './CarouselHeader.scss';

const CarouselHeader = () => {
  return (
    <Carousel autoplay>
      <div className="header-carousel">
        <img
          src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-half-map-image-3.jpg"
          alt=""
          className="img-carousel"
        />
      </div>
      <div className="header-carousel">
        <img
          src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/mountain-cabin02.jpg"
          alt=""
          className="img-carousel"
        />
      </div>
      <div className="header-carousel">
        <img
          src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/mountain-cabin04.jpg"
          alt=""
          className="img-carousel"
        />
      </div>
      <div className="header-carousel">
        <img
          src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/mountain-cabin03.jpg"
          alt=""
          className="img-carousel"
        />
      </div>
    </Carousel>
  );
};

export default CarouselHeader;
