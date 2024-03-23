import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getLeaseByIdService = id => {
  return apiCaller.get(ENDPOINTS.leases.leaseId(id));
};
