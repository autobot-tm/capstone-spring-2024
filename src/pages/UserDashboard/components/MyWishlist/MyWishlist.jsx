import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { Button, Tooltip, Row } from 'antd';
import { removeFromWishlist } from '../../../../store/slices/wishlist.slice';
import HouseItem from '../../../../components/HouseItem/HouseItem';

const MyWishlist = () => {
  const wishlist = useSelector(state => state.wishlist.houses);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = houseId => {
    dispatch(removeFromWishlist(houseId));
  };
  console.log('wishlist page', wishlist);
  return (
    <>
      {wishlist.length > 0 ? (
        wishlist.map(house => (
          <div key={house.id}>
            <HouseItem house={house} type="wishlist" />
            <Row>
              <Tooltip placement="right" title="Remove from Wishlist">
                <Button onClick={() => handleRemoveFromWishlist(house.id)}>
                  <StarOutlined />
                </Button>
              </Tooltip>
            </Row>
          </div>
        ))
      ) : (
        <div>No house</div>
      )}
    </>
  );
};

export default MyWishlist;
