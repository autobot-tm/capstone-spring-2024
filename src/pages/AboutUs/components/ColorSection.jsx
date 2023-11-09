import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
const ColorSection = () => {
  return (
    <Row id="colorsection">
      <Col xs={24} sm={24} md={24} lg={8} xl={8} className="about-us">
        <div className="image">
          <img
            src="https://ak-d.tripcdn.com/images/200d1a0000018pbcr11F3_R_640_440_R5_D.webp"
            alt=""
          />
          <div className="info">
            <span>Lorem, ipsum.</span>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={14} xl={14} className="content">
        <span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sit mollitia laborum
          ratione voluptatibus nam odit vel veniam temporibus fugiat praesentium minus impedit
          beatae, soluta iste in doloremque enim aperiam? Enim doloribus, nobis cum quidem sed
          debitis! Maxime odio enim eos quis, porro adipisci eligendi magni exercitationem
          praesentium? Aspernatur modi veritatis impedit aperiam perferendis ut nostrum itaque. Amet
          perspiciatis, totam quis distinctio explicabo qui tempore cum natus at, nulla quas! Velit
          amet incidunt enim soluta laudantium quam omnis, expedita aut quisquam sint autem! A quasi
          laboriosam cumque enim molestiae dolor fugiat, ullam facere totam debitis. Tempore totam
          eos expedita mollitia.
        </span>
      </Col>
    </Row>
  );
};

export default ColorSection;
