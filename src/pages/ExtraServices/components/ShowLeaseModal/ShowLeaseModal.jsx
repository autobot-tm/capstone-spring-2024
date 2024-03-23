import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React, { useEffect } from 'react';
import { closeShowLeaseModal } from '../../../../store/slices/modalSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { useState } from 'react';

const ShowLeaseModal = () => {
  const showLeaseModal = useSelector(state => state.modal.showLeaseModal);
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    getLeasesService({ offset: 0, status: 'ACTIVE', limit: 20 }).then(res => setLeases(res.leases));
  }, [showLeaseModal]);

  console.log(leases);

  return (
    <CustomModal
      width={800}
      nameOfModal={showLeaseModal}
      title="Choose lease"
      action={closeShowLeaseModal}
      footer={null}>
      {leases.map((lease, index) => {
        return (
          <div key={index}>
            <HouseItemRow id={lease.id} house={lease.reservation.house} type="service" />
          </div>
        );
      })}
    </CustomModal>
  );
};

export default ShowLeaseModal;
