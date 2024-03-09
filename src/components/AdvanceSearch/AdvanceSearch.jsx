import React, { useEffect, useState } from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
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
import { Caption, Paragraph } from '../Typography';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { t } from 'i18next';
import { setFilter } from '../../store/slices/houseSlice';
import { useNavigate } from 'react-router-dom';
const AdvanceSearch = () => {
  const navigate = useNavigate();
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
  const dispatch = useDispatch();

  const metadata = useSelector(state => state.house.metadata);

  const handleSliderChange = newValue => {
    setSliderValue(newValue);
  };

  const handleChangeProvince = value => {
    setProvinceId(value);
  };

  const handleChangeDistrict = value => {
    setDistrictId(value);
    form.resetFields(['wards']);
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
    setLoading(false);
    dispatch(closeAdvanceSearchModal());
    navigate('/houses');
  };

  useEffect(() => {
    if (metadata) {
      setCategories(metadata.categories);
      setProvinces(metadata.location.provinces);
      setDistricts(metadata.location.districts);
      setWards(metadata.location.wards);
      setSliderValue([metadata.min_price, metadata.max_price]);
      setMinPrice(metadata.min_price);
      setMaxPrice(metadata.max_price);
      setAmenities(metadata.amenities);
      setUtilities(metadata.utilities);
    }
  }, [metadata]);

  useEffect(() => {
    if (!advanceSearchModal) {
      form.resetFields();
      setProvinceId(0);
      setDistrictId(0);
      setSliderValue([minPrice, maxPrice]);
    }
  }, [form, advanceSearchModal]);
  return (
    <CustomModal
      width={600}
      nameOfModal={advanceSearchModal}
      title={t('modal.advanceFilter')}
      action={closeAdvanceSearchModal}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          onClick={() => form.submit()}>
          {t('button.explore')}
        </Button>,
        <Button key="" loading={loading} disabled={loading} onClick={handleReset}>
          {t('button.reset')}
        </Button>,
      ]}>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item label={<Paragraph strong>{t('label.searchHouse')}</Paragraph>} name="name">
          <Input size="large" placeholder={t('placeholder.searchHouse')} disabled={loading} />
        </Form.Item>
        <Form.Item
          label={<Paragraph strong>{t('label.propertyDetails')}</Paragraph>}
          name="categories">
          <Select
            size="large"
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder={t('placeholder.categories')}
            options={categories.map(category => {
              return { value: category, label: t('category.' + category) };
            })}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item label={<Paragraph strong>{t('label.location')}</Paragraph>}>
          <Row gutter={[8, 0]}>
            <Col sm={8} xs={24}>
              <Form.Item name="provinces">
                <Select
                  size="large"
                  placeholder={t('placeholder.provinces')}
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
            <Col sm={8} xs={24}>
              <Form.Item name="districts">
                <Select
                  size="large"
                  placeholder={t('placeholder.districts')}
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
            <Col sm={8} xs={24}>
              <Form.Item name="wards">
                <Select
                  size="large"
                  placeholder={t('placeholder.wards')}
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
        <Form.Item label={<Paragraph strong>{t('label.propertySize')}</Paragraph>}>
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
                {
                  type: 'number',
                  min: 1,
                  message: t('validationRules.min'),
                },
              ]}>
              <InputNumber
                size="large"
                placeholder={t('placeholder.minimumSize')}
                style={{ width: '100%' }}
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="maxArea"
              rules={[
                {
                  type: 'number',
                  min: 1,
                  message: t('validationRules.min'),
                },
              ]}>
              <InputNumber
                size="large"
                placeholder={t('placeholder.maximumSize')}
                style={{ width: '100%' }}
                disabled={loading}
              />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label={<Paragraph strong>{t('label.priceRange')}</Paragraph>}>
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

        <Form.Item label={<Paragraph strong>{t('label.amenities')}</Paragraph>} name="amenities">
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
        <Form.Item label={<Paragraph strong>{t('label.Utilities')}</Paragraph>} name="utilities">
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
        <Divider />
      </Form>
    </CustomModal>
  );
};

export default AdvanceSearch;
