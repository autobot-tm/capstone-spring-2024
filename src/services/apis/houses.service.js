import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getHousesService = ({ offset, limit }) => {
  return apiCaller.post(ENDPOINTS.houses.houses, {
    offset,
    limit,
  });
};
