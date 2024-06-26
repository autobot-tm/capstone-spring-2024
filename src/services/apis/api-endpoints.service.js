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
    getPresignedURL: '/auth/presigned-urls/get',
  },
  houses: {
    base: '/houses',
    houses: '/houses/filter',
    reviews: house_id => `/houses/${house_id}/reviews`,
    updateReview: house_id => `/houses/${house_id}/reviews/me`,
    metadata: '/houses/metadata',
    wishlist: '/wishlist/me',
  },
  payments: {
    base: '/payments',
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
  notification: {
    me: '/notifications/me',
    realTime: '/notifications/me/realtime',
    notificationId: notification_id => `/notifications/${notification_id}`,
  },
  leases: {
    leaseId: lease_id => `/leases/${lease_id}`,
  },
  services: {
    base: '/extra-services',
    request: '/extra-service-requests',
    requestId: extra_service_requests_id => `/extra-service-requests/${extra_service_requests_id}`,
    cancel: extra_service_requests_id => `/extra-service-requests/${extra_service_requests_id}/cancel`,
  },
  invoices: {
    base: '/invoices',
    paying: id => `/invoices/${id}/pay`,
  },
  contactRequest: {
    base: '/contact-requests',
    requestId: id => `/contact-requests/${id}`,
    cancel: id => `/contact-requests/${id}/resolve`,
    issues: '/issues',
  },
  issues: {
    base: '/issues',
  },
};
