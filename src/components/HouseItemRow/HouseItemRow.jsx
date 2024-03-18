import React from 'react';
import styles from './HouseItemRow.module.scss';
import { Caption, Paragraph, SubHeading } from '../Typography';
import locationIcon from '../../assets/images/location.svg';
import { formatCustomCurrency } from '../../utils/number-seperator';
import ReservationStatus from '../ReservationStatus/ReservationStatus';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openContractDetailModal, openReservationDetailModal } from '../../store/slices/modalSlice';
import { setLoading } from '../../store/slices/reservationSlice';
import { setContractLoading } from '../../store/slices/contractSlice';
import ContractStatus from '../ContractStatus.jsx/ContractStatus';

const HouseItemRow = ({ id, house, status, time, type }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.card}
      onClick={() => {
        if (type === 'contract') {
          dispatch(setContractLoading({ loading: true }));
          dispatch(openContractDetailModal({ contractId: id }));
        } else {
          dispatch(setLoading({ loading: true }));
          dispatch(openReservationDetailModal({ reservationId: id }));
        }
      }}>
      <div className={styles.imageContainer}>
        <img src={house.image_urls[0]} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.locationContainer}>
            <img src={locationIcon} alt="" />
            <Caption size={140} ellipsis>
              {house.address}
            </Caption>
          </div>

          <div className={styles.statusContainer}>
            {type === 'contract' ? (
              <ContractStatus status={status} />
            ) : (
              <ReservationStatus status={status} />
            )}
            <Caption size={110}>{moment(time).format('H:mm -  DD/MM/YYYY')}</Caption>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <SubHeading size={230} strong ellipsis classNames="color-black">
            {house.name}
          </SubHeading>
        </div>
        <div className={styles.descriptionContainer}>
          <Paragraph size={160} ellipsis>
            {house.description}
          </Paragraph>
        </div>
        <div className={styles.priceContainer}>
          <Paragraph size={160} key="price" strong classNames="color-black">
            {formatCustomCurrency(house.pricing_policies[0].price_per_month)}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HouseItemRow;
