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

export const getIssueByIdInvoiceService = ({ invoice_id, status = '' }) => {
  return apiCaller.get(ENDPOINTS.contactRequest.issues + `?invoice_id=${invoice_id}&status=${status}`);
};

export const getIssueByIdLeaseService = ({ lease_id, status = '' }) => {
  return apiCaller.get(ENDPOINTS.contactRequest.issues + `?lease_id=${lease_id}&status=${status}`);
};
