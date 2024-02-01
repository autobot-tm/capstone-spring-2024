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
          width: '100%',
        }}
        onChange={onChange}
      />
    </Space>
  );
};

export default DatePickerAnt;
