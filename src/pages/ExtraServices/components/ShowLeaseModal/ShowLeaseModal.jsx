import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React, { useEffect } from 'react';
import { closeShowLeaseModal } from '../../../../store/slices/modalSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ShowLeaseModal = () => {
  const showLeaseModal = useSelector(state => state.modal.showLeaseModal);
  const [leases, setLeases] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getLeasesService({ offset: 0, status: 'ACTIVE', limit: 20 }).then(res => setLeases(res.leases));
  }, [showLeaseModal]);

  return (
    <CustomModal
      width={800}
      nameOfModal={showLeaseModal}
      title={t('modal.chooseContract')}
      action={closeShowLeaseModal}
      footer={null}>
      {leases.map((lease, index) => {
        return (
          <React.Fragment key={index}>
            <HouseItemRow id={lease.id} house={lease.reservation.house} type="service" />
          </React.Fragment>
        );
      })}
    </CustomModal>
  );
};

export default ShowLeaseModal;
