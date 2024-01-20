import { ERROR_MAPPER, ERROR_TRANS_KEYS } from '../../constants/error.constant';

export const apiErrorMapper = (errorCode, statusCode) => {
  if (!errorCode || !statusCode) return ERROR_TRANS_KEYS.UNKNOWN;
  const errorMap = ERROR_MAPPER[errorCode];
  if (!errorMap) {
    return ERROR_TRANS_KEYS.UNKNOWN;
  }
  const error = errorMap.find(error => error.statusCode === statusCode);
  if (!error) {
    return ERROR_TRANS_KEYS.UNKNOWN;
  }
  return error.translationKey;
};
