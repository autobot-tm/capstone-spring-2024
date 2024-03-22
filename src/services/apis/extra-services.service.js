import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getExtraServices = () => {
  return apiCaller.get(ENDPOINTS.services.base);
};

export const requestExtraServices = input => {
  return apiCaller.post(ENDPOINTS.services.request, input);
};
