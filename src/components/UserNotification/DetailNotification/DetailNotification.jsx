import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { closeNotificationDetailModal } from '../../../store/slices/modalSlice';

import CustomModal from '../../Modal/CustomModal';
import './styles.scss';
import { getNotiByIdService } from '../../../services/apis/notification.service';
import { getLeaseByIdService } from '../../../services/apis/lease.service.service';
import { Caption, Paragraph, SubHeading } from '../../Typography';
import { Tag } from 'antd';

const DetailNotification = () => {
  const notificationPopup = useSelector(state => state.modal.notificationDetailModal);
  const notificationId = useSelector(state => state.modal.notificationId);
  const user = useSelector(state => state.user.user);
  const [cancelRequest, setCancelRequest] = useState('');
  const [notification, setNotifications] = useState('');

  useEffect(() => {
    const fetchDetailCancelContract = async () => {
      try {
        if (notificationId) {
          const noti = await getNotiByIdService(notificationId);
          setNotifications(noti);
          const contextOfNoti = noti.context;
          const { lease_id, cancelation_request_id } = contextOfNoti;
          const lease = await getLeaseByIdService(lease_id);
          const cancel_contract = lease.cancelation_requests.find(
            req => req.id === cancelation_request_id,
          );
          console.log('cancel_contract', cancel_contract);
          if (cancel_contract) {
            setCancelRequest(cancel_contract);
          }
        }
      } catch (error) {
        console.error('Error fetching cancel request:', error);
      }
    };

    console.log('user', user);
    fetchDetailCancelContract();
  }, [notificationId]);

  const STATUS = {
    IN_PROGRESS: <Tag color="orange">Đang xử lý... </Tag>,
    REJECTED: <Tag color="red">Yêu cầu của bạn không được chấp thuận </Tag>,
    APPROVED: <Tag color="green">Yêu cầu của bạn đã được đồng ý. </Tag>,
  };

  return (
    <CustomModal
      width={600}
      nameOfModal={notificationPopup}
      title="Cancel Request"
      action={closeNotificationDetailModal}
      footer={[]}>
      <div id="dn-container">
        <SubHeading strong>Hi, {user?.first_name}</SubHeading>
        <Paragraph classNames="d-block color-black">{notification?.description}</Paragraph>
        <Caption size={140} classNames="d-block color-black">
          <b>Title:</b> {cancelRequest?.title}
        </Caption>
        <Caption size={140} classNames="d-block color-black">
          <b>Reason:</b> {cancelRequest?.reason}
        </Caption>
        <Paragraph>{STATUS[cancelRequest?.status] || null}</Paragraph>
      </div>
    </CustomModal>
  );
};

export default DetailNotification;
