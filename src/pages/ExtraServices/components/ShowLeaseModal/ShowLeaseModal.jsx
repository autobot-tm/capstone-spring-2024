import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React from 'react';
import { closeShowLeaseModal, openServiceDetailModal } from '../../../../store/slices/modalSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import BaseButton from '../../../../components/Buttons/BaseButtons/BaseButton';

const ShowLeaseModal = () => {
  const { showLeaseModal, leases } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <CustomModal
      width={800}
      nameOfModal={showLeaseModal}
      title={t('modal.chooseContract')}
      action={closeShowLeaseModal}
      footer={
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BaseButton
            style={{ width: 'auto' }}
            onClick={() => {
              dispatch(closeShowLeaseModal());
              dispatch(openServiceDetailModal({ leases: leases }));
            }}>
            {t('button.back')}
          </BaseButton>
        </span>
      }>
      {leases && leases?.length > 0 ? (
        leases.map((lease, index) => (
          <React.Fragment key={index}>
            <HouseItemRow id={lease.id} house={lease.reservation.house} type="service" />
          </React.Fragment>
        ))
      ) : (
        <Empty />
      )}
    </CustomModal>
  );
};

export default ShowLeaseModal;
