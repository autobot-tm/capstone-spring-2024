import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getUserByIdService = async id => {
  return apiCaller.get(ENDPOINTS.users.user(id));
};

export const updateUserCurrentService = async input => {
  return await apiCaller.patch(ENDPOINTS.users.updateUpdate, input);
};
