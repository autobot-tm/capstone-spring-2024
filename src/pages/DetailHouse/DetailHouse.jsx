import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import { Headline } from '../../components/Typography/Headline/Headline';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { EyeOutlined, StarOutlined } from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';
import { Caption, SubHeading } from '../../components/Typography';
import { Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getHouseById } from '../../services/apis/houses.service';
import { getDemoCheckoutURL } from '../../services/apis/payments.service';
// import { formatCustomCurrency } from '../../utils/number-seperator';
import HouseUtility from './components/HouseUtility/HouseUtility';
import axios from 'axios';
import FeedBackCustomer from '../../components/FeedBackCustomer/FeedBackCustomer';
import HouseAmenities from './components/HouseAmenities/HouseAmenities';
import useSWR from 'swr';
import Selection from '../../components/Selection/Selection';
import DatePickerAnt from '../../components/DatePickerComponent/DatePickerAnt';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import CarouselHeader from '../../components/CarouselHeader/CarouselHeader';

const DetailHouse = () => {
  const { t } = useTranslation();
  const { house_id: house_id } = useParams();
  const [houseAmenities, setHouseAmenities] = useState([]);
  const [houseUtilities, setHouseUtilities] = useState([]);
  const [imgHouse, setImgHouse] = useState([]);
  const [comment, setComment] = useState([]);
  const [isClickedWishlist, setIsClickedWishlist] = useState(false);

  const handleClick = () => {
    setIsClickedWishlist(!isClickedWishlist);
  };

  const { data: house } = useSWR(
    `getHouseById/${house_id}`,
    async () => await getHouseById({ house_id }),
  );

  const { data: reviews } = useSWR(
    ['getHouseReview', house_id],
    async () => await axios.get(`https://dev.lotus.ttq186.dev/houses/${house_id}/reviews`),
  );
  const lastFourCharacters = house?.id.slice(-6).toUpperCase();
  console.log(reviews);
  console.log(house);
  useEffect(() => {
    const fetchHouseAmenities = async () => {
      try {
        if (house) {
          setHouseAmenities(house.amenities);
          setHouseUtilities(house.utilities);
          setImgHouse(house?.image_urls);
          setComment(reviews?.data.reviews);
        }
      } catch (error) {
        console.error('Error fetching house amenities:', error);
      }
    };

    fetchHouseAmenities();
  }, [house]);

  const handlePayments = async () => {
    const url = await getDemoCheckoutURL(house_id);
    window.location.href = url;
  };

  return (
    <Layout>
      <header>
        {' '}
        <CarouselHeader img={imgHouse} />
      </header>
      <div id="dh-container">
        <Row className="main-container">
          <Col style={{ marginRight: 30 }} className="main" xs={24} lg={16}>
            <Row>
              <Headline classNames="main-title" size={450} strong>
                {house?.name}
              </Headline>
            </Row>
            <Row className="main-frame-info">
              <Caption style={{ color: 'black' }} classNames="caption-hr" size={140}>
                {house?.category}
              </Caption>
              <Caption style={{ color: 'black' }} classNames="caption-hr" size={140}>
                {t('detail-house.property-id')}: {lastFourCharacters}
              </Caption>
              <Caption style={{ color: 'black' }} classNames="caption-hr" size={140}>
                <EyeOutlined /> 1839
              </Caption>
              <Caption
                style={{ color: 'black' }}
                classNames="caption-hr"
                size={140}
                className="main-frame-info-ratting">
                <StarFilled />
                &nbsp;{reviews?.data?.average_rating}/5
              </Caption>
              <Caption style={{ color: 'black' }} size={140}>
                {house?.size_in_m2}m²
              </Caption>
            </Row>
            <Row className="main-frame-description">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.description-title')}
              </SubHeading>
              {/* dynamic */}
              <Paragraph>{house?.description}</Paragraph>
            </Row>
            <Row className="main-property-features">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.property-feature-title')}
              </SubHeading>
              <Paragraph>{t('detail-house.property-feature-des')}</Paragraph>
            </Row>
            <Row>
              <SubHeading classNames="main-property-features-title" size={230} strong>
                {t('detail-house.property-detail-title')}
              </SubHeading>
            </Row>
            <Row className="main-property-features-detail">
              <Col
                style={{ marginRight: 40 }}
                className="main-property-features-detail-card"
                xs={24}>
                {houseAmenities && houseAmenities.length > 0 && (
                  <HouseAmenities amenities={houseAmenities} />
                )}
              </Col>
            </Row>
            <Row>
              <SubHeading classNames="main-property-features-title" size={230} strong>
                {t('detail-house.property-utility-title')}
              </SubHeading>
            </Row>
            <Row className="main-property-features-utility">
              <Col
                style={{ marginRight: 40 }}
                className="main-property-features-utility-card"
                xs={24}>
                {houseUtilities && houseUtilities.length > 0 && (
                  <HouseUtility utilities={houseUtilities} />
                )}
              </Col>
            </Row>
            <Row align="middle" className="main-frame-location" gutter={[0, 14]}>
              <Col xs={24} md={14}>
                <SubHeading size={260} classNames="main-title" strong>
                  {t('detail-house.location-title')}
                </SubHeading>
                <Paragraph>{house?.address}</Paragraph>
              </Col>
              <Col style={{ textAlign: 'right' }} xs={24} md={10}>
                {/* change -> component */}
                <Button className="main-frame-location-inner-btn">
                  <b> {t('detail-house.map-btn')}</b>
                </Button>
              </Col>
            </Row>
            {/* <Row className="main-frame-nearby">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.nearby-title')}
              </SubHeading>
              <Paragraph>{t('detail-house.nearby-des')}</Paragraph>
            </Row> */}
            {/* <Row>
              <Col className="main-frame-nearby-info" xs={12}>
                <Row>
                  <Paragraph>School: </Paragraph>&nbsp;
                  <Paragraph strong>0.7km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>University:</Paragraph>&nbsp;<Paragraph strong>1.7km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>Grocery center:</Paragraph>&nbsp;<Paragraph strong>0.7km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>Market:</Paragraph>&nbsp;<Paragraph strong>0.8km</Paragraph>
                </Row>
              </Col>
              <Col className="main-frame-nearby-info" xs={12}>
                <Row>
                  <Paragraph>Hospital, medical:</Paragraph>&nbsp;<Paragraph strong>1km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>Metro station:</Paragraph>&nbsp;<Paragraph strong>0.1km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>Gym, wellness:</Paragraph>&nbsp;<Paragraph strong>0.5km</Paragraph>
                </Row>
                <Row>
                  <Paragraph>River:</Paragraph>&nbsp;<Paragraph strong>2.2km</Paragraph>
                </Row>
              </Col>
            </Row> */}
            <Row className="main-frame-review">
              <SubHeading strong>
                {comment.length} {t('detail-house.comment-dynamic')}
              </SubHeading>
              <Row>
                <FeedBackCustomer comment={comment} />
              </Row>
              <Row>
                <Col className="main-frame-review-form" xs={24}>
                  <SubHeading size={260} strong>
                    {t('detail-house.leave-title')}
                  </SubHeading>
                  <Paragraph>{t('detail-house.leave-des-1')}</Paragraph>
                  <Paragraph>{t('detail-house.leave-des-2')}</Paragraph>
                  <span style={{ marginBottom: 10 }}>
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </span>
                  <ReviewForm />
                </Col>
              </Row>
            </Row>
          </Col>
          <Col className="side" xs={24} lg={7}>
            <div className="side-form">
              <Row className="side-form-price-section">
                <Col xs={10}>
                  <SubHeading size={230} strong>
                    {t('detail-house.price')}:
                  </SubHeading>
                </Col>
                <Col style={{ textAlign: 'right' }} className="price-group" xs={14}>
                  {' '}
                  <SubHeading size={230} strong>
                    {house?.pricing_policies[0].reservation_fee}
                  </SubHeading>
                  <SubHeading size={230}>/{t('detail-house.month')}</SubHeading>
                </Col>
              </Row>
              <Row className="side-form-wishlist-section">
                <Button
                  style={{ backgroundColor: isClickedWishlist ? '#f8a11e' : 'inherit' }}
                  onClick={handleClick}>
                  <StarOutlined /> <b> {t('detail-house.add-to-wishlist')}</b>
                </Button>
              </Row>
              <Row className="side-form-estimated-section">
                <Col xs={24}>
                  <SubHeading size={230} strong>
                    {t('detail-house.estimated')}
                  </SubHeading>
                </Col>
                <Col style={{ paddingLeft: 25 }} xs={12}>
                  <Paragraph> {t('detail-house.rental-period')}:</Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  <Selection />
                </Col>
                <Col style={{ paddingLeft: 25 }} xs={12}>
                  <Paragraph> {t('detail-house.time-to-move-in')}:</Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  <DatePickerAnt />
                </Col>
                <Col xs={24} md={24} lg={24}>
                  <Button className="book-btn" onClick={handlePayments}>
                    <b> {t('detail-house.book-now-btn')}</b>
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="side-related-house">
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <SubHeading size={260} strong>
                    {t('detail-house.related-property')}
                  </SubHeading>
                </Col>
                <Col xs={24}>
                  <Paragraph>
                    Tantas signiferumque eum at, vix an dicant fierent homero dignissim.
                  </Paragraph>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'center' }}>
                <h3>updating..</h3>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default DetailHouse;
