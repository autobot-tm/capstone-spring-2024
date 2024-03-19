import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getNotiUserCurrentService = () => {
  return apiCaller.get(ENDPOINTS.notification.me);
};
