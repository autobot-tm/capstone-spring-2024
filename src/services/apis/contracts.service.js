import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getLeasesService = ({ renter_email, offset, limit, status }) => {
  return apiCaller.get(
    ENDPOINTS.contracts.base +
      `?renter_email=${renter_email}&limit=${limit}&offset=${offset}${
        status !== 'ALL' ? '&status=' + status : ''
      }`,
  );
};

export const getLeaseByIdService = ({ leaseId }) => {
  return apiCaller.get(ENDPOINTS.contracts.base + `/${leaseId}`);
};

export const requestCancelContractService = ({ lease_id, type, title, reason }) => {
  return apiCaller.post(ENDPOINTS.contracts.base + `/${lease_id}` + '/lease-cancelation-requests', {
    type,
    title,
    reason,
  });
};
