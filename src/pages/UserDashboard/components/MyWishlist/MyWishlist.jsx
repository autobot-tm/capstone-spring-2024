import React, { useEffect, useState } from 'react';

import { Paragraph, SubHeading } from '../../../../components/Typography';
import './style.scss';
import { Col, Row } from 'antd';
import SpinLoading from '../../../../components/SpinLoading/SpinLoading';
import { getWishlist } from '../../../../services/apis/houses.service';
import HouseItem from '../../../../components/HouseItem/HouseItem';

const MyWishlist = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getWishlist().then(response => {
      setData(response);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <div className="wishlist-container">
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <SubHeading size={230} strong>
              My Wishlist
            </SubHeading>
            <Paragraph>
              This page contains all the items you have added to your personal wishlist. Add items to your wishlist by
              click the &quot;heart&quot; icon while logged in to your account.
            </Paragraph>
          </div>
        </div>

        <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
          {isLoading ? (
            <SpinLoading />
          ) : (
            data.map(item => (
              <Col lg={8} sm={12} xs={24} key={item.id}>
                <HouseItem house={item.house} />
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  );
};

export default MyWishlist;
