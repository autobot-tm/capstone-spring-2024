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
    base: '/houses',
    houses: '/houses/filter',
    reviews: house_id => `/houses/${house_id}/reviews`,
    metadata: '/houses/metadata',
  },
  payments: {
    demo: '/payments/demo-checkout-url',
    //other folder
    reservation: reservation_id => `/reservations/${reservation_id}`,
    reservationId: '/reservations',
    reserve: house_id => `/houses/${house_id}/reserve`,
  },
  reservations: {
    base: '/reservations',
  },
  contracts: {
    base: '/leases',
  },
  users: {
    base: '/users',
    user: user_id => `/users/${user_id}`,
    updateUpdate: '/users/me',
  },
};
