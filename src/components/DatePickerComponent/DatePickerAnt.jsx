import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const DatePickerAnt = () => {
  return (
    <Space direction="vertical">
      <DatePicker
        style={{
          width: '160px',
        }}
        onChange={onChange}
      />
    </Space>
  );
};

export default DatePickerAnt;
