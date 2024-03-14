import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Button, Col, Form, Popover, Row, Select } from 'antd';
import { SearchOutlined, SelectOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { openAdvanceSearchModal } from '../../../../store/slices/modalSlice';
import { setFilter } from '../../../../store/slices/houseSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../../../components/Typography';

const SearchBar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const metadata = useSelector(state => state.house.metadata);
  useEffect(() => {
    if (metadata) {
      setCategories(metadata.categories);
      setProvinces(metadata.location.provinces);
      setDistricts(metadata.location.districts);
      setWards(metadata.location.wards);
    }
  }, [metadata]);

  const handleChangeProvince = value => {
    setProvinceId(value);
  };

  const handleChangeDistrict = value => {
    setDistrictId(value);
    form.resetFields(['wards']);
  };
  const handleFinish = values => {
    setLoading(true);

    const { categories, provinces, districts, wards } = values;

    dispatch(
      setFilter({
        categories,
        provinces,
        districts,
        wards,
      }),
    );

    setLoading(false);
    navigate('/houses');
  };

  const locationContent = (
    <div className={styles.locationContainer}>
      <Form.Item>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Form.Item name="provinces" style={{ margin: 0 }}>
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
            <Form.Item name="districts" style={{ margin: 0 }}>
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
            <Form.Item name="wards" style={{ margin: 0 }}>
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
  return (
    <div className={styles.searchBar}>
      <Form onFinish={handleFinish} form={form}>
        <Row gutter={[4, 4]}>
          <Col lg={9} sm={24} xs={24}>
            <Form.Item name="categories" style={{ margin: 0 }}>
              <Select
                maxTagCount={2}
                size="large"
                mode="multiple"
                allowClear
                placeholder={<Paragraph>{t('placeholder.categories')}</Paragraph>}
                style={{ width: '100%' }}
                options={categories.map(category => {
                  return { value: category, label: t('category.' + category) };
                })}
                disabled={loading}
              />
            </Form.Item>
          </Col>
          <Col lg={9} sm={24} xs={24}>
            <Popover content={locationContent} title={t('label.location')} trigger="click">
              <Button className={styles.button} size="large">
                <Paragraph>{t('label.location')}</Paragraph>
              </Button>
            </Popover>
          </Col>
          <Col lg={3} xs={12}>
            <BaseButton
              size="large"
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              {t('button.search')}
            </BaseButton>
          </Col>

          <Col lg={3} xs={12}>
            <BaseButton
              size="large"
              type="text"
              icon={<SelectOutlined />}
              onClick={() => dispatch(openAdvanceSearchModal())}>
              {t('button.advanced')}
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
