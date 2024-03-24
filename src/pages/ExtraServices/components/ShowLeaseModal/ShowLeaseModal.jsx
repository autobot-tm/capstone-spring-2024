import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Modal/CustomModal';
import './styles.scss';
import React, { useEffect } from 'react';
import { closeShowLeaseModal } from '../../../../store/slices/modalSlice';
import HouseItemRow from '../../../../components/HouseItemRow/HouseItemRow';
import { getLeasesService } from '../../../../services/apis/contracts.service';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';

const ShowLeaseModal = () => {
  const { access_token } = useSelector(state => state.auth);

  const { showLeaseModal } = useSelector(state => state.modal);
  const [leases, setLeases] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (access_token) {
      getLeasesService({ offset: 0, status: 'ACTIVE', limit: 20 }).then(res =>
        setLeases(res.leases),
      );
    }
  }, [showLeaseModal]);

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
