import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { Button, Tooltip, Row, Col } from 'antd';
import { removeFromWishlist } from '../../../../store/slices/wishlist.slice';
import HouseItem from '../../../../components/HouseItem/HouseItem';
import { Paragraph, SubHeading } from '../../../../components/Typography';
import './style.scss';

const MyWishlist = () => {
  const wishlist = useSelector(state => state.wishlist.houses);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = houseId => {
    dispatch(removeFromWishlist(houseId));
  };
  console.log('wishlist page', wishlist);
  return (
    <>
      <Row justify="center" id="wl-container">
        <Col xs={24}>
          <SubHeading size={230} classNames="d-block" strong>
            My Wishlist
          </SubHeading>
          <Paragraph>
            This page contains all the items you have added to your personal wishlist. Add items to
            your wishlist by click the &quot;heart&quot; icon while logged in to your account.
          </Paragraph>
        </Col>
      </Row>
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
