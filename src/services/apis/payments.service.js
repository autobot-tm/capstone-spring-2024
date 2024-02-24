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
}) => {
  return apiCaller.post(ENDPOINTS.payments.reserve(house_id), {
    pricing_policy_id,
    total_months,
    expected_move_in_date,
    gateway_provider,
  });
};
