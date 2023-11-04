import { storageKeys } from "../../config";

const saveTokens = (tokens) => {
  const tokensJson = JSON.stringify(tokens);
  localStorage.setItem(storageKeys.token, tokensJson);
};
const getTokens = () => {
  const tokensJson = localStorage.getItem(storageKeys.token);
  if (tokensJson) {
    const tokens = JSON.parse(tokensJson);
    return tokens;
  }
  return null;
};
const deleteTokens = () => {
  const tokensJson = localStorage.getItem(storageKeys.token);
  if (tokensJson) {
    localStorage.removeItem(storageKeys.token);
  }
};
export const authTokensLocalStorageUtils = {
  save: saveTokens,
  get: getTokens,
  delete: deleteTokens,
};
