import { apiCaller } from '../axios';
import { apiEndPoints } from './api-endpoints.service';

export const authServices = {
  signIn: ({ username, password }) => {
    return apiCaller.post(apiEndPoints.auth.signIn, {
      username,
      password,
    });
  },
};
