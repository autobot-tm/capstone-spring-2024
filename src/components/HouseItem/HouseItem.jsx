import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import styles from './HouseItem.module.scss';
import locationIcon from '../../assets/images/location.svg';
import areaIcon from '../../assets/images/area.svg';
import bedroomIcon from '../../assets/images/bedroom.svg';
import bathroomIcon from '../../assets/images/bathroom.svg';

import { Caption, SubHeading } from '../Typography';
import CardCarousel from '../Carousels/CardCarousel/CardCarousel';

const HouseItem = ({ house }) => {
  const demoData = [
    {
      key: 1,
      image:
        'https://images.unsplash.com/photo-1682687980961-78fa83781450?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      key: 2,
      image:
        'https://images.unsplash.com/photo-1706650079705-160f2c07c913?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      key: 3,
      image:
        'https://images.unsplash.com/photo-1706743793262-cdc71138ea90?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      key: 4,
      image:
        'https://plus.unsplash.com/premium_photo-1685940926959-b4a66aabee46?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      key: 5,
      image:
        'https://images.unsplash.com/photo-1682685797439-a05dd915cee9?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <Card
      className={styles.card}
      hoverable
      cover={<CardCarousel images={demoData} />}
      actions={[
        <div key="houseInfo" className={styles.houseInfo}>
          <div className={styles.price}>
            <SubHeading key="price" size={230} strong>
              {house.price}
            </SubHeading>
            <Caption size={110}>VND / month</Caption>
          </div>
          <div className={styles.detail}>
            <div className={styles.itemContainer}>
              <div className={styles.imageContainer}>
                <img src={areaIcon} alt="" />
              </div>
              <Caption size={140}>
                {house.area} m<sup>2</sup>
              </Caption>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.imageContainer}>
                <img src={bedroomIcon} alt="" />
              </div>
              <Caption size={140}>{house.bedrooms}</Caption>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.imageContainer}>
                <img src={bathroomIcon} alt="" />
              </div>
              <Caption size={140}>{house.bathrooms}</Caption>
            </div>
          </div>
        </div>,
      ]}>
      <Meta
        title={
          <>
            <div className={styles.locationContainer}>
              <div className={styles.houseTypeContainer}>
                <img src={locationIcon} alt="" />
                <Caption size={110}>{house.houseType} - </Caption>
              </div>
              <div className={styles.houseLocationContainer}>
                <Caption size={110}>{house.locationName}</Caption>
              </div>
            </div>
            <SubHeading size={230} strong ellipsis>
              {house.title}
            </SubHeading>
          </>
        }
        description={
          <Caption size={140} ellipsis>
            {house.description}
          </Caption>
        }
      />
    </Card>
  );
};

export default HouseItem;
