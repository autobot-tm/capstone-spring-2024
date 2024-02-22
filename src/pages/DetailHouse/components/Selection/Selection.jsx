import './style.scss';
import React, { useState } from 'react';
import { Select, Space } from 'antd';

const Selection = ({ defaultValue, onChange }) => {
  const [editedValue, setEditedValue] = useState(defaultValue); // Sử dụng state mới để lưu giá trị đã chỉnh sửa

  const handleChange = value => {
    setEditedValue(value);
    onChange(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue="1 month"
        value={editedValue}
        style={{
          width: '100%',
          color: '#ccc',
          textAlign: 'left',
        }}
        onChange={handleChange}
        options={[
          {
            value: '1',
            label: '1 month*',
          },
          {
            value: '2',
            label: '2 months',
          },
          {
            value: '3',
            label: '3 months*',
          },
          {
            value: '4',
            label: '4 months',
          },
          {
            value: '5',
            label: '5 months',
          },
          {
            value: '6',
            label: '6 months*',
          },
          {
            value: '7',
            label: '7 months',
          },
          {
            value: '8',
            label: '8 months',
          },
          {
            value: '9',
            label: '9 months',
          },
          {
            value: '10',
            label: '10 months',
          },
          {
            value: '11',
            label: '11 months',
          },
          {
            value: '12',
            label: '12 months*',
          },
        ]}
      />
    </Space>
  );
};

export default Selection;
