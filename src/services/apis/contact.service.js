import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const requestContact = input => {
  console.log('up!', input);
  return apiCaller.post(ENDPOINTS.contactRequest.base, input);
};
