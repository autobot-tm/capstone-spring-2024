import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Slider, Space } from 'antd';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
import { getMetaData } from '../../../../services/apis/houses.service';
import { Caption } from '../../../../components/Typography';
import { formatCustomCurrency } from '../../../../utils/number-seperator';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setInitialState } from '../../../../store/slices/houseSlice';

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
  // const amenitiesValue = useSelector(state => state.house.amenities);
  // const utilitiesValue = useSelector(state => state.house.utilities);

  const [isShow, setIsShow] = useState(false);
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
  const dispatch = useDispatch();

  useEffect(() => {
    getMetaData().then(response => {
      setCategories(response.categories);
      setProvinces(response.location.provinces);
      setDistricts(response.location.districts);
      setWards(response.location.wards);
      setMinPrice(response.min_price);
      setMaxPrice(response.max_price);
      setAmenities(response.amenities);
      setUtilities(response.utilities);
      !minPriceValue && setSliderValue([response.min_price, response.max_price]);
    });
  }, []);

  const handleChangeProvince = value => {
    setProvinceId(value);
  };

  const handleChangeDistrict = value => {
    setDistrictId(value);
    form.resetFields(['wards']);
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
  };
  const handleFinish = values => {
    setLoading(true);
    const {
      name,
      categories,
      provinces,
      districts,
      wards,
      minArea,
      maxArea,
      amenities,
      utilities,
    } = values;
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
        amenities,
        utilities,
      }),
    );
    setLoading(false);
  };
  return (
    <div className={styles.filterContainer}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={[10, 4]}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label={t('label.searchHouse')}
              name="name"
              style={{ margin: 0 }}
              initialValue={nameValue}>
              <Input placeholder={t('placeholder.searchHouse')} disabled={loading} />
            </Form.Item>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label={t('label.propertyDetails')}
              name="categories"
              style={{ margin: 0 }}
              initialValue={categoriesValue}>
              <Select
                maxTagCount={1}
                mode="multiple"
                allowClear
                placeholder={t('placeholder.categories')}
                style={{ width: '100%' }}
                options={categories.map(category => {
                  return { value: category, label: t('category.' + category) };
                })}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <Form.Item label={t('label.location')}>
              <Row>
                <Col lg={8} sm={8} xs={24}>
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
                <Col lg={8} sm={8} xs={24}>
                  <Form.Item name="districts" style={{ margin: 0 }} initialValue={districtsValue}>
                    <Select
                      placeholder={t('placeholder.districts')}
                      style={{ width: '100%' }}
                      onChange={handleChangeDistrict}
                      options={districts
                        .filter(district => district.province.id === provinceId)
                        .map(district => ({
                          value: district.id,
                          label: t('district.' + district.name),
                        }))}
                      disabled={loading}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={8} xs={24}>
                  <Form.Item name="wards" style={{ margin: 0 }} initialValue={wardsValue}>
                    <Select
                      placeholder={t('placeholder.wards')}
                      style={{ width: '100%' }}
                      options={wards
                        .filter(ward => ward.district.id === districtId)
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
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item label={t('label.propertySize')}>
              <Row>
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
                    ]}>
                    <InputNumber
                      placeholder={t('placeholder.minimumSize')}
                      style={{ width: '100%' }}
                      disabled={loading}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} xs={12}>
                  <Form.Item name="maxArea" style={{ margin: 0 }} initialValue={maxAreaValue}>
                    <InputNumber
                      placeholder={t('placeholder.maximumSize')}
                      style={{ width: '100%' }}
                      disabled={loading}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} xs={24}>
            <Form.Item label={t('label.priceRange')} style={{ margin: 0 }}>
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
          </Col>
          <Col lg={13} xs={0}></Col>
          <Col lg={2} md={4} xs={5}>
            <BaseButton
              type="primary"
              icon={isShow ? <CaretUpOutlined /> : <CaretDownOutlined />}
              onClick={() => setIsShow(!isShow)}
              loading={loading}
              disabled={loading}
            />
          </Col>
          <Col lg={5} md={4} xs={11}>
            <BaseButton
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              {t('button.search')}
            </BaseButton>
          </Col>
          <Col lg={4} md={4} xs={8}>
            <BaseButton type="text" loading={loading} disabled={loading} onClick={handleReset}>
              {t('button.reset')}
            </BaseButton>
          </Col>
          {isShow && (
            <>
              <Col lg={24}>
                <Form.Item label={t('label.amenities')} name="amenities">
                  <Checkbox.Group>
                    <Row>
                      {amenities.map(amenity => {
                        return (
                          <Col sm={8} xs={12} key={amenity.id}>
                            <Checkbox value={{ id: amenity.id }} disabled={loading}>
                              {t('amenity.' + amenity.name)}
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col lg={24}>
                <Form.Item label={t('label.Utilities')} name="utilities">
                  <Checkbox.Group>
                    <Row>
                      {utilities.map(utility => {
                        return (
                          <Col sm={8} xs={12} key={utility.id}>
                            <Checkbox value={{ id: utility.id }} disabled={loading}>
                              {t('utility.' + utility.name)}
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        <Row></Row>
      </Form>
    </div>
  );
};

export default Filter;
