import React from 'react';
import { Select, Space } from 'antd';

const Selection = ({ onChange }) => {
  const handleChange = value => {
    console.log(`selected ${value}`);
    onChange(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue="1 month"
        style={{
          width: '160px',
          color: '#ccc',
          textAlign: 'left',
        }}
        onChange={handleChange}
        options={[
          {
            value: '1',
            label: '1 month',
          },
          {
            value: '3',
            label: '3 month',
          },
          {
            value: '6',
            label: '6 month',
          },
          {
            value: '12',
            label: '12 month',
          },
        ]}
      />
    </Space>
  );
};

export default Selection;
