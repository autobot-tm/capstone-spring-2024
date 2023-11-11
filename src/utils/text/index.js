export const truncate = (text, length) => {
  console.log('🚀 ~ file: index.js:2 ~ truncate ~ text, length:', text, length);
  if (text?.length <= length) return text;

  return text.substring(0, length) + '...';
};
