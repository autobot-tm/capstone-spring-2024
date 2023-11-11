import React from 'react';
import { PageLayout } from '../../hoc/Layout';
// import { TabName } from '../../components/TabName';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { Carousel } from 'antd';
import Section from './components/Section';
import ColorSection from './components/ColorSection';
import StaffSection from './components/StaffSection/StaffSection';
import OverviewSection from './components/OverviewSection';
import PhoneSection from './components/PhoneSection';

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <div id="about">
        <Carousel autoplay>
          <div className="carousel-content">
            <div className="flex">
              <div className="text-wrapper">
                <h1>{t`about-us`}</h1>
              </div>
            </div>
          </div>
        </Carousel>
        <div className="container">
          <Section />
          <ColorSection />
          <StaffSection />
          <OverviewSection />
          <PhoneSection />
        </div>
      </div>
    </PageLayout>
  );
};
