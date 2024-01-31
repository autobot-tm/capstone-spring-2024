import { apiCaller } from '../../axios';
import { ENDPOINTS } from './api-endpoints.service';
/**
 * Sign in service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const signInService = ({ email, password }) => {
  return apiCaller.post(ENDPOINTS.auth.tokens, { email, password });
};

/**
 * Sign up service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const signUpService = ({ email, password }) => {
  return apiCaller.post(ENDPOINTS.auth.users, { email, password });
};

/**
 * Refresh token service.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise} - The promise of the API call.
 */
export const refreshTokenService = refreshToken => {
  return apiCaller.put(ENDPOINTS.auth.tokens, { refresh_token: refreshToken });
};

/**
 * Sign out service.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise} - The promise of the API call.
 */
export const signOutService = refreshToken => {
  return apiCaller.delete(ENDPOINTS.auth.tokens, { data: { refresh_token: refreshToken } });
};

/**
 * Activate account service.
 * @param {Object} input - The input object.
 * @param {string} input.token - The token.
 * @returns {Promise} - The promise of the API call.
 */
export const activateAccountService = ({ email, otp_code }) => {
  return apiCaller.post(ENDPOINTS.auth.activate, { email, otp_code });
};

/**
 * Request activate account service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @returns {Promise} - The promise of the API call.
 */
export const requestActivateAccountService = ({ email }) => {
  return apiCaller.post(ENDPOINTS.auth.requestActivate, { email });
};

/**
 * Reset password service.
 * @param {Object} input - The input object.
 * @param {string} input.token - The token.
 * @param {string} input.password - The new password.
 * @returns {Promise} - The promise of the API call.
 */
export const resetPasswordService = ({ email, otp_code, new_password }) => {
  return apiCaller.post(ENDPOINTS.auth.resetPassword, { email, otp_code, new_password });
};

/**
 * Request reset password service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @returns {Promise} - The promise of the API call.
 */
export const requestResetPasswordService = ({ email }) => {
  return apiCaller.post(ENDPOINTS.auth.requestResetPassword, { email });
};

export const signInWithGoogleService = async ({ id_token }) => {
  return apiCaller.post(ENDPOINTS.auth.google, { id_token });
};

export const getPresignedURL = async input => {
  return apiCaller.post(ENDPOINTS.auth.presignedURL, input);
};
