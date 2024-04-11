import React from 'react';
import CustomModal from '../Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmLogoutModal } from '../../store/slices/modalSlice';
import { Paragraph } from '../Typography';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { signOut } from '../../store/slices';
import { useNavigate } from 'react-router-dom';

const ConfirmLogout = () => {
  const { t } = useTranslation();
  const confirmLogoutModal = useSelector(state => state.modal.confirmLogoutModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    dispatch(closeConfirmLogoutModal());
  };

  const handleOk = () => {
    dispatch(signOut());
    dispatch(closeConfirmLogoutModal());
    navigate('/');
  };

  return (
    <CustomModal
      width={400}
      nameOfModal={confirmLogoutModal}
      title={t('modal.confirm')}
      action={closeConfirmLogoutModal}
      footer={[
        <Button key="" onClick={handleCancel}>
          {t('button.cancel')}
        </Button>,
        <Button key="" type="primary" onClick={handleOk}>
          {t('button.ok')}
        </Button>,
      ]}>
      <div style={{ paddingBottom: 20, textAlign: 'center' }}>
        <Paragraph>{t('logout.disclaimer')}</Paragraph>
      </div>
    </CustomModal>
  );
};

export default ConfirmLogout;
