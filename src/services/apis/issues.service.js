import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';

export const getIssuesService = ({ offset, limit, status, category }) => {
  return apiCaller.get(
    ENDPOINTS.issues.base +
      `?limit=${limit}&offset=${offset}${status !== 'ALL' ? '&status=' + status : ''}${
        category !== 'ALL' ? '&category=' + category : ''
      } `,
  );
};

export const getIssueByIdService = ({ issueId }) => {
  return apiCaller.get(ENDPOINTS.issues.base + `/${issueId}`);
};
