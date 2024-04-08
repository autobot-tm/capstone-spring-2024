import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import styles from './HouseItem.module.scss';
import locationIcon from '../../assets/images/location.svg';
import areaIcon from '../../assets/images/SizeIcon.svg';
import { Caption, Paragraph, SubHeading } from '../Typography';
import CardCarousel from '../Carousels/CardCarousel/CardCarousel';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { useNavigate } from 'react-router-dom';
import { HousePropertyName, HousePropertyUnit } from '../../constants/house.constant';
import { housePropertiesIconMapper } from '../../utils/house';

const HouseItem = ({ house }) => {
  const LIMIT_IMAGES = 5;
  const AMENITIES_NAME = [HousePropertyName.BEDROOMS, HousePropertyName.BATHROOMS];
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate('/houses/' + house.id);
      }}
      className={styles.card}
      hoverable
      cover={<CardCarousel isHovered={isHovered} images={house.image_urls} limit={LIMIT_IMAGES} houseId={house.id} />}
      actions={[
        <div key="houseInfo" className={styles.houseInfo}>
          <div className={styles.price}>
            <Paragraph size={160} key="price" strong classNames="color-black">
              {formatCustomCurrency(house.pricing_policies[0].price_per_month)}
            </Paragraph>
          </div>
          <div className={styles.detail}>
            <div className={styles.itemContainer}>
              <div className={styles.imageContainer}>
                <img src={areaIcon} alt="" />
              </div>
              <Caption size={140}>
                {house.size_in_m2}
                {HousePropertyUnit.METER_SQUARE}
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
                <Caption size={140}>{house.address}</Caption>
              </div>
            </div>
            <SubHeading size={230} strong ellipsis classNames="color-black">
              {house.name}
            </SubHeading>
          </>
        }
        description={
          <Paragraph size={160} ellipsis>
            {house.description}
          </Paragraph>
        }
      />
    </Card>
  );
};
const PropertyItem = ({ name, amount }) => {
  const { icon } = housePropertiesIconMapper(name);
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={icon} />
      </div>
      <Caption size={140}>{amount}</Caption>
    </div>
  );
};

export default HouseItem;
