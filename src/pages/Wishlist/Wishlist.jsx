import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { Col, Result, Row } from 'antd';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import HouseItem from '../../components/HouseItem/HouseItem';
import { getWishlist } from '../../services/apis/houses.service';
import { Headline, SubHeading } from '../../components/Typography';
import { useTranslation } from 'react-i18next';
import { FrownTwoTone } from '@ant-design/icons';

const Wishlist = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    getWishlist()
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <Layout>
      <div className="wishlist-container">
        <div style={{ margin: '40px 0' }}>
          <Headline size={450}>{t('wishlist')}</Headline>
        </div>

        <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
          {isLoading ? (
            <SpinLoading />
          ) : data.length !== 0 ? (
            data.map(item => (
              <Col lg={8} sm={12} xs={24} key={item.id}>
                <HouseItem house={item.house} />
              </Col>
            ))
          ) : (
            <div
              style={{
                width: '100%',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Result
                icon={<FrownTwoTone twoToneColor="#f8a11e" />}
                title={<SubHeading classNames="color-black">{t('noresult')}</SubHeading>}
              />
            </div>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default Wishlist;
