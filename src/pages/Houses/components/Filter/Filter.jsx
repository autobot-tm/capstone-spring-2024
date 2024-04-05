import { Button, Checkbox, Col, Form, Input, InputNumber, Popover, Row, Select, Slider, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Caption } from '../../../../components/Typography';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setInitialState, setPage } from '../../../../store/slices/houseSlice';
import { useTranslation } from 'react-i18next';
import locationIcon from '../../../../assets/images/location.png';
import sizeIcon from '../../../../assets/images/size.png';
import priceIcon from '../../../../assets/images/price.png';
import amenityIcon from '../../../../assets/images/tv.png';
import utilityIcon from '../../../../assets/images/water.png';

const Filter = () => {
  const nameValue = useSelector(state => state.house.name);
  const categoriesValue = useSelector(state => state.house.categories);
  const provincesValue = useSelector(state => state.house.provinces);
  const districtsValue = useSelector(state => state.house.districts);
  const wardsValue = useSelector(state => state.house.wards);
  const minAreaValue = useSelector(state => state.house.minArea);
  const maxAreaValue = useSelector(state => state.house.maxArea);
  const minPriceValue = useSelector(state => state.house.minPrice);
  const maxPriceValue = useSelector(state => state.house.maxPrice);
  const amenitiesValue = useSelector(state => state.house.amenities);
  const utilitiesValue = useSelector(state => state.house.utilities);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [sliderValue, setSliderValue] = useState([minPriceValue, maxPriceValue]);

  const [provinceId, setProvinceId] = useState(provincesValue);
  const [districtId, setDistrictId] = useState(districtsValue);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const metadata = useSelector(state => state.house.metadata);

  useEffect(() => {
    if (metadata) {
      setCategories(metadata.categories);
      setProvinces(metadata.location.provinces);
      setDistricts(metadata.location.districts);
      setWards(metadata.location.wards);
      setMinPrice(metadata.min_price);
      setMaxPrice(metadata.max_price);
      setAmenities(metadata.amenities);
      setUtilities(metadata.utilities);
      !minPriceValue && setSliderValue([metadata.min_price, metadata.max_price]);
    }
  }, [metadata]);

  const handleChangeProvince = value => {
    setProvinceId(value);
  };

  const handleChangeDistrict = value => {
    setDistrictId(value);
    form.resetFields(['wards']);
    form.setFieldsValue({
      wards: undefined,
    });
  };
  const handleSliderChange = newValue => {
    setSliderValue(newValue);
  };
  const handleReset = () => {
    dispatch(setInitialState());
    form.setFieldsValue({
      name: undefined,
      categories: undefined,
      provinces: undefined,
      districts: undefined,
      wards: undefined,
      minArea: undefined,
      maxArea: undefined,
      amenities: undefined,
      utilities: undefined,
    });
    setProvinceId(0);
    setDistrictId(0);
    setSliderValue([minPrice, maxPrice]);
    dispatch(setPage({ page: 1 }));
  };
  const handleFinish = values => {
    setLoading(true);
    const { name, categories, provinces, districts, wards, minArea, maxArea, amenities, utilities } = values;
    const minPrice = sliderValue[0];
    const maxPrice = sliderValue[1];
    dispatch(
      setFilter({
        name,
        categories,
        provinces,
        districts,
        wards,
        minArea,
        maxArea,
        minPrice,
        maxPrice,
        amenities: amenities?.map(str => ({ id: str })),
        utilities: utilities?.map(str => ({ id: str })),
      }),
    );
    dispatch(setPage({ page: 1 }));
    setLoading(false);
  };

  const locationContent = (
    <div className={styles.locationContainer}>
      <Form.Item>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Form.Item name="provinces" style={{ margin: 0 }} initialValue={provincesValue}>
              <Select
                placeholder={t('placeholder.provinces')}
                style={{ width: '100%' }}
                onChange={handleChangeProvince}
                options={provinces.map(province => {
                  return {
                    value: province.id,
                    label: t('province.' + province.name),
                  };
                })}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="districts" style={{ margin: 0 }} initialValue={districtsValue}>
              <Select
                placeholder={t('placeholder.districts')}
                style={{ width: '100%' }}
                onChange={handleChangeDistrict}
                options={districts
                  .filter(district => district.province_id === provinceId)
                  .map(district => ({
                    value: district.id,
                    label: t('district.' + district.name),
                  }))}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="wards" style={{ margin: 0 }} initialValue={wardsValue}>
              <Select
                placeholder={t('placeholder.wards')}
                style={{ width: '100%' }}
                options={wards
                  .filter(ward => ward.district_id === districtId)
                  .map(ward => ({
                    value: ward.id,
                    label: ward.name,
                  }))}
                disabled={loading}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </div>
  );

  const propertySizeContent = (
    <div>
      <Form.Item>
        <Row gutter={8}>
          <Col lg={12} xs={12}>
            <Form.Item
              initialValue={minAreaValue}
              style={{ margin: 0 }}
              name="minArea"
              dependencies={['maxArea']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const maxArea = getFieldValue('maxArea');
                    if (maxArea && value && value >= maxArea) {
                      return Promise.reject(t('validationRules.size'));
                    }
                    return Promise.resolve();
                  },
                }),
                {
                  type: 'number',
                  min: 1,
                  message: t('validationRules.min'),
                },
              ]}>
              <InputNumber placeholder={t('placeholder.minimumSize')} style={{ width: '100%' }} disabled={loading} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={12}>
            <Form.Item
              name="maxArea"
              style={{ margin: 0 }}
              initialValue={maxAreaValue}
              rules={[
                {
                  type: 'number',
                  min: 1,
                  message: t('validationRules.min'),
                },
              ]}>
              <InputNumber placeholder={t('placeholder.maximumSize')} style={{ width: '100%' }} disabled={loading} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </div>
  );

  const priceRangeContent = (
    <div>
      <Form.Item style={{ margin: 0 }}>
        <Space>
          <Caption size={110}>
            From <b>{formatCustomCurrency(sliderValue[0])}</b> to
            <b> {formatCustomCurrency(sliderValue[1])}</b>
          </Caption>
        </Space>
        <Slider
          min={minPrice}
          max={maxPrice}
          range
          step={100000}
          draggableTrack
          value={sliderValue}
          onChange={handleSliderChange}
          disabled={loading}
        />
      </Form.Item>
    </div>
  );

  const amenityContent = (
    <div>
      <Form.Item name="amenities">
        <Checkbox.Group>
          <Row>
            {amenities.map(amenity => {
              return (
                <Col sm={8} xs={12} key={amenity.id}>
                  <Checkbox value={amenity.id} disabled={loading}>
                    {t('amenity.' + amenity.name)}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );

  const utilityContent = (
    <div>
      <Form.Item name="utilities">
        <Checkbox.Group>
          <Row>
            {utilities.map(utility => {
              return (
                <Col sm={8} xs={12} key={utility.id}>
                  <Checkbox value={utility.id} disabled={loading}>
                    {t('utility.' + utility.name)}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
  return (
    <div className={styles.filterContainer}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          amenities: amenitiesValue?.map(obj => obj.id),
          utilities: utilitiesValue?.map(obj => obj.id),
        }}>
        <Row gutter={[4, 4]}>
          <Col xl={4} sm={12} xs={24}>
            <Form.Item name="name" style={{ margin: 0 }} initialValue={nameValue}>
              <Input
                size="large"
                placeholder={t('placeholder.searchHouse')}
                disabled={loading}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xl={5} sm={12} xs={24}>
            <Form.Item name="categories" style={{ margin: 0 }} initialValue={categoriesValue}>
              <Select
                size="large"
                maxTagCount={1}
                mode="multiple"
                allowClear
                placeholder={
                  <Caption size={140} strong>
                    {t('placeholder.categories')}
                  </Caption>
                }
                style={{ width: '100%' }}
                options={categories.map(category => {
                  return { value: category, label: t('category.' + category) };
                })}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col xl={3} lg={4} sm={8} xs={24}>
            <Popover content={locationContent} title={t('label.location')} trigger="click">
              <Button
                className={styles.button}
                size="large"
                icon={
                  <div className={styles.imageContainer}>
                    <img src={locationIcon} />
                  </div>
                }>
                <Caption strong size={140}>
                  {t('label.location')}
                </Caption>
              </Button>
            </Popover>
          </Col>
          <Col xl={3} lg={4} sm={8} xs={12}>
            <Popover content={propertySizeContent} title={t('label.propertySize')} trigger="click">
              <Button
                className={styles.button}
                size="large"
                icon={
                  <div className={styles.imageContainer}>
                    <img src={sizeIcon} />
                  </div>
                }>
                <Caption size={140} strong>
                  {t('label.propertySize')}
                </Caption>
              </Button>
            </Popover>
          </Col>
          <Col xl={2} lg={4} sm={8} xs={12}>
            <Popover content={priceRangeContent} title={t('label.priceRange')} trigger="click">
              <Button
                className={styles.button}
                size="large"
                icon={
                  <div className={styles.imageContainer}>
                    <img src={priceIcon} />
                  </div>
                }>
                <Caption size={140} strong>
                  {t('label.priceRange')}
                </Caption>
              </Button>
            </Popover>
          </Col>
          <Col xl={3} lg={4} sm={8} xs={12}>
            <Popover content={amenityContent} title={t('label.amenities')} trigger="click">
              <Button
                className={styles.button}
                size="large"
                icon={
                  <div className={styles.imageContainer}>
                    <img src={amenityIcon} />
                  </div>
                }>
                <Caption size={140} strong>
                  {t('label.amenities')}
                </Caption>
              </Button>
            </Popover>
          </Col>
          <Col xl={2} lg={4} sm={8} xs={12}>
            <Popover content={utilityContent} title={t('label.Utilities')} trigger="click">
              <Button
                className={styles.button}
                size="large"
                icon={
                  <div className={styles.imageContainer}>
                    <img src={utilityIcon} />
                  </div>
                }>
                <Caption size={140} strong>
                  {t('label.Utilities')}
                </Caption>
              </Button>
            </Popover>
          </Col>
          <Col xl={1} lg={2} md={4} xs={3}>
            <BaseButton
              style={{ width: '100%' }}
              size="large"
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}></BaseButton>
          </Col>
          <Col xl={1} lg={2} md={4} xs={3}>
            <BaseButton
              style={{ width: '100%' }}
              size="large"
              type="primary"
              icon={<UndoOutlined />}
              loading={loading}
              disabled={loading}
              onClick={handleReset}></BaseButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filter;
