/**
 * Configuración de variables de entorno
 * Las variables se cargan desde .env (local) o desde el entorno de ejecución
 */

import Constants from 'expo-constants';

interface EnvConfig {
  API_URL: string;
  API_TIMEOUT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  IS_DEV: boolean;
  IS_PROD: boolean;
}

// Obtener variables de entorno desde expo-constants
const expoConfig = Constants.expoConfig;
const extra = expoConfig?.extra || {};

/**
 * Configuración de la aplicación
 * Valores por defecto para desarrollo
 */
export const ENV: EnvConfig = {
  API_URL: extra.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  API_TIMEOUT: parseInt(extra.apiTimeout || process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),
  NODE_ENV: (extra.nodeEnv || process.env.NODE_ENV || 'development') as EnvConfig['NODE_ENV'],
  IS_DEV: (extra.nodeEnv || process.env.NODE_ENV) !== 'production',
  IS_PROD: (extra.nodeEnv || process.env.NODE_ENV) === 'production',
};

/**
 * Validar que las variables críticas estén configuradas
 */
export function validateEnv(): void {
  const requiredVars: (keyof EnvConfig)[] = ['API_URL'];
  
  for (const varName of requiredVars) {
    if (!ENV[varName]) {
      throw new Error(`Variable de entorno requerida no configurada: ${varName}`);
    }
  }
}

// Validar en desarrollo
if (ENV.IS_DEV) {
  try {
    validateEnv();
  } catch (error) {
    console.warn('⚠️ Advertencia de configuración:', error);
  }
}
