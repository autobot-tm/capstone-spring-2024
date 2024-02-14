export const ENDPOINTS = {
  auth: {
    base: '/auth',
    tokens: '/auth/tokens',
    users: '/auth/users',
    activate: '/auth/users/activate',
    requestActivate: '/auth/users/activate/request',
    resetPassword: '/auth/users/reset-password',
    requestResetPassword: '/auth/users/reset-password/request',
    google: '/auth/tokens/google',
    presignedURL: '/auth/presigned-urls/post',
  },
  houses: {
    houses: '/houses/filter',
    reviews: '/houses/{house_id}/reviews',
    metadata: '/houses/metadata',
  },
  payments: {
    demo: '/payments/demo-checkout-url',
  },
};
