import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import styles from './HouseItem.module.scss';
import locationIcon from '../../assets/images/location.svg';
import areaIcon from '../../assets/images/SizeIcon.svg';

import { Caption, Paragraph } from '../Typography';
import CardCarousel from '../Carousels/CardCarousel/CardCarousel';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Link } from 'react-router-dom';
import { HousePropertyName } from '../../constants/house.constant';
import { housePropertiesIconMapper } from '../../utils/house';

const HouseItem = ({ house, type }) => {
  const LIMIT_IMAGES = 5;
  const AMENITIES_NAME = [HousePropertyName.BEDROOMS, HousePropertyName.BATHROOMS];
  return (
    <Link to={'/houses/' + house.id}>
      <Card
        className={styles.card}
        hoverable
        cover={<CardCarousel images={house.image_urls} limit={LIMIT_IMAGES} />}
        actions={[
          <div key="houseInfo" className={styles.houseInfo}>
            <div className={styles.price}>
              {type === 'home' ? (
                <Paragraph key="price" size={160} strong>
                  {formatCustomCurrency(house.pricing_policies[0].price_per_month)}
                </Paragraph>
              ) : (
                <Caption size={140} strong>
                  {formatCustomCurrency(house.pricing_policies[0].price_per_month)}
                </Caption>
              )}
            </div>
            <div className={styles.detail}>
              <div className={styles.itemContainer}>
                <div className={styles.imageContainer}>
                  <img src={areaIcon} alt="" />
                </div>
                <Caption size={110}>
                  {house.size_in_m2} m<sup>2</sup>
                </Caption>
              </div>
              {AMENITIES_NAME.map((name, index) => {
                const amenitiesToShow = house.amenities?.find(amenity => amenity.name === name);
                return <PropertyItem amount={amenitiesToShow?.amount} name={name} key={index} />;
              })}
            </div>
          </div>,
        ]}>
        <Meta
          title={
            <>
              <div className={styles.locationContainer}>
                <div className={styles.houseLocationContainer}>
                  <img src={locationIcon} alt="" />
                  <Caption size={110}>{house.address}</Caption>
                </div>
              </div>
              {type === 'home' ? (
                <Paragraph size={160} strong ellipsis>
                  {house.name}
                </Paragraph>
              ) : (
                <Caption size={140} strong ellipsis>
                  {house.name}
                </Caption>
              )}
            </>
          }
          description={
            <Caption size={140} ellipsis>
              {house.description}
            </Caption>
          }
        />
      </Card>
    </Link>
  );
};
const PropertyItem = ({ name, amount }) => {
  const { icon } = housePropertiesIconMapper(name);
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={icon} />
      </div>
      <Caption size={110}>{amount}</Caption>
    </div>
  );
};

export default HouseItem;
