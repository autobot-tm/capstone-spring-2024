export const formatCustomCurrency = number => {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
