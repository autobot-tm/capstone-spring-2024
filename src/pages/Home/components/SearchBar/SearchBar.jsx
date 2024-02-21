import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Col, Form, Row, Select } from 'antd';
import { SearchOutlined, SelectOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { getMetaData } from '../../../../services/apis/houses.service';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { openAdvanceSearchModal } from '../../../../store/slices/modalSlice';
import { setFilter } from '../../../../store/slices/houseSlice';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    getMetaData().then(response => {
      setCategories(response.categories);
      setProvinces(response.location.provinces);
      setDistricts(response.location.districts);
      setWards(response.location.wards);
    });
  }, []);

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
  return (
    <div className={styles.searchBar}>
      <Form onFinish={handleFinish} form={form}>
        <Row gutter={[4, 4]}>
          <Col lg={8} sm={24} xs={24}>
            <Form.Item name="categories" style={{ margin: 0 }}>
              <Select
                maxTagCount={2}
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
          <Col lg={3} sm={8} xs={24}>
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
          <Col lg={4} sm={8} xs={24}>
            <Form.Item name="districts" style={{ margin: 0 }}>
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
          <Col lg={4} sm={8} xs={24}>
            <Form.Item name="wards" style={{ margin: 0 }}>
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
          <Col lg={3} xs={12}>
            <BaseButton
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              {t('button.search')}
            </BaseButton>
          </Col>
          <Col lg={2} xs={12}>
            <BaseButton
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
