import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getLeasesService = ({ offset, limit, status }) => {
  return apiCaller.get(
    ENDPOINTS.contracts.base +
      `?limit=${limit}&offset=${offset}${status !== 'ALL' ? '&status=' + status : ''} `,
  );
};

export const getLeaseByIdService = ({ leaseId }) => {
  return apiCaller.get(ENDPOINTS.contracts.base + `/${leaseId}`);
};

export const requestCancelContractService = ({ leaseId, type, title, reason }) => {
  return apiCaller.post(ENDPOINTS.contracts.base + `/${leaseId}` + '/lease-cancelation-requests', {
    type,
    title,
    reason,
  });
};
