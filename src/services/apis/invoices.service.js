import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getInvoicesService = ({ offset, limit, status, type, renter_email }) => {
  return apiCaller.get(
    ENDPOINTS.invoices.base +
      `?type=${type}&limit=${limit}&offset=${offset}` +
      (status !== 'ALL' ? `&status=${status}` : '') +
      (renter_email ? `&renter_email=${renter_email}` : ''),
  );
};

export const getInvoiceByIdService = ({ invoiceId }) => {
  return apiCaller.get(ENDPOINTS.invoices.base + `/${invoiceId}`);
};

export const payInvoiceById = ({ id, gateway_provider, callback_base_url }) => {
  console.log('req pay', id, gateway_provider, callback_base_url);
  return apiCaller.post(ENDPOINTS.invoices.paying(id), { gateway_provider, callback_base_url });
};
