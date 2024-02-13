import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getHousesService = ({ offset, limit }) => {
  return apiCaller.post(ENDPOINTS.houses.houses, {
    offset,
    limit,
  });
};

export const getHouseById = ({ house_id }) => {
  return apiCaller.get(`${ENDPOINTS.houses.base}/${house_id}`);
};

export const getHouseReview = ({ house_id }) => {
  return apiCaller.get(`${ENDPOINTS.houses.reviews.replace('{house_id}', house_id)}`);
};
