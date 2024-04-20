import './styles.scss';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Dropdown, Menu, List, Badge, notification } from 'antd';
import { BellOutlined, MailTwoTone } from '@ant-design/icons';
import { Caption, Paragraph, SubHeading } from '../Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotifications,
  setLimit,
  setUnreadCount,
  // markNotificationAsRead,
} from '../../store/slices/notification.slice';
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
import { APP_CONFIG } from '../../config/app.config';
import { ENDPOINTS } from '../../services/apis/api-endpoints.service';
import EventSource from 'react-native-sse';

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
  const [messages, setMessages] = useState([]);
  const [notificationShown, setNotificationShown] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, description) => {
    api[type]({
      message: <strong>{t('new-notification')}</strong>,
      description: description,
      icon: (
        <MailTwoTone
          style={{
            color: '#f8a11e',
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (!access_token) {
      return;
    }
    const es = new EventSource(`${APP_CONFIG.BACKEND_URL}${ENDPOINTS.notification.realTime}`, {
      headers: {
        Authorization: {
          toString: function () {
            return 'Bearer ' + access_token;
          },
        },
      },
    });

    es.addEventListener('open', event => {
      console.log('Open SSE connection.', event);
    });

    es.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      data.context = JSON.parse(data.context.replace(/'/g, '"'));
      const { title } = data;
      if (data && !notificationShown) {
        setMessages(title);
        openNotificationWithIcon('info', title);
        setNotificationShown(true);
        setTimeout(() => {
          setNotificationShown(false);
        }, 1000);
      }
    });

    es.addEventListener('error', event => {
      if (event.type === 'error') {
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    });

    es.addEventListener('close', event => {
      console.log('Close SSE connection.', event);
    });
    return () => {
      es.close();
    };
  }, [access_token, notificationShown]);
  console.log(messages);

  const handleNotificationClick = async id => {
    try {
      if (id) {
        await updateNotiHasReadService(id);
        setVisible(false);
        const noti = await getNotiByIdService(id);
        const ACTION_TYPE = noti.action_type;
        const context = noti.context;
        const { lease_id, cancelation_request_id, extra_service_request_id, issue_id, invoice_id } = context;

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
            break;
          case 'INVOICE_CREATION':
            dispatch(
              openInvoiceDetailModal({
                actionType: ACTION_TYPE,
                invoiceId: invoice_id,
              }),
            );
            dispatch(setInvoiceLoading({ loading: true }));
            break;
          default:
            break;
        }
        navigate('/management');
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    } finally {
      console.error('Done handling notification click:');
    }
  };

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
  }, [data, isLoading, notificationShown]);

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

  const menu = () => {
    return (
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
  };
  return (
    <>
      {' '}
      {contextHolder}
      <Dropdown
        placement="bottomRight"
        overlay={menu}
        trigger={['click']}
        open={visible}
        onOpenChange={handleVisibleChange}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Badge count={unreadCount}>
            <BellOutlined style={{ fontSize: '27px' }} />
          </Badge>
        </div>
      </Dropdown>
    </>
  );
};

export default UserNotification;
