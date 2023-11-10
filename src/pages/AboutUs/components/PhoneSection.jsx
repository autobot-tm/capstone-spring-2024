import React from 'react';
import { useTranslation } from 'react-i18next';

const PhoneSection = () => {
  const { t } = useTranslation();

  return (
    <div className="phonesection">
      <span>
        {t`about-phone`}
        <span> 028 3827 5068</span>
      </span>
      <span>
        {t`about-phone2`}
        <span> +84(0)28 3827 5068</span>
      </span>
    </div>
  );
};

export default PhoneSection;
