import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getExtraServices = () => {
  return apiCaller.get(ENDPOINTS.services.base);
};

export const getExtraServiceRequests = ({ renter_email = '', limit = 20, offset = 0, status = 'ALL' }) => {
  return apiCaller.get(
    ENDPOINTS.services.request +
      `?renter_email=${renter_email}&limit=${limit}&offset=${offset}${status !== 'ALL' ? '&status=' + status : ''}`,
  );
};

export const requestExtraServices = input => {
  return apiCaller.post(ENDPOINTS.services.request, input);
};

export const requestCancelExtraServices = id => {
  return apiCaller.post(ENDPOINTS.services.cancel(id));
};
