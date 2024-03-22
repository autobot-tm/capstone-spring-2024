import './styles.scss';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Button, Dropdown, Menu, List, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Caption, SubHeading } from '../Typography';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, markAllAsRead, setNotifications } from '../../store/slices/notification.slice';
import {
  getNotiByIdService,
  getNotiUserCurrentService,
} from '../../services/apis/notification.service';
import { openContractDetailModal } from '../../store/slices/modalSlice';
import { updateNotiHasReadService } from '../../services/apis/notification.service';
import { useNavigate } from 'react-router-dom';
import { setContractLoading } from '../../store/slices/contractSlice';

const NotificationItem = ({ isRead, onClick, title, description, time, t }) => {
  const notificationTime = new Date(time);
  return (
    <List.Item className={`item-notification ${!isRead ? 'unRead' : ''}`}>
      <a onClick={onClick}>
        <List.Item.Meta title={title} description={description} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Caption size={110} strong>
            {formatTimeDifference(notificationTime, t)}
          </Caption>
        </div>
      </a>
    </List.Item>
  );
};

function formatTimeDifference(notificationTime, t) {
  const timeUnits = {
    minute: [t('minute'), t('minutes')],
    hour: [t('hour'), t('hours')],
    day: [t('day'), t('days')],
    month: [t('month'), t('months')],
    year: [t('year'), t('years')],
  };

  const currentTime = new Date();
  const timeDiffMilliseconds = currentTime - notificationTime;
  const timeDiffMinutes = Math.floor(timeDiffMilliseconds / (1000 * 60));

  const getTimeString = (value, unit) => {
    const unitStrings = timeUnits[unit];
    const unitString = value === 1 ? unitStrings[0] : unitStrings[1];
    return `${value} ${unitString}`;
  };

  if (timeDiffMinutes < 60) {
    return getTimeString(timeDiffMinutes, 'minute');
  } else if (timeDiffMinutes < 24 * 60) {
    return getTimeString(Math.floor(timeDiffMinutes / 60), 'hour');
  } else if (timeDiffMinutes < 30 * 24 * 60) {
    return getTimeString(Math.floor(timeDiffMinutes / (24 * 60)), 'day');
  } else if (timeDiffMinutes < 12 * 30 * 24 * 60) {
    return getTimeString(Math.floor(timeDiffMinutes / (30 * 24 * 60)), 'month');
  } else {
    return getTimeString(Math.floor(timeDiffMinutes / (12 * 30 * 24 * 60)), 'year');
  }
}

const UserNotification = ({ t }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.notification.unreadCount);
  const notificationState = useSelector(state => state.notification.notifications);
  const [visible, setVisible] = useState(false);

  const { data: notifications } = useSWR('/api/notifications', async () => {
    try {
      const LIMIT = 6;
      const res = await getNotiUserCurrentService({ limit: LIMIT });
      return res.notifications;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      throw new Error('Failed to fetch metadata');
    }
  });

  useEffect(() => {
    if (notifications) {
      dispatch(setNotifications(notifications));
    }
  }, [notifications]);

  const handleVisibleChange = flag => {
    setVisible(flag);
    if (!flag) {
      dispatch(markAllAsRead());
    }
  };

  const handleNotificationClick = async id => {
    if (id) {
      try {
        const noti = await getNotiByIdService(id);
        const ACTION_TYPE = noti.action_type;
        const contextOfNoti = noti.context;
        setVisible(false);
        dispatch(markAsRead(id));
        mutate('/api/notifications');
        updateNotiHasReadService(id);

        if (ACTION_TYPE === 'LEASE_CANCELATION_REQUEST') {
          const { lease_id, cancelation_request_id } = contextOfNoti;
          dispatch(
            openContractDetailModal({
              contractId: lease_id,
              cancelation_request_id: cancelation_request_id,
            }),
          );
          dispatch(setContractLoading({ loading: true }));
          dispatch(markAllAsRead());
          return navigate('/management');
        }

        if (ACTION_TYPE === 'EXTRA_SERVICE_REQUEST') {
          const { extra_service_id, extra_service_request_id } = contextOfNoti;
          console.log(
            'extra_service_id, extra_service_request_id',
            extra_service_id,
            extra_service_request_id,
          );
          dispatch(markAllAsRead());
          // return navigate('/extra-services');
        }
      } catch (error) {
        console.error('Error handling notification click:', error);
      }
    }
  };

  const menu = (
    <Menu>
      <div className="noti">
        <div className="noti-header">
          <div className="title">
            <SubHeading strong>{t('notification')}</SubHeading>
          </div>
        </div>
        <List
          className="noti-list"
          dataSource={notificationState}
          renderItem={item => (
            <>
              <NotificationItem
                key={item.id}
                title={t('CANCEL_CONTRACT.title')}
                description={t('CANCEL_CONTRACT.description')}
                time={item.created_at}
                isRead={item.current_user_has_read}
                t={t}
                onClick={() => handleNotificationClick(item.id)}
              />
            </>
          )}
        />
      </div>
    </Menu>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={menu}
      trigger={['click']}
      visible={visible}
      onOpenChange={handleVisibleChange}>
      <Badge count={unreadCount}>
        <Button icon={<BellOutlined />} />
      </Badge>
    </Dropdown>
  );
};

export default UserNotification;
