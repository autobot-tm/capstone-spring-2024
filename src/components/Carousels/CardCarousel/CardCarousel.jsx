import { Button, Carousel } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CardCarousel.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HeartTwoTone, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { updateWishlist } from '../../../services/apis/houses.service';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../store/slices/houseSlice';
import { openLoginModal } from '../../../store/slices/modalSlice';

const CardCarousel = ({ images, limit, isHovered, houseId }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const ref = useRef();
  const ids = useSelector(state => state.house.ids);
  const [isWishList, setIsWishList] = useState(false);
  const dispatch = useDispatch();
  const access_token = useSelector(state => state.auth.access_token);

  useEffect(() => {
    if (access_token) {
      setIsWishList(ids.includes(houseId));
    } else {
      setIsWishList(false);
    }
  }, [ids, houseId]);
  const handleAddWishlist = async () => {
    try {
      await updateWishlist({
        added_house_ids: [houseId],
        removed_house_ids: [],
      });
      dispatch(addToWishlist(houseId));
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  const handleRemoveWishlist = async () => {
    try {
      await updateWishlist({
        added_house_ids: [],
        removed_house_ids: [houseId],
      });
      dispatch(removeFromWishlist(houseId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
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
            <LazyLoadImage key={index} effect="blur" src={image} width="100%" height="290px" className={styles.image} />
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
      <div className={styles.heartContainer}>
        {isWishList ? (
          <HeartTwoTone
            twoToneColor={['#ffffff', '#ff395c']}
            className={styles.icon}
            onClick={event => {
              event.stopPropagation();
              handleRemoveWishlist();
            }}
          />
        ) : (
          <HeartTwoTone
            twoToneColor={['#ffffff', 'rgba(0, 0, 0, 0.6)']}
            className={styles.icon}
            onClick={event => {
              if (access_token) {
                event.stopPropagation();
                handleAddWishlist();
              } else {
                event.stopPropagation();
                dispatch(openLoginModal());
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
