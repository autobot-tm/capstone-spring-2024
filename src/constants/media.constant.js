export const MediaCategories = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  OTHER: 'OTHER',
  ALL: 'ALL',
};
export const AcceptedMediaTypes = {
  [MediaCategories.IMAGE]: ['image/*'],
  [MediaCategories.VIDEO]: ['video/*'],
  [MediaCategories.OTHER]: ['.pdf'],
  [MediaCategories.ALL]: ['*'],
};
