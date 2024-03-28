import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React from 'react';
import { closeShowLeaseModal } from '../../../../store/slices/modalSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';

const ShowLeaseModal = () => {
  const { showLeaseModal, leases } = useSelector(state => state.modal);
  const { t } = useTranslation();
  return (
    <CustomModal
      width={640}
      nameOfModal={showLeaseModal}
      title={t('modal.chooseContract')}
      action={closeShowLeaseModal}
      footer={null}>
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
