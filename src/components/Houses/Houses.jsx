import { Col, Row } from 'antd';
import React from 'react';
import HouseItem from '../HouseItem/HouseItem';
const Houses = () => {
  const houses = [
    {
      id: '1',
      houseType: 'House Type',
      locationName: 'Location Name',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis, eveniet veritatis doloremque ut natus sed molestias qui nesciunt earum.',
      price: '6.000.000',
      area: '290',
      bedrooms: '4',
      bathrooms: '3',
    },
    {
      id: '2',
      houseType: 'House Type',
      locationName: 'Location Name',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis, eveniet veritatis doloremque ut natus sed molestias qui nesciunt earum.',
      price: '6.000.000',
      area: '290',
      bedrooms: '4',
      bathrooms: '3',
    },
    {
      id: '3',
      houseType: 'House Type',
      locationName: 'Location Name',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis, eveniet veritatis doloremque ut natus sed molestias qui nesciunt earum.',
      price: '6.000.000',
      area: '290',
      bedrooms: '4',
      bathrooms: '3',
    },
    {
      id: '4',
      houseType: 'House Type',
      locationName: 'Location Name',
      title: 'Lorem ipsum dolor sit amet.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis, eveniet veritatis doloremque ut natus sed molestias qui nesciunt earum.',
      price: '6.000.000',
      area: '290',
      bedrooms: '4',
      bathrooms: '3',
    },
  ];
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row gutter={[16, 16]}>
            {houses.map(house => {
              return (
                <Col lg={12} key={house.id}>
                  <HouseItem house={house} />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col lg={12}>Map</Col>
      </Row>
    </div>
  );
};

export default Houses;
