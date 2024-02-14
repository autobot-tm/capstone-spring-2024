import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useSelector } from 'react-redux';
import { closeAdvanceSearchModal } from '../../store/slices/modalSlice';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Space,
} from 'antd';
import { Caption } from '../Typography';
import { filterHousesService, getMetaData } from '../../services/apis/houses.service';
import { formatCustomCurrency } from '../../utils/number-seperator';
import styles from './AdvanceSearch.module.scss';
import { t } from 'i18next';
const AdvanceSearch = () => {
  const advanceSearchModal = useSelector(state => state.modal.advanceSearchModal);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [form] = Form.useForm();

  const LIMIT = 200;

  const handleSliderChange = newValue => {
    setSliderValue(newValue);
  };

  const handleChangeProvince = value => {
    setProvinceId(value);
  };

  const handleChangeDistrict = value => {
    setDistrictId(value);
  };

  const handleReset = () => {
    form.resetFields();
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

    filterHousesService({
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
      LIMIT,
    }).then(response => {
      console.log(response.houses);
      setLoading(false);
    });
  };

  useEffect(() => {
    getMetaData().then(response => {
      setCategories(response.categories);
      setProvinces(response.location.provinces);
      setDistricts(response.location.districts);
      setWards(response.location.wards);
      setSliderValue([response.min_price, response.max_price]);
      setMinPrice(response.min_price);
      setMaxPrice(response.max_price);
      setAmenities(response.amenities);
      setUtilities(response.utilities);
    });
  }, []);

  useEffect(() => {
    if (!advanceSearchModal) {
      form.resetFields();
      setProvinceId(0);
      setDistrictId(0);
      setSliderValue([minPrice, maxPrice]);
    }
  }, [form, advanceSearchModal]);
  return (
    <div>
      <CustomModal
        width={600}
        nameOfModal={advanceSearchModal}
        title={t('modal.advanceFilter')}
        action={closeAdvanceSearchModal}>
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item label={t('label.searchHouse')} name="name">
            <Input placeholder={t('placeholder.searchHouse')} disabled={loading} />
          </Form.Item>
          <Form.Item label={t('label.propertyDetails')} name="categories">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder={t('placeholder.categories')}
              options={categories.map(category => {
                return { value: category, label: category };
              })}
              disabled={loading}
            />
          </Form.Item>
          <Form.Item label={t('label.location')}>
            <div className={styles.propertyContainer}>
              <div>
                <Form.Item name="provinces">
                  <Select
                    placeholder={t('placeholder.provinces')}
                    onChange={handleChangeProvince}
                    options={provinces.map(province => {
                      return {
                        value: province.id,
                        label: province.name,
                      };
                    })}
                    disabled={loading}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="districts">
                  <Select
                    placeholder={t('placeholder.districts')}
                    onChange={handleChangeDistrict}
                    options={districts
                      .filter(district => district.province.id === provinceId)
                      .map(district => ({
                        value: district.id,
                        label: district.name,
                      }))}
                    disabled={loading}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="wards">
                  <Select
                    placeholder={t('placeholder.wards')}
                    options={wards
                      .filter(ward => ward.district.id === districtId)
                      .map(ward => ({
                        value: ward.id,
                        label: ward.name,
                      }))}
                    disabled={loading}
                  />
                </Form.Item>
              </div>
            </div>
          </Form.Item>
          <Form.Item label={t('label.propertySize')}>
            <Space>
              <Form.Item
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
              <Form.Item name="maxArea">
                <InputNumber
                  placeholder={t('placeholder.maximumSize')}
                  style={{ width: '100%' }}
                  disabled={loading}
                />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item label={t('label.priceRange')}>
            <Space>
              <Caption size={140}>
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

          <Form.Item label={t('label.amenities')} name="amenities">
            <Checkbox.Group>
              <Row>
                {amenities.map(amenity => {
                  return (
                    <Col lg={8} key={amenity.id}>
                      <Checkbox value={{ id: amenity.id }} disabled={loading}>
                        {amenity.name}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label={t('label.Utilities')} name="utilities">
            <Checkbox.Group>
              <Row>
                {utilities.map(utility => {
                  return (
                    <Col lg={8} key={utility.id}>
                      <Checkbox value={{ id: utility.id }} disabled={loading}>
                        {utility.name}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                {t('button.explore')}
              </Button>
              <Button loading={loading} disabled={loading} onClick={handleReset}>
                {t('button.reset')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};

export default AdvanceSearch;