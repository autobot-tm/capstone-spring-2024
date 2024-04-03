import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const requestIssues = input => {
  console.log('up!', input);
  return apiCaller.post(ENDPOINTS.contactRequest.issues, input);
};

export const requestContact = input => {
  console.log('up!', input);
  return apiCaller.post(ENDPOINTS.contactRequest.base, input);
};
