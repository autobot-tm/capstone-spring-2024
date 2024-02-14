import { Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SubHeading } from '../Typography';
import styles from './CustomModal.module.scss';
const CustomModal = ({ children, nameOfModal, title, action, width }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      width={width}
      destroyOnClose
      centered
      className={styles.modal}
      title={
        <SubHeading size={230} strong classNames={styles.title}>
          {title}
        </SubHeading>
      }
      open={nameOfModal}
      onOk={() => {
        dispatch(action());
      }}
      onCancel={() => {
        dispatch(action());
      }}
      footer={null}>
      {children}
    </Modal>
  );
};

export default CustomModal;
