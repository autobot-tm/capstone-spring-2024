import React from 'react';
import './styles.scss';
import { supportedLocales } from '../../../../translations';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const TranslationSelector = ({ classNames }) => {
  const { i18n } = useTranslation();
  const onChange = value => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language.split('-')[0]}
      options={supportedLocales}
      onChange={onChange}
      className={`selector-container ${classNames}`}
    />
  );
};
