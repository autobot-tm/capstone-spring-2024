import './styles.scss';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Button, Dropdown, Menu, List, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Caption, SubHeading } from '../Typography';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, markAllAsRead, setNotifications } from '../../store/slices/notification.slice';
import { getNotiUserCurrentService } from '../../services/apis/notification.service';
import { openContractDetailModal } from '../../store/slices/modalSlice';
// import { updateNotiHasReadService } from '../../services/apis/notification.service';
import { useNavigate } from 'react-router-dom';

const NotificationItem = ({ isRead, onClick, title, description, time }) => {
  const notificationTime = new Date(time);
  // console.log('click', onClick);
  return (
    <List.Item className={`item-notification ${!isRead ? 'unRead' : ''}`}>
      <a onClick={onClick}>
        <List.Item.Meta title={title} description={description} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Caption size={110} strong>
            {formatTimeDifference(notificationTime)}
          </Caption>
        </div>
      </a>
    </List.Item>
  );
};

function formatTimeDifference(notificationTime) {
  const currentTime = new Date();
  const timeDiffMilliseconds = currentTime - notificationTime;
  const timeDiffMinutes = Math.floor(timeDiffMilliseconds / (1000 * 60));

  if (timeDiffMinutes < 60) {
    return `${timeDiffMinutes} minute ago`;
  } else if (timeDiffMinutes < 24 * 60) {
    const hours = Math.floor(timeDiffMinutes / 60);
    return `${hours}hour ago`;
  } else if (timeDiffMinutes < 30 * 24 * 60) {
    const days = Math.floor(timeDiffMinutes / (24 * 60));
    return `${days} day ago`;
  } else if (timeDiffMinutes < 12 * 30 * 24 * 60) {
    const months = Math.floor(timeDiffMinutes / (30 * 24 * 60));
    return `${months} month ago`;
  } else {
    const years = Math.floor(timeDiffMinutes / (12 * 30 * 24 * 60));
    return `${years} year ago`;
  }
}

const UserNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.notification.unreadCount);
  const notificationState = useSelector(state => state.notification.notifications);
  const [visible, setVisible] = useState(false);

  const { data: notifications } = useSWR('/api/notifications', async () => {
    try {
      const res = await getNotiUserCurrentService();
      console.log(res);
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
  }, [notifications, dispatch]);

  const handleVisibleChange = flag => {
    setVisible(flag);
    if (!flag) {
      dispatch(markAllAsRead());
    }
  };

  const handleNotificationClick = async id => {
    console.log('Notification clicked:', id);
    if (id) {
      try {
        setVisible(false);
        navigate('/management/' + id);
        dispatch(openContractDetailModal({ notificationId: id }));
        dispatch(markAsRead(id));
        // await updateNotiHasReadService(id);
        mutate('/api/notifications');
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const handleNotificationIconClick = () => {
    //còn
    dispatch(markAllAsRead());
    mutate('/api/notifications');
  };

  const menu = (
    <Menu>
      <div className="noti-container">
        <div className="title">
          <SubHeading strong>Notification</SubHeading>
          <a href="#" onClick={handleNotificationIconClick}>
            Mark all read
          </a>
        </div>
      </div>

      <List
        className="noti-list"
        dataSource={notificationState}
        renderItem={item => (
          <>
            <NotificationItem
              key={item.id}
              title={item.title}
              description={item.description}
              time={item.created_at}
              isRead={item.current_user_has_read}
              onClick={() => handleNotificationClick(item.id)}
            />
          </>
        )}
      />
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
