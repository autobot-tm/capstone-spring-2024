import './styles.scss';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../hoc/Layout';
import { Headline } from '../../components/Typography/Headline/Headline';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { HeartTwoTone, InfoCircleOutlined, StarFilled } from '@ant-design/icons';
import { Caption, SubHeading } from '../../components/Typography';
import { Button, Row, Col, Form, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { getHouseById, getHouseReview, updateWishlist } from '../../services/apis/houses.service';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { HousePropertyUnit, PROMOTION_PACKAGE_MONTHS } from '../../constants/house.constant';
import HouseUtility from './components/HouseUtility/HouseUtility';
import FeedBackCustomer from './components/FeedBackCustomer/FeedBackCustomer';
import HouseAmenities from './components/HouseAmenities/HouseAmenities';
import useSWR from 'swr';
import Selection from './components/Selection/Selection';
import DatePickerAnt from './components/DatePickerComponent/DatePickerAnt';
import SizeImg from '../../assets/images/SizeIcon.svg';
import BaseButton from '../../components/Buttons/BaseButtons/BaseButton';
import SpinLoading from '../../components/SpinLoading/SpinLoading';
import HousesMap from '../../components/HousesMap/HousesMap';
import { openLoginModal } from '../../store/slices/modalSlice';
import { Helmet } from 'react-helmet';
import ImageLayout from './components/ImageLayout/ImageLayout';
import { addToWishlist, removeFromWishlist } from '../../store/slices/houseSlice';

const DetailHouse = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { house_id: house_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [houseAmenities, setHouseAmenities] = useState([]);
  const [houseUtilities, setHouseUtilities] = useState([]);
  const [imgHouse, setImgHouse] = useState([]);
  const [comment, setComment] = useState([]);
  const { access_token } = useSelector(state => state.auth);
  const [isWishList, setIsWishList] = useState(false);
  const ids = useSelector(state => state.house.ids);
  const {
    data: house,
    error: houseError,
    isLoading: houseLoading,
  } = useSWR(`getHouseById/${house_id}`, async () => await getHouseById({ house_id }));
  const {
    data: reviews,
    error: reviewError,
    isLoading: reviewLoading,
  } = useSWR(['getHouseReview', house_id], async () => await getHouseReview({ house_id }));
  useEffect(() => {
    if (access_token) {
      setIsWishList(ids.includes(house_id));
    } else {
      setIsWishList(false);
    }
  }, [ids, house_id]);
  const handleAddWishlist = async () => {
    await updateWishlist({
      added_house_ids: [house_id],
      removed_house_ids: [],
    });
    dispatch(addToWishlist(house_id));
  };
  const handleRemoveWishlist = async () => {
    await updateWishlist({
      added_house_ids: [],
      removed_house_ids: [house_id],
    });
    dispatch(removeFromWishlist(house_id));
  };
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
  function errorDateNotification() {
    return notification.error({
      message: t('detail-house.error'),
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
      description: t('detail-house.error-date'),
    });
  }
  if (houseError || reviewError) {
    return <p>Error loading data. Please try again later.</p>;
  }
  if (houseLoading || reviewLoading) {
    return <SpinLoading />;
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
            <Paragraph>
              {i18n.language === 'english' || !house?.description_in_jp?.replace(/<br\s*\/?>/gi, '')
                ? house?.description?.replace(/<br\s*\/?>/gi, '')
                : house?.description_in_jp?.replace(/<br\s*\/?>/gi, '')}
            </Paragraph>
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
          <SubHeading classNames="main-property-features-title" size={230} strong>
            {t('detail-house.property-detail-title')}
          </SubHeading>
          <Col className="main-property-features-detail-card" xs={24}>
            {houseAmenities && houseAmenities?.length > 0 && <HouseAmenities amenities={houseAmenities} />}
          </Col>
        </Row>

        <Row className="main-property-features-utility">
          <SubHeading classNames="main-property-features-title" size={230} strong>
            {t('detail-house.property-utility-title')}
          </SubHeading>
          <Col className="main-property-features-utility-card" xs={24}>
            {houseUtilities && houseUtilities?.length > 0 && <HouseUtility utilities={houseUtilities} />}
          </Col>
        </Row>
      </>
    );
  };
  const LocationComponent = () => {
    return (
      <>
        <Row align="middle" className="main-frame-location" gutter={[0, 12]}>
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
                    lat: house?.latitude,
                    lng: house?.longitude,
                  },
                  id: house.id,
                  name: house?.name,
                  price: house?.pricing_policies?.[0]?.price_per_month,
                  image: house?.image_urls?.[0],
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
  // const ReviewFormComponent = () => {
  //   return (
  //     <>
  //       <Col className="main-frame-review-form" xs={24}>
  //         <SubHeading size={260} strong>
  //           {t('detail-house.leave-title')}
  //         </SubHeading>
  //         <Paragraph>{t('detail-house.leave-des-1')}</Paragraph>
  //         <Paragraph>{t('detail-house.leave-des-2')}</Paragraph>
  //         <ReviewForm house_id={house.id} />
  //       </Col>
  //     </>
  //   );
  // };
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
      navigate(`/reservation/${house?.id}`, {
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
        policy => parseInt(policy?.total_months) === 1,
      )?.price_per_month;

      if (PROMOTION_PACKAGE_MONTHS.includes(selectedMonthsInt)) {
        const selectedPrice = house?.pricing_policies?.find(
          policy => parseInt(policy?.total_months) === selectedMonthsInt,
        )?.price_per_month;
        return (
          <Row>
            <Col xs={24}>
              <SubHeading size={260} style={{ color: '#f8a11e' }} strong>
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
            <SubHeading size={260} classNames="number-price" strong>
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
                {t('detail-house.price')}
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
              {house?.status === 'AVAILABLE' ? (
                <BaseButton htmlType="submit" type="primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('detail-house.reserve-now-btn')}
                </BaseButton>
              ) : (
                <BaseButton
                  htmlType="submit"
                  type="primary"
                  disabled
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {t(`detail-house.reserved`)}
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
          <h3>(coming soon)</h3>
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
          <Helmet>
            <title>{house?.name}</title>
          </Helmet>
          <main>
            <div id="dh-container">
              <ImageLayout images={imgHouse} />
              <Row gutter={[36, 24]}>
                <Col className="main" xs={24} xl={16}>
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
                    {/* <ReviewFormComponent /> */}
                  </Row>
                </Col>
                <Col className="side" xs={24} xl={8}>
                  <Row className="side-form-wishlist-section">
                    {isWishList ? (
                      <Button
                        type="text"
                        size="large"
                        icon={<HeartTwoTone twoToneColor={['#ffffff', '#ff395c']} style={{ fontSize: '25px' }} />}
                        onClick={() => handleRemoveWishlist()}>
                        {t('detail-house.added-to-wishlist')}
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        size="large"
                        icon={<HeartTwoTone twoToneColor={['#000000', '#ffffff']} style={{ fontSize: '25px' }} />}
                        onClick={() => {
                          if (access_token) {
                            handleAddWishlist();
                          } else {
                            dispatch(openLoginModal());
                          }
                        }}>
                        {' '}
                        {t('detail-house.add-to-wishlist')}
                      </Button>
                    )}
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
            </div>
          </main>
        </>
      )}
    </Layout>
  );
};

export default DetailHouse;
