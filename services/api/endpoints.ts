/**
 * Definición centralizada de endpoints de la API
 */

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Usuario
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE_ACCOUNT: '/user/account',
    PREFERENCES: '/user/preferences',
  },
  
  // Contenido (ejemplo)
  CONTENT: {
    LIST: '/content',
    DETAIL: (id: string) => `/content/${id}`,
    CREATE: '/content',
    UPDATE: (id: string) => `/content/${id}`,
    DELETE: (id: string) => `/content/${id}`,
  },
} as const;
