import { Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

const CustomModal = ({ children, nameOfModal, title, action }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      width={400}
      centered
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
            fontSize: 25,
          }}>
          {title}
        </div>
      }
      open={nameOfModal}
      onOk={() => {
        // navigate('/' + previousPathname);
        dispatch(action());
      }}
      onCancel={() => {
        // navigate('/' + previousPathname);

        dispatch(action());
      }}
      footer={null}>
      {children}
    </Modal>
  );
};

export default CustomModal;
