import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import { Headline } from '../../components/Typography/Headline/Headline';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { StarOutlined } from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';
import { Caption, SubHeading } from '../../components/Typography';
import { Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { getHouseById, getHouseReview } from '../../services/apis/houses.service';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCustomCurrency } from '../../utils/number-seperator';
import HouseUtility from './components/HouseUtility/HouseUtility';
import FeedBackCustomer from './components/FeedBackCustomer/FeedBackCustomer';
import HouseAmenities from './components/HouseAmenities/HouseAmenities';
import useSWR from 'swr';
import Selection from '../../components/Selection/Selection';
import DatePickerAnt from '../../components/DatePickerComponent/DatePickerAnt';
import ReviewForm from './components/ReviewForm/ReviewForm';
import CarouselHeader from '../../components/CarouselHeader/CarouselHeader';
import SizeImg from '../../assets/images/SizeIcon.svg';

const DetailHouse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { house_id: house_id } = useParams();
  const [houseAmenities, setHouseAmenities] = useState([]);
  const [houseUtilities, setHouseUtilities] = useState([]);
  const [imgHouse, setImgHouse] = useState([]);
  const [comment, setComment] = useState([]);
  const [isClickedWishlist, setIsClickedWishlist] = useState(false);
  const { access_token } = useSelector(state => state.auth);

  const { data: house } = useSWR(
    `getHouseById/${house_id}`,
    async () => await getHouseById({ house_id }),
  );

  const { data: reviews } = useSWR(
    ['getHouseReview', house_id],
    async () => await getHouseReview({ house_id }),
  );

  useEffect(() => {
    const fetchHouseAmenities = async () => {
      try {
        if (house) {
          setHouseAmenities(house?.amenities);
          setHouseUtilities(house?.utilities);
          setImgHouse(house?.image_urls);
          setComment(reviews?.reviews);
        }
      } catch (error) {
        console.error('Error fetching house amenities:', error);
      }
    };

    fetchHouseAmenities();
  }, [house, reviews]);

  const handlePayments = async () => {
    navigate('/reservation', house);
    //continue
  };

  const handleAddWishlist = () => {
    if (access_token) {
      setIsClickedWishlist(!isClickedWishlist);
      //continue
    } else {
      message.error('Please sign in to add house to wishlist.');
    }
  };

  return (
    <Layout>
      <header>
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
              <Caption
                style={{ color: 'black' }}
                classNames="caption-hr"
                size={140}
                className="main-frame-info-ratting">
                <StarFilled />
                &nbsp;{reviews?.average_rating}/5
              </Caption>
              <Caption classNames="size-caption" size={140}>
                <img src={SizeImg} />
                &nbsp;
                {house?.size_in_m2}m²
              </Caption>
            </Row>
            <Row className="main-frame-description">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.description-title')}
              </SubHeading>
              <Paragraph>{house?.description.replace(/<br\s*\/?>/gi, '')}</Paragraph>
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
            <Row className="main-frame-review">
              {comment?.length > 0 && (
                <SubHeading strong>
                  {comment?.length} {t('detail-house.comment-dynamic')}
                </SubHeading>
              )}
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
          <Col className="side" xs={16} lg={7}>
            <div className="side-form">
              <Row className="side-form-price-section">
                <Col xs={6}>
                  <SubHeading size={230} strong>
                    {t('detail-house.price')}:
                  </SubHeading>
                </Col>
                <Col style={{ textAlign: 'right' }} className="price-group" xs={18}>
                  <SubHeading size={230} strong>
                    {house && formatCustomCurrency(house?.pricing_policies[0]?.price_per_month)}
                  </SubHeading>
                  <SubHeading size={230}>/{t('detail-house.month')}</SubHeading>
                </Col>
              </Row>
              <Row className="side-form-wishlist-section">
                <Button
                  style={{ backgroundColor: isClickedWishlist ? '#f8a11e' : 'inherit' }}
                  onClick={handleAddWishlist}>
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
                  {house?.status !== 'AVAILABLE' && (
                    <Button className="book-btn" disabled>
                      <b>{t('detail-house.reserved-btn')}</b>
                    </Button>
                  )}
                  {house?.status === 'AVAILABLE' && (
                    <Button className="book-btn" onClick={handlePayments}>
                      <b>{t('detail-house.reserve-now-btn')}</b>
                    </Button>
                  )}
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
                  <Paragraph>{t('detail-house.related-property-des')}</Paragraph>
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
