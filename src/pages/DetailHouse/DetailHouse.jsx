import React from 'react';
import { Layout } from '../../hoc/Layout';
import './styles.scss';
import { Headline } from '../../components/Typography/Headline/Headline';
import { Paragraph } from '../../components/Typography/Paragraph/Paragraph';
import { EyeOutlined, StarOutlined } from '@ant-design/icons';
import { StarFilled } from '@ant-design/icons';
import { Caption, SubHeading } from '../../components/Typography';
import PropertyHouseDetail from '../../components/PropertyHouseDetail/PropertyHouseDetail';
import SizeIcon from '../../assets/images/SizeIcon.svg';
import { Button, Row, Col, Avatar } from 'antd';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import CarouselHeader from '../../components/CarouselHeader/CarouselHeader';
import { useTranslation } from 'react-i18next';
import Selection from '../../components/Selection/Selection';
import DatePickerAnt from '../../components/DatePickerComponent/DatePickerAnt';

const DetailHouse = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <header>
        <CarouselHeader />
      </header>
      <div className="container">
        <Row className="main-container">
          <Col style={{ marginRight: 30 }} className="main" xs={24} lg={16}>
            <Row>
              <Headline classNames="main-title" size={450} strong>
                South Sunlight Apartment
              </Headline>
            </Row>
            <Row className="main-frame-info">
              <Caption className="caption" size={140}>
                APARTMENT
              </Caption>
              <Caption className="caption" size={140}>
                PROPERTY ID: 55W886
              </Caption>
              <Caption className="caption" size={140}>
                <EyeOutlined /> 1839
              </Caption>
              <div className="main-frame-info-ratting">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
            </Row>

            <Row className="main-frame-description">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.description-title')}
              </SubHeading>
              {/* dynamic */}
              <Paragraph>
                Lorem ipsum dolor sit amet, wisi nemore fastidii at vis, eos equidem admodum
                disputando ea. An duis dolor appellantur mea, est id zril nobis appellantur. Ei sea
                duis senserit qualisque, te facilisis appellantur pri. Id aperiri aliquam interesset
                mel. Contentiones vituperatoribus id est, per prima nihil scripta no. No semper
                forensibus adipiscing quo. Amet deleniti lobortis et eam. In oporteat pertinacia
                quo, cu qui antiopam intellegebat, ei alii paulo has. In alia eros ornatus pri,
                graeci accusata pericula an vix. His ne homero dignissim, aliquam dolores scriptorem
                vis ut. Sit ad suas adhuc interesset, neu essent iuvaret adipiscing everti.
              </Paragraph>
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
                xs={24}
                md={10}>
                <PropertyHouseDetail icon={SizeIcon} name={'Size'} description={'123m2'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Bedrooms'} description={'4'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Bathrooms'} description={'3'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Floor'} description={'Ground'} />
                <PropertyHouseDetail
                  icon={SizeIcon}
                  name={'Additional space'}
                  description={'Attic'}
                />
              </Col>
              <Col className="main-property-features-detail-card" xs={24} md={10}>
                <PropertyHouseDetail
                  icon={SizeIcon}
                  name={'Furnishing'}
                  description={'Furnished'}
                />
                <PropertyHouseDetail icon={SizeIcon} name={'Ceiling Height'} description={'3m'} />
                <PropertyHouseDetail
                  icon={SizeIcon}
                  name={'Construction Year'}
                  description={'2007'}
                />
                <PropertyHouseDetail icon={SizeIcon} name={'Renovation'} description={'2017'} />
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
                xs={24}
                md={10}>
                <PropertyHouseDetail icon={SizeIcon} name={'Heating'} description={'Natural gas'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Air Condition'} description={'Yes'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Fireplace'} description={'-'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Elevator'} description={'-'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Ventilation'} description={'Yes'} />
              </Col>
              <Col className="main-property-features-utility-card" xs={24} md={10}>
                <PropertyHouseDetail icon={SizeIcon} name={'Intercom'} description={'Yes'} />
                <PropertyHouseDetail
                  icon={SizeIcon}
                  name={'Window Type'}
                  description={'Aluminum frame'}
                />
                <PropertyHouseDetail icon={SizeIcon} name={'Cable TV'} description={'Yes'} />
                <PropertyHouseDetail icon={SizeIcon} name={'Wifi'} description={'Yes'} />
              </Col>
            </Row>

            <Row align="middle" className="main-frame-location" gutter={[0, 14]}>
              <Col xs={24} md={14}>
                <SubHeading size={260} classNames="main-title" strong>
                  {t('detail-house.location-title')}
                </SubHeading>
                {/* dynamic */}
                <Paragraph>26, Thi Sach street, Ben Nghe ward, 1 district, HCM City</Paragraph>
              </Col>

              <Col style={{ textAlign: 'right' }} xs={24} md={10}>
                {/* change -> component */}
                <Button className="main-frame-location-inner-btn">
                  <b> {t('detail-house.map-btn')}</b>
                </Button>
              </Col>
            </Row>

            <Row className="main-frame-nearby">
              <SubHeading size={260} classNames="main-title" strong>
                {t('detail-house.nearby-title')}
              </SubHeading>
              <Paragraph>{t('detail-house.nearby-des')}</Paragraph>
            </Row>
            <Row>
              <Col className="main-frame-nearby-info" xs={12}>
                <Row>
                  <Paragraph>School: </Paragraph>&nbsp;<Paragraph strong>0.7km</Paragraph>
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
            </Row>
            <Row className="main-frame-review">
              {/* dynamic */}
              <SubHeading strong>1 {t('detail-house.comment-dynamic')}</SubHeading>

              <Row style={{ paddingTop: 20 }} align="middle">
                <Col xs={6} md={4}>
                  <Avatar
                    src="https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/agent3-profile-img-new-409x409.jpg"
                    shape="square"
                    size={100}
                  />
                </Col>
                <Col xs={18} md={20}>
                  <SubHeading classNames="main-title" strong>
                    Anne Reid
                  </SubHeading>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, id duo epicuri vulputate. Ex eum eius ludus has cu
                    nobis insolens omittantur. Ex nostrum repudiare abhorreant cum velit.
                  </Paragraph>
                </Col>
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
                <Col xs={12}>
                  <SubHeading size={230} strong>
                    Price:
                  </SubHeading>
                </Col>
                {/* dynamic */}
                <Col style={{ textAlign: 'right' }} className="price-group" xs={12}>
                  {' '}
                  <SubHeading size={230} strong>
                    500$
                  </SubHeading>
                  <SubHeading size={230}>/month</SubHeading>
                </Col>
              </Row>
              <Row className="side-form-wishlist-section">
                <Button className="btn">
                  <StarOutlined /> <b>Add to wishlist</b>
                </Button>
              </Row>
              <Row className="side-form-estimated-section">
                {/* <Row className="side-form-estimated-section-inner"> */}
                <Col xs={24}>
                  <SubHeading size={230} strong>
                    Estimated
                  </SubHeading>
                </Col>

                <Col style={{ paddingLeft: 25 }} xs={12}>
                  <Paragraph>rental period:</Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  <Selection />
                </Col>

                <Col style={{ paddingLeft: 25 }} xs={12}>
                  <Paragraph>time to move in:</Paragraph>
                </Col>
                <Col xs={12} style={{ textAlign: 'right' }}>
                  <DatePickerAnt />
                </Col>
                <Col xs={24} md={24} lg={24}>
                  <Button className="book-btn">
                    <b>Book Now</b>
                  </Button>
                </Col>
                {/* </Row> */}
              </Row>
            </div>
            <div className="side-related-house">
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <SubHeading size={260} strong>
                    Related properties
                  </SubHeading>
                </Col>
                <Col xs={24}>
                  <Paragraph>
                    Tantas signiferumque eum at, vix an dicant fierent homero dignissim.
                  </Paragraph>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'center' }}>wait fill components</Row>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default DetailHouse;
