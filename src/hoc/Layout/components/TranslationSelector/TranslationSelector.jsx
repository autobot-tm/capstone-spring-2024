import React from 'react';
import './styles.scss';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import englishFlag from '../../../../../src/assets/images/english.png';
import japanFlag from '../../../../../src/assets/images/japan.png';

export const TranslationSelector = () => {
  const { i18n } = useTranslation();
  const onChange = value => {
    i18n.changeLanguage(value);
  };

  const locales = [
    {
      value: 'ja',
      label: '日本語',
      emoji: <img src={japanFlag} style={{ width: '20px' }} />,
    },
    {
      value: 'en',
      label: 'English',
      emoji: <img src={englishFlag} style={{ width: '20px' }} />,
    },
  ];
  return (
    <Select
      style={{ width: '120px' }}
      size="large"
      suffixIcon={<GlobalOutlined />}
      defaultValue={i18n.language.split('-')[0]}
      options={locales}
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
