export const ERROR_TRANS_KEYS = {
  VALIDATION_FAIL: 'api.error.validationFail',
  EMAIL_ALREADY_EXISTS: 'api.error.emailAlreadyExists',
  INVALID_ACCOUNT_CREDENTIALS: 'api.error.invalidAccountCredentials',
  INVALID_REFRESH_TOKEN: 'api.error.invalidRefreshToken',
  INVALID_JWT_TOKEN: 'api.error.invalidJwtToken',
  UNKNOWN: 'api.error.unknown',
  RESET_PASSWORD_ONLY_FOR_NORMAL_ACCOUNT: 'api.error.resetPasswordOnlyForNormalAccount',
  USER_ALREADY_ACTIVATED: 'api.error.userAlreadyActivated',
  INVALID_OTP_CODE: 'api.error.invalidOtpCode',
  ACCOUNT_SUSPENDED: 'api.error.accountSuspended',
};
export const ERROR_MAPPER = {
  40000: [
    {
      statusCode: 422,
      translationKey: ERROR_TRANS_KEYS.VALIDATION_FAIL,
    },
  ],
  10001: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.EMAIL_ALREADY_EXISTS,
    },
    {
      statusCode: 401,
      translationKey: ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS,
    },
  ],
  10101: [
    {
      statusCode: 401,
      translationKey: ERROR_TRANS_KEYS.INVALID_ACCOUNT_CREDENTIALS,
    },
  ],
  10102: [
    { statusCode: 401, translationKey: ERROR_TRANS_KEYS.INVALID_REFRESH_TOKEN },
    { statusCode: 400, translationKey: ERROR_TRANS_KEYS.USER_ALREADY_ACTIVATED },
  ],
  10003: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.RESET_PASSWORD_ONLY_FOR_NORMAL_ACCOUNT,
    },
  ],
  10104: [{ statusCode: 401, translationKey: ERROR_TRANS_KEYS.INVALID_JWT_TOKEN }],
  10004: [{ statusCode: 400, translationKey: ERROR_TRANS_KEYS.INVALID_OTP_CODE }],
  10011: [{ statusCode: 400, translationKey: ERROR_TRANS_KEYS.ACCOUNT_SUSPENDED }],
};
