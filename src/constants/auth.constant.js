export const DEFAULT_ROLE = 'RENTER';

export const PASSWORD_REGEX = {
  LOWERCASE: /^(?=.*[a-z])/,
  UPPERCASE: /^(?=.*[A-Z])/,
  NUMBER: /^(?=.*[0-9])/,
  SPECIAL_CHARACTER: /^(?=.*[!@#$%^&*])/,
  MIN_LENGTH: /^(?=.{8,})/,
};

export const PHONE_NUMBER = {
  VALID_LENGTH: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
};
