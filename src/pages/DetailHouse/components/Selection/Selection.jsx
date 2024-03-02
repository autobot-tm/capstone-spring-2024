import './style.scss';
import React, { useState } from 'react';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Selection = ({ defaultValue, onChange }) => {
  const [editedValue, setEditedValue] = useState(defaultValue);
  const { t } = useTranslation();
  const handleChange = value => {
    setEditedValue(value);
    onChange(value);
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }} wrap>
      <Select
        defaultValue={`1 ${t('detail-house.month')}`}
        value={editedValue}
        size="large"
        style={{
          width: '100%',
          color: '#ccc',
          textAlign: 'left',
        }}
        onChange={handleChange}
        options={[
          {
            value: '1',
            label: `1 ${t('detail-house.month')}`,
          },
          {
            value: '2',
            label: `2 ${t('detail-house.months')}`,
          },
          {
            value: '3',
            label: `3 ${t('detail-house.months')}*`,
          },
          {
            value: '4',
            label: `4 ${t('detail-house.months')}`,
          },
          {
            value: '5',
            label: `5 ${t('detail-house.months')}`,
          },
          {
            value: '6',
            label: `6 ${t('detail-house.months')}*`,
          },
          {
            value: '7',
            label: `7 ${t('detail-house.months')}`,
          },
          {
            value: '8',
            label: `8 ${t('detail-house.months')}`,
          },
          {
            value: '9',
            label: `9 ${t('detail-house.months')}`,
          },
          {
            value: '10',
            label: `10 ${t('detail-house.months')}`,
          },
          {
            value: '11',
            label: `11 ${t('detail-house.months')}`,
          },
          {
            value: '12',
            label: `12 ${t('detail-house.months')}*`,
          },
        ]}
      />
    </Space>
  );
};

export default Selection;
