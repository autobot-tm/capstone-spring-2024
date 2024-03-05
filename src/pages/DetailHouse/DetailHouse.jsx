import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import { Headline } from '../../components/Typography/Headline/Headline';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { InfoCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { Caption, SubHeading } from '../../components/Typography';
import { Button, Row, Col, Form, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { getHouseById, getHouseReview } from '../../services/apis/houses.service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlist.slice';
import { HousePropertyUnit, PROMOTION_PACKAGE_MONTHS } from '../../constants/house.constant';
import HouseUtility from './components/HouseUtility/HouseUtility';
import FeedBackCustomer from './components/FeedBackCustomer/FeedBackCustomer';
import HouseAmenities from './components/HouseAmenities/HouseAmenities';
import useSWR from 'swr';
import Selection from './components/Selection/Selection';
import DatePickerAnt from './components/DatePickerComponent/DatePickerAnt';
import ReviewForm from './components/ReviewForm/ReviewForm';
import CarouselHeader from '../../components/CarouselHeader/CarouselHeader';
import SizeImg from '../../assets/images/SizeIcon.svg';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import HousesMap from '../../components/HousesMap/HousesMap';
import { openLoginModal } from '../../store/slices/modalSlice';

const DetailHouse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { house_id: house_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [houseAmenities, setHouseAmenities] = useState([]);
  const [houseUtilities, setHouseUtilities] = useState([]);
  const [imgHouse, setImgHouse] = useState([]);
  const [comment, setComment] = useState([]);
  // const [starDate, setStarDate] = useState(new Date());
  const { access_token } = useSelector(state => state.auth);
  const wishlist = useSelector(state => state.wishlist.houses);
  const isClickedWishlist = useSelector(state => state.wishlist.clickedStatus[house_id] || false);

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
        if (house && reviews) {
          setHouseAmenities(house?.amenities);
          setHouseUtilities(house?.utilities);
          setImgHouse(house?.image_urls);
          setComment(reviews?.reviews);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching house amenities:', error);
      }
    };

    fetchHouseAmenities();
  }, [house, reviews]);

  const handleAddWishlist = () => {
    if (!access_token) {
      return dispatch(openLoginModal());
    }
    const isHouseInWishlist = wishlist.some(item => item.id === house.id);
    if (!isHouseInWishlist) {
      dispatch(addToWishlist({ house }));
    } else {
      dispatch(removeFromWishlist({ id: house.id }));
    }
  };

  function errorDateNotification() {
    return notification.error({
      message: t('detail-house.error'),
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      description: t('detail-house.error-date'),
    });
  }
  const TitleHeadingComponent = () => {
    return (
      <>
        <Row>
          <Headline classNames="main-title" size={450} strong>
            {house?.name}
          </Headline>
        </Row>
        <Row className="main-frame-info">
          <Caption classNames="caption-hr color-black" size={140}>
            {t(`detail-house.${house?.category.replace(/\s/g, '')}`)}
          </Caption>
          <Caption classNames="caption-hr color-black" size={140}>
            <StarFilled className="star-icon" />
            &nbsp;{reviews?.average_rating > 0 ? `${reviews?.average_rating}` : 'No rating'}
          </Caption>
          <Caption classNames="size-caption color-black" size={140}>
            <img src={SizeImg} />
            &nbsp;
            {house?.size_in_m2}
            {HousePropertyUnit.METER_SQUARE}
          </Caption>
        </Row>
      </>
    );
  };

  const DescriptionComponent = () => {
    return (
      <>
        <Row className="main-frame-description">
          <Col xs={24}>
            <SubHeading size={260} classNames="main-title" strong>
              {t('detail-house.description-title')}
            </SubHeading>
          </Col>
          <Col xs={24}>
            <Paragraph>{house?.description.replace(/<br\s*\/?>/gi, '')}</Paragraph>
          </Col>
        </Row>
      </>
    );
  };

  const PropertyFeatureComponent = () => {
    return (
      <>
        <Row className="main-property-features">
          <SubHeading size={260} classNames="main-title" strong>
            {t('detail-house.property-feature-title')}
          </SubHeading>
          <Paragraph>{t('detail-house.property-feature-des')}</Paragraph>
        </Row>

        <Row className="main-property-features-detail">
          {' '}
          <SubHeading classNames="main-property-features-title" size={230} strong>
            {t('detail-house.property-detail-title')}
          </SubHeading>
          <Col className="main-property-features-detail-card" xs={24}>
            {houseAmenities && houseAmenities.length > 0 && (
              <HouseAmenities amenities={houseAmenities} />
            )}
          </Col>
        </Row>

        <Row className="main-property-features-utility">
          <SubHeading classNames="main-property-features-title" size={230} strong>
            {t('detail-house.property-utility-title')}
          </SubHeading>
          <Col className="main-property-features-utility-card" xs={24}>
            {houseUtilities && houseUtilities.length > 0 && (
              <HouseUtility utilities={houseUtilities} />
            )}
          </Col>
        </Row>
      </>
    );
  };

  const LocationComponent = () => {
    return (
      <>
        <Row align="middle" className="main-frame-location" gutter={[0, 24]}>
          <Col xs={24}>
            <SubHeading size={260} classNames="main-title" strong>
              {t('detail-house.location-title')}
            </SubHeading>
          </Col>
          <Col xs={24} className="main-frame-location-inner-btn container-map">
            <HousesMap
              locations={[
                {
                  position: {
                    lat: house.latitude,
                    lng: house.longitude,
                  },
                  id: house.id,
                  name: house.name,
                  price: house.pricing_policies[0].price_per_month,
                  image: house.image_urls[0],
                },
              ]}
            />
          </Col>
          <Col xs={24}>
            <Paragraph>{house?.address}</Paragraph>
          </Col>
        </Row>
      </>
    );
  };
  //continue
  const ReviewFormComponent = () => {
    return (
      <>
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
      </>
    );
  };

  const ReserveFormComponent = () => {
    const [selectedMonths, setSelectedMonths] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [form] = Form.useForm();

    const onFinish = () => {
      if (!access_token) {
        return dispatch(openLoginModal());
      }
      if (!selectedMonths || !selectedDate) {
        errorDateNotification();
        return;
      }
      navigate(`/reservation/${house.id}`, {
        state: { house, selectedDate, selectedMonths, reviews },
      });
    };
    const handleMonthChange = value => {
      setSelectedMonths(value);
    };
    const handleDateChange = dateString => {
      setSelectedDate(dateString);
    };
    const renderPrice = () => {
      const selectedMonthsInt = parseInt(selectedMonths);
      const pricePerMonth = house?.pricing_policies?.find(
        policy => parseInt(policy.total_months) === 1,
      )?.price_per_month;

      if (PROMOTION_PACKAGE_MONTHS.includes(selectedMonthsInt)) {
        const selectedPrice = house?.pricing_policies?.find(
          policy => parseInt(policy.total_months) === selectedMonthsInt,
        )?.price_per_month;
        return (
          <Row>
            <Col xs={24}>
              <SubHeading size={230} style={{ color: '#f8a11e' }} strong>
                {formatCustomCurrency(selectedPrice)}
              </SubHeading>
              <Caption size={140}>/{t('detail-house.month')}</Caption>
            </Col>
            <Col xs={24}>
              <Paragraph size={160}>
                <del>{formatCustomCurrency(pricePerMonth)}</del>
              </Paragraph>
              <Caption size={140}>/{t('detail-house.month')}</Caption>
            </Col>
          </Row>
        );
      } else {
        return (
          <>
            <SubHeading size={230} strong>
              {formatCustomCurrency(pricePerMonth)}
            </SubHeading>
            <Caption size={140}>/{t('detail-house.month')}</Caption>
          </>
        );
      }
    };

    return (
      <>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row className="side-form-price-section">
            <Col xs={6}>
              <SubHeading size={230} strong>
                {t('detail-house.price')}:
              </SubHeading>
            </Col>
            <Col className="price-group" xs={18}>
              {renderPrice()}
            </Col>
          </Row>
          <Row className="side-form-estimated-section" gutter={[4, 4]}>
            <Col xs={16}>
              <SubHeading size={230} strong>
                {t('detail-house.estimated')}
              </SubHeading>
            </Col>
            <Col xs={8} style={{ textAlign: 'right' }}>
              <SubHeading size={230} strong>
                <Tooltip placement="left" title={t('detail-house.hint-price')}>
                  <InfoCircleOutlined />
                </Tooltip>
              </SubHeading>
            </Col>
            <Col xs={13}>
              <Form.Item name="selectedDate" label={t('detail-house.time-to-move-in')} required>
                <DatePickerAnt onDateChange={handleDateChange} />
              </Form.Item>
            </Col>
            <Col xs={11}>
              <Form.Item name="selectedMonths" label={t('detail-house.rental-period')} required>
                <Selection onChange={handleMonthChange} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              {house.status === 'AVAILABLE' ? (
                <BaseButton
                  htmlType="submit"
                  type="primary"
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {t('detail-house.reserve-now-btn')}
                </BaseButton>
              ) : (
                <BaseButton
                  htmlType="submit"
                  type="primary"
                  disabled
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {t(`detail-house.${house.status.replace(/_/g, '')}`)}
                </BaseButton>
              )}
            </Col>
          </Row>
        </Form>
      </>
    );
  };

  const RelatedPropertiesComponent = () => {
    return (
      <>
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
      </>
    );
  };

  const handleBookNowClick = () => {
    const priceSection = document.querySelector('.side-form-estimated-section');
    if (priceSection) {
      priceSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <SpinLoading />
      ) : (
        <>
          <header>
            <CarouselHeader img={imgHouse} />
          </header>
          <main id="dh-container">
            <Row align="stretch">
              <Col className="main" xs={24} lg={14}>
                <BaseButton
                  shape="circle"
                  type="primary"
                  size="large"
                  className="book-now-btn"
                  onClick={handleBookNowClick}>
                  {t('detail-house.book')}
                </BaseButton>

                <TitleHeadingComponent />
                <DescriptionComponent />
                <PropertyFeatureComponent />
                <LocationComponent />
                <Row align="top" className="main-frame-review">
                  <FeedBackCustomer comment={comment} />
                  <ReviewFormComponent />
                </Row>
              </Col>
              <Col className="side" xs={24} lg={8}>
                <Row className="side-form-wishlist-section">
                  <Tooltip placement="right" title={t('detail-house.add-to-wishlist')}>
                    <Button
                      style={{ backgroundColor: isClickedWishlist ? '#f8a11e' : 'inherit' }}
                      onClick={handleAddWishlist}>
                      <StarOutlined />
                    </Button>
                  </Tooltip>
                </Row>
                <Row className="side-form">
                  <Col xs={24}>
                    <ReserveFormComponent />
                  </Col>
                </Row>
                <Row className="side-related-house">
                  <Col xs={24}>
                    <RelatedPropertiesComponent />
                  </Col>
                </Row>
              </Col>
            </Row>
          </main>
        </>
      )}
    </Layout>
  );
};

export default DetailHouse;
