import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getDemoCheckoutURL = async house_id => {
  return apiCaller.post(ENDPOINTS.payments.demo, { house_id });
};

export const requestReserveHouse = async ({
  house_id,
  pricing_policy_id,
  total_months,
  expected_move_in_date,
  gateway_provider,
  callback_base_url,
}) => {
  return apiCaller.post(ENDPOINTS.payments.reserve(house_id), {
    pricing_policy_id,
    total_months,
    expected_move_in_date,
    gateway_provider,
    callback_base_url,
  });
};

export const getReservationIdByHouseIdService = async ({ house_id, status }) => {
  return apiCaller.get(ENDPOINTS.payments.reservationId + `?house_id=${house_id}&status=${status}`);
};

export const getReservationById = async reservation_id => {
  return apiCaller.get(ENDPOINTS.payments.reservation(reservation_id));
};

export const getPaymentsService = ({ offset, limit }) => {
  return apiCaller.get(ENDPOINTS.payments.base + `?offset=${offset}&limit=${limit}`);
};
