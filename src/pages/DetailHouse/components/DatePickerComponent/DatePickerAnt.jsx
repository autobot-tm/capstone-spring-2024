import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const DatePickerAnt = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date, dateString) => {
    setSelectedDate(dateString);
    onDateChange(dateString);
    console.log(selectedDate);
  };

  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  return (
    <Space direction="vertical">
      <DatePicker style={{ width: '100%' }} onChange={handleChange} disabledDate={disabledDate} />
    </Space>
  );
};

export default DatePickerAnt;
