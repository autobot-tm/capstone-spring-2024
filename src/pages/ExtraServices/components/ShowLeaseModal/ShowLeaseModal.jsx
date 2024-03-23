import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React, { useEffect } from 'react';
import { closeShowLeaseModal } from '../../../../store/slices/modalSlice';
import { Button } from 'antd';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { useState } from 'react';

const ShowLeaseModal = () => {
  const showLeaseModal = useSelector(state => state.modal.showLeaseModal);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('run run');
    getLeasesService({ offset: 0, status: 'ACTIVE', limit: 20 }).then(res => setData(res));
  }, [showLeaseModal]);

  console.log('lease', data);

  const itemLease = () => {
    data?.leases.length !== 0 &&
      data.leases.map(lease => (
        <div key={lease.id}>
          <HouseItemRow
            id={lease.id}
            house={lease.reservation.house}
            status={lease.status}
            time={lease.created_at}
            type="services"
          />
        </div>
      ));
  };

  return (
    <CustomModal
      width={400}
      nameOfModal={showLeaseModal}
      title="Choose lease"
      action={closeShowLeaseModal}
      footer={[<Button key="">next</Button>]}>
      {itemLease}
    </CustomModal>
  );
};

export default ShowLeaseModal;
