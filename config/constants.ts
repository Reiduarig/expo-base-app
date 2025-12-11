/**
 * Constantes de la aplicación
 */

export const APP_CONFIG = {
  // Información de la aplicación
  APP_NAME: 'Expo Base App',
  APP_VERSION: '1.0.0',
  
  // Configuración de autenticación
  AUTH: {
    TOKEN_KEY: 'auth_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
    USER_KEY: 'auth_user',
    TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutos antes de expirar
  },
  
  // Configuración de caché
  CACHE: {
    USER_PROFILE: 5 * 60 * 1000, // 5 minutos
    APP_DATA: 15 * 60 * 1000, // 15 minutos
  },
  
  // Límites de validación
  VALIDATION: {
    EMAIL_MAX_LENGTH: 254,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
  },
  
  // Configuración de red
  NETWORK: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 segundo
    REQUEST_TIMEOUT: 30000, // 30 segundos
  },
  
  // Mensajes de error
  ERRORS: {
    NETWORK_ERROR: 'Sin conexión a internet. Verifica tu conexión.',
    TIMEOUT: 'La petición ha tardado demasiado. Intenta nuevamente.',
    UNAUTHORIZED: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
    FORBIDDEN: 'No tienes permisos para realizar esta acción.',
    NOT_FOUND: 'Recurso no encontrado.',
    SERVER_ERROR: 'Error en el servidor. Intenta más tarde.',
    INVALID_CREDENTIALS: 'Email o contraseña incorrectos.',
    EMAIL_EXISTS: 'Este email ya está registrado.',
    GENERIC: 'Ha ocurrido un error. Intenta nuevamente.',
  },
} as const;

// Tipos para TypeScript
export type ErrorCode = keyof typeof APP_CONFIG.ERRORS;
