import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getReservationsService = ({ offset, limit, status, name }) => {
  return apiCaller.get(
    ENDPOINTS.reservations.base +
      `?house_name=${name}&limit=${limit}&offset=${offset}${status !== 'ALL' ? '&status=' + status : ''} `,
  );
};

export const getReservationByIdService = ({ reservationId }) => {
  return apiCaller.get(ENDPOINTS.reservations.base + `/${reservationId}`);
};
