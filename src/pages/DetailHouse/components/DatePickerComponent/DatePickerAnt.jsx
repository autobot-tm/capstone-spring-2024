import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const DatePickerAnt = ({ propValue, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(propValue || null);
  const { t } = useTranslation();
  const dateFormat = 'YYYY-MM-DD';
  moment.defaultFormat = dateFormat;

  const handleChange = (date, dateString) => {
    setSelectedDate(dateString);
    onDateChange(dateString);
    console.log(selectedDate);
  };

  const disabledDate = current => {
    const minDate = moment().endOf('day');
    const maxDate = moment().add(2, 'years').endOf('day');
    return current && (current < minDate || current > maxDate);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker
        style={{ width: '100%' }}
        value={selectedDate ? dayjs(selectedDate) : null}
        format={dateFormat}
        size="large"
        placeholder={t('detail-house.select-date')}
        onChange={handleChange}
        disabledDate={disabledDate}
      />
    </Space>
  );
};

export default DatePickerAnt;
