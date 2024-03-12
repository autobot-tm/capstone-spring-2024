import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getUserByIdService = async ({ user_id }) => {
  return apiCaller.get(ENDPOINTS.users.user(user_id));
};

export const updateUserCurrentService = async input => {
  return await apiCaller.patch(ENDPOINTS.users.updateUpdate, input);
};
