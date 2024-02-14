import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Form, Select } from 'antd';
import { SearchOutlined, SelectOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { filterHousesService, getMetaData } from '../../../../services/apis/houses.service';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';
import { openAdvanceSearchModal } from '../../../../store/slices/modalSlice';

const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [loading, setLoading] = useState(false);
  const LIMIT = 200;
  const dispatch = useDispatch();
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
  };

  const handleFinish = values => {
    setLoading(true);

    const { categories, provinces, districts, wards } = values;

    filterHousesService({
      categories,
      provinces,
      districts,
      wards,
      LIMIT,
    }).then(response => {
      console.log(response.houses);
      setLoading(false);
    });
  };
  return (
    <div className={styles.searchBar}>
      <Form onFinish={handleFinish}>
        <div className={styles.formContainer}>
          <div className={styles.formItem}>
            <Form.Item name="categories" style={{ margin: 0 }}>
              <Select
                mode="multiple"
                allowClear
                placeholder={t('placeholder.categories')}
                style={{ width: '100%' }}
                options={categories.map(category => {
                  return { value: category, label: category };
                })}
                disabled={loading}
              />
            </Form.Item>
          </div>
          <div className={styles.formItem}>
            <Form.Item name="provinces" style={{ margin: 0 }}>
              <Select
                placeholder={t('placeholder.provinces')}
                style={{ width: '100%' }}
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
          <div className={styles.formItem}>
            <Form.Item name="districts" style={{ margin: 0 }}>
              <Select
                placeholder={t('placeholder.districts')}
                style={{ width: '100%' }}
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
          <div className={styles.formItem}>
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
          </div>
          <div>
            <BaseButton
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              {t('button.search')}
            </BaseButton>
          </div>
          <div>
            <BaseButton
              type="text"
              icon={<SelectOutlined />}
              onClick={() => dispatch(openAdvanceSearchModal())}>
              {t('button.advanced')}
            </BaseButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
