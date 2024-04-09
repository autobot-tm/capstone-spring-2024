import './styles.scss';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Dropdown, Menu, List, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Caption, Paragraph, SubHeading } from '../Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications, setLimit, setUnreadCount } from '../../store/slices/notification.slice';
import { getNotiByIdService, getNotiUserCurrentService } from '../../services/apis/notification.service';
import {
  openContactRequestDetailModal,
  openContractDetailModal,
  openExtraServiceRequestDetailModal,
  openInvoiceDetailModal,
} from '../../store/slices/modalSlice';
import { updateNotiHasReadService } from '../../services/apis/notification.service';
import { useNavigate } from 'react-router-dom';
import { setContractLoading } from '../../store/slices/contractSlice';
import { getExtraServiceRequestsById } from '../../services/apis/extra-services.service';
import { setIssueLoading } from '../../store/slices/issueSlice';
import { setInvoiceLoading } from '../../store/slices/invoiceSlice';
// import { APP_CONFIG } from '../../config/app.config';

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

  if (timeDiffMinutes < 1) {
    return t('just-now');
  } else if (timeDiffMinutes < 60) {
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
  const { access_token } = useSelector(state => state.auth);
  const { unreadCount, limit, notifications } = useSelector(state => state.notification);
  const [visible, setVisible] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const eventSource = new EventSource(APP_CONFIG.BACKEND_URL + '/notifications/me/realtime');

  //   eventSource.onmessage = event => {
  //     const newMessage = JSON.parse(event.data);
  //     setMessages(prevMessages => [...prevMessages, newMessage]);
  //   };

  //   eventSource.onerror = error => {
  //     console.error('SSE Error:', error);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  // console.log(APP_CONFIG.BACKEND_URL, messages);

  const { data, isLoading } = useSWR(limit, async key => {
    try {
      if (access_token) {
        const res = await getNotiUserCurrentService({ limit: key });
        return res;
      }
    } catch (error) {
      console.error('Error fetching notification:', error);
      throw new Error('Failed to fetch notification');
    }
  });

  useEffect(() => {
    if (data && !isLoading) {
      const newNotifications = data.notifications;
      const unreadCount = newNotifications.reduce((count, item) => {
        return count + (item.current_user_has_read ? 0 : 1);
      }, 0);
      dispatch(setUnreadCount(unreadCount));
      dispatch(setNotifications(newNotifications));
      if (data?.total_rows > newNotifications?.length) {
        setShowLoadMore(true);
      }
    }
  }, [data, isLoading]);

  const handleLoadMore = () => {
    if (!data) {
      return;
    }
    const dataShow = notifications?.length;
    const dataCurrent = data?.total_rows;
    if (dataCurrent > dataShow) {
      const newLimit = limit + 10;
      dispatch(setLimit({ limit: newLimit }));
    } else {
      setShowLoadMore(false);
    }
  };

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const handleNotificationClick = async id => {
    if (id) {
      try {
        setVisible(false);
        const noti = await getNotiByIdService(id);
        const ACTION_TYPE = noti.action_type;
        const context = noti.context;
        const { lease_id, cancelation_request_id, extra_service_request_id, issue_id, invoice_id } = context;
        await updateNotiHasReadService(id);

        switch (ACTION_TYPE) {
          case 'LEASE_CANCELATION_REQUEST':
            dispatch(
              openContractDetailModal({
                actionType: ACTION_TYPE,
                contractId: lease_id,
                cancelation_request_id: cancelation_request_id,
              }),
            );
            dispatch(setContractLoading({ loading: true }));
            navigate('/management');
            break;
          case 'EXTRA_SERVICE_REQUEST':
            getExtraServiceRequestsById(extra_service_request_id)
              .then(response => {
                dispatch(
                  openExtraServiceRequestDetailModal({
                    actionType: ACTION_TYPE,
                    extraServiceRequestDetail: response,
                  }),
                );
                navigate('/management');
              })
              .catch(error => {
                console.error('Error fetching extra service request:', error);
              });
            break;
          case 'ISSUE_RESOLUTION':
            dispatch(
              openContactRequestDetailModal({
                actionType: ACTION_TYPE,
                issueId: issue_id,
                category: noti.title,
              }),
            );
            dispatch(setIssueLoading({ loading: true }));
            navigate('/management');
            break;
          case 'INVOICE_CREATION':
            dispatch(
              openInvoiceDetailModal({
                actionType: ACTION_TYPE,
                invoiceId: invoice_id,
              }),
            );
            dispatch(setInvoiceLoading({ loading: true }));
            navigate('/management');
            break;
          default:
            break;
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
            <SubHeading size={230} strong>
              {t('notification')}
            </SubHeading>
          </div>
          <div className="title2">
            <Paragraph strong>{t('notification')}</Paragraph>
          </div>
        </div>
        <List
          className="noti-list"
          dataSource={notifications}
          renderItem={item => (
            <>
              <NotificationItem
                key={item.id}
                title={item.title}
                description={item.description}
                time={item.created_at}
                isRead={item.current_user_has_read}
                t={t}
                onClick={() => handleNotificationClick(item.id)}
              />
            </>
          )}
        />

        <div className="see-more-container">
          {showLoadMore && <a onClick={handleLoadMore}>{t('label.showMore')}</a>}
        </div>
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
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Badge count={!isLoading && unreadCount}>
          <BellOutlined style={{ fontSize: '27px' }} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default UserNotification;
