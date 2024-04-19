import React from 'react';
import styles from './HouseItemRow.module.scss';
import { Caption, Paragraph, SubHeading } from '../Typography';
import locationIcon from '../../assets/images/location.svg';
import { formatCustomCurrency } from '../../utils/number-seperator';
import ReservationStatus from '../ReservationStatus/ReservationStatus';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  closeShowLeaseModal,
  openContractDetailModal,
  openRequestCancelContractModal,
  openReservationDetailModal,
} from '../../store/slices/modalSlice';
import { setLoading } from '../../store/slices/reservationSlice';
import { setContractLoading } from '../../store/slices/contractSlice';
import ContractStatus from '../ContractStatus.jsx/ContractStatus';

const HouseItemRow = ({ id, house, status, time, type, price }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.card}
      onClick={() => {
        if (type === 'contract') {
          dispatch(setContractLoading({ loading: true }));
          dispatch(openContractDetailModal({ contractId: id }));
        } else if (type === 'reservation') {
          dispatch(setLoading({ loading: true }));
          dispatch(openReservationDetailModal({ reservationId: id }));
        } else {
          dispatch(closeShowLeaseModal());
          dispatch(openRequestCancelContractModal({ contractId: id, typeOfRequest: type }));
        }
      }}>
      <div className={type !== 'service' ? styles.imageContainer : styles.imageContainer2}>
        <img src={house?.image_urls[0]} />
      </div>
      <div className={type !== 'service' ? styles.contentContainer : styles.contentContainer2}>
        <div className={styles.infoContainer}>
          <div className={styles.locationContainer}>
            <img src={locationIcon} alt="" />
            {type !== 'service' ? (
              <Caption size={140} ellipsis>
                {house?.address}
              </Caption>
            ) : (
              <Caption size={110} ellipsis>
                {house?.address}
              </Caption>
            )}
          </div>

          <div className={styles.statusContainer}>
            {type === 'contract' ? (
              <ContractStatus status={status} />
            ) : type === 'reservation' ? (
              <ReservationStatus status={status} />
            ) : null}
            {type !== 'service' && <Caption size={110}>{moment(time).format('H:mm -  DD/MM/YYYY')}</Caption>}
          </div>
        </div>
        <div className={styles.titleContainer}>
          {type !== 'service' ? (
            <SubHeading size={230} strong ellipsis classNames="color-black">
              {house?.name}
            </SubHeading>
          ) : (
            <SubHeading strong ellipsis classNames="color-black">
              {house?.name}
            </SubHeading>
          )}
        </div>
        <div className={styles.descriptionContainer}>
          {type !== 'service' ? (
            <Paragraph size={160} ellipsis>
              {house?.description}
            </Paragraph>
          ) : (
            <Caption size={140} ellipsis classNames="color-black">
              {house?.description}
            </Caption>
          )}
        </div>
        {type !== 'service' && (
          <div className={styles.priceContainer}>
            <Paragraph size={160} key="price" strong classNames="color-black">
              {formatCustomCurrency(price)}
            </Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseItemRow;
