import { Card } from 'antd';
import './styles.scss';
import React from 'react';
import { FileProtectOutlined, ThunderboltOutlined } from '@ant-design/icons';
import ServiceStatus from '../../pages/ExtraServices/components/ServiceStatus/ServiceStatus';
import { Caption, SubHeading } from '../Typography';
import WATER from '../../assets/images/water-drop-svgrepo-com.svg';

const CardService = ({ data, onClickDetail, t }) => {
  return (
    <>
      {data && (
        <>
          <Card
            hoverable
            className="card-item"
            onClick={() => {
              onClickDetail(data?.id);
            }}>
            <div className="inner-card">
              {data?.extra_service?.name === 'Electricity bill payment service' && (
                <>
                  <span className="name-services">
                    <ThunderboltOutlined className="es-icon es-iconPrimary" />
                    <SubHeading size={230} strong style={{ width: '100%' }}>
                      {t('EXTRA-SERVICES.electricity-card')}
                      <Caption size={140} style={{ padding: '4px' }} classNames="d-block color-black">
                        {t('placeholder.type')}: <b>{t(`type.${data?.extra_service?.type.replace(/\s/g, '')}`)}</b> -{' '}
                        {t('label.category')}:{' '}
                        <b>{t(`category.${data?.extra_service?.category.replace(/\s/g, '')}`)}</b>
                      </Caption>
                      <Caption style={{ padding: '4px' }} classNames="color-black" size={140}>
                        {t('label.title')}: <b>{data?.title}</b>{' '}
                      </Caption>
                    </SubHeading>
                  </span>
                  <ServiceStatus status={data?.status} />
                </>
              )}
              {data?.extra_service?.name === 'Water bill payment service' && (
                <>
                  <span className="name-services">
                    <img src={WATER} alt="" className="es-icon es-iconTertiary" />
                    <SubHeading size={230} strong style={{ width: '100%' }}>
                      {t('EXTRA-SERVICES.water-card')}
                      <Caption size={140} style={{ padding: '4px' }} classNames="d-block color-black">
                        {t('placeholder.type')}: <b>{t(`type.${data?.extra_service?.type.replace(/\s/g, '')}`)}</b> -{' '}
                        {t('label.category')}:{' '}
                        <b>{t(`category.${data?.extra_service?.category.replace(/\s/g, '')}`)}</b>
                      </Caption>
                      <Caption style={{ padding: '4px' }} classNames="color-black" size={140}>
                        {t('label.title')}: <b>{data?.title}</b>{' '}
                      </Caption>
                    </SubHeading>
                  </span>
                  <ServiceStatus status={data?.status} />
                </>
              )}
              {data?.extra_service?.name === 'Temporary Residence Registration Support Service' && (
                <>
                  <span className="name-services">
                    <FileProtectOutlined className="es-icon es-iconOthers" />
                    <SubHeading size={230} strong style={{ width: '100%' }}>
                      {t('EXTRA-SERVICES.residence-card')}
                      <Caption size={140} style={{ padding: '4px' }} classNames="d-block color-black">
                        {t('placeholder.type')}: <b>{t(`type.${data?.extra_service?.type.replace(/\s/g, '')}`)}</b> -{' '}
                        {t('label.category')}:{' '}
                        <b>{t(`category.${data?.extra_service?.category.replace(/\s/g, '')}`)}</b>
                      </Caption>
                      <Caption style={{ padding: '4px' }} classNames="color-black" size={140}>
                        {t('label.title')}: <b>{data?.title}</b>{' '}
                      </Caption>
                    </SubHeading>
                  </span>
                  <ServiceStatus status={data?.status} />
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default CardService;
