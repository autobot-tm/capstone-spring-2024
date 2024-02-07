import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getDemoCheckoutURL = async house_id => {
  return apiCaller.post(ENDPOINTS.payments.demo, { house_id });
};
