import React from 'react';
import './styles.scss';
import { supportedLocales } from '../../../../translations';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

export const TranslationSelector = () => {
  const { i18n } = useTranslation();
  const onChange = value => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      style={{ width: '120px' }}
      size="large"
      suffixIcon={<GlobalOutlined />}
      defaultValue={i18n.language.split('-')[0]}
      options={supportedLocales}
      onChange={onChange}
      optionRender={option => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          {option.data.label}
        </Space>
      )}></Select>
  );
};
