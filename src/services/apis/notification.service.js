import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getNotiUserCurrentService = () => {
  return apiCaller.get(ENDPOINTS.notification.me);
};

export const getNotiRealTimeUserCurrentService = () => {
  return apiCaller.get(ENDPOINTS.notification.realTime);
};

export const getNotiByIdService = id => {
  return apiCaller.get(ENDPOINTS.notification.notificationId(id));
};

export const updateNotiHasReadService = id => {
  return apiCaller.patch(ENDPOINTS.notification.notificationId(id), { has_read: true });
};
