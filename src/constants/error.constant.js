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
  WAIT_FOR_SERVICE_CONFIRMATION: 'api.error.waitForServiceConfirmation',
  EXTRA_SERVICE_NOT_EXIST_OR_NO_PERMISSION: 'api.error.extraServiceNotExistOrNoPermission',
  EXTRA_SERVICE_REQUEST_NOT_EXIST_OR_NO_PERMISSION: 'api.error.extraServiceRequestNotExistOrNoPermission',
  EXTRA_SERVICE_REQUEST_PROGRESS_NOT_EXIST_OR_NO_PERMISSION:
    'api.error.extraServiceRequestProgressNotExistOrNoPermission',
  EXTRA_SERVICE_NOT_RESOLVABLE: 'api.error.extraServiceNotResolvable',
  EXTRA_SERVICE_REQUEST_NOT_RESOLVABLE: 'api.error.extraServiceRequestNotResolvable',
  EXTRA_SERVICE_REQUEST_PROGRESS_NOT_CANCELABLE: 'api.error.extraServiceRequestProgressNotCancelable',
  ISSUE_BEING_PROCESSED: 'api.error.issueBeingProcessed',
  PAYMENT_NOT_EXIST_OR_NO_PERMISSION: 'api.error.paymentNotExistOrNoPermission',
  INVOICE_NOT_EXIST_OR_NO_PERMISSION: 'api.error.invoiceNotExistOrNoPermission',
  INVOICE_NOT_PAYABLE: 'api.error.invoiceNotPayable',
  INVOICE_ITEM_NOT_EXIST: 'api.error.invoiceItemNotExist',
  INVOICE_NOT_ABLE_TO_REPORT_ISSUE: 'api.error.invoiceNotAbleToReportIssue',
  RENTAL_PERIOD_EXCEEDS_LEASE_EXPIRATION: 'api.error.rentalPeriodExceedsLeaseExpiration',
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
  20117: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.RENTAL_PERIOD_EXCEEDS_LEASE_EXPIRATION,
    },
  ],
  30110: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.ISSUE_BEING_PROCESSED,
    },
  ],
  60001: [{ statusCode: 403, translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_NOT_EXIST_OR_NO_PERMISSION }],
  60002: [
    {
      statusCode: 403,
      translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_REQUEST_NOT_EXIST_OR_NO_PERMISSION,
    },
  ],
  60003: [
    {
      statusCode: 403,
      translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_REQUEST_PROGRESS_NOT_EXIST_OR_NO_PERMISSION,
    },
  ],
  60101: [{ statusCode: 400, translationKey: ERROR_TRANS_KEYS.WAIT_FOR_SERVICE_CONFIRMATION }],
  60102: [{ statusCode: 400, translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_NOT_RESOLVABLE }],
  60103: [{ statusCode: 400, translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_REQUEST_NOT_RESOLVABLE }],
  60104: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.EXTRA_SERVICE_REQUEST_PROGRESS_NOT_CANCELABLE,
    },
  ],
  70001: [
    {
      statusCode: 403,
      translationKey: ERROR_TRANS_KEYS.PAYMENT_NOT_EXIST_OR_NO_PERMISSION,
    },
  ],
  70002: [
    {
      statusCode: 403,
      translationKey: ERROR_TRANS_KEYS.INVOICE_NOT_EXIST_OR_NO_PERMISSION,
    },
  ],
  70101: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.INVOICE_NOT_PAYABLE,
    },
  ],
  70102: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.INVOICE_ITEM_NOT_EXIST,
    },
  ],
  70103: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.INVOICE_NOT_ABLE_TO_REPORT_ISSUE,
    },
  ],
  70104: [
    {
      statusCode: 400,
      translationKey: ERROR_TRANS_KEYS.ISSUE_BEING_PROCESSED,
    },
  ],
};
