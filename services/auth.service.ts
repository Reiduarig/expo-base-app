/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con autenticación
 */

import { APP_CONFIG } from '@/config/constants';
import {
    LoginRequest,
    LoginResponse,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
} from '@/types/api.types';
import { AuthTokens, User } from '@/types/user.types';
import { logger } from '@/utils/logger';
import * as SecureStore from 'expo-secure-store';

class AuthService {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente y eliminar la simulación
      // const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials, { requiresAuth: false });
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response: LoginResponse = {
        user: {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
        },
        accessToken: `demo_token_${Date.now()}`,
        refreshToken: `demo_refresh_${Date.now()}`,
        expiresIn: 3600, // 1 hora
      };
      // FIN SIMULACIÓN

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + (response.expiresIn * 1000),
      };

      await this.saveTokens(tokens);
      await this.saveUser(response.user);

      logger.info('Login exitoso:', response.user.email);

      return {
        user: response.user,
        tokens,
      };
    } catch (error) {
      logger.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(data: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente y eliminar la simulación
      // const response = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data, { requiresAuth: false });
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response: RegisterResponse = {
        user: {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
        },
        accessToken: `demo_token_${Date.now()}`,
        refreshToken: `demo_refresh_${Date.now()}`,
      };
      // FIN SIMULACIÓN

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + (3600 * 1000), // 1 hora por defecto
      };

      await this.saveTokens(tokens);
      await this.saveUser(response.user);

      logger.info('Registro exitoso:', response.user.email);

      return {
        user: response.user,
        tokens,
      };
    } catch (error) {
      logger.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Renovar token de acceso
   */
  async refreshToken(): Promise<AuthTokens> {
    try {
      const refreshToken = await SecureStore.getItemAsync(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente y eliminar la simulación
      // const response = await apiClient.post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }, { requiresAuth: false });
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 500));
      const response: RefreshTokenResponse = {
        accessToken: `new_token_${Date.now()}`,
        refreshToken: `new_refresh_${Date.now()}`,
        expiresIn: 3600,
      };
      // FIN SIMULACIÓN

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + (response.expiresIn * 1000),
      };

      await this.saveTokens(tokens);

      logger.info('Token renovado exitosamente');

      return tokens;
    } catch (error) {
      logger.error('Error al renovar token:', error);
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      // Intentar llamar al endpoint de logout (opcional)
      try {
        // await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        // Ignorar errores del servidor, siempre limpiar localmente
        logger.warn('Error al notificar logout al servidor:', error);
      }

      await this.clearAuth();
      logger.info('Logout exitoso');
    } catch (error) {
      logger.error('Error en logout:', error);
      throw error;
    }
  }

  /**
   * Guardar tokens de forma segura
   */
  private async saveTokens(tokens: AuthTokens): Promise<void> {
    await SecureStore.setItemAsync(APP_CONFIG.AUTH.TOKEN_KEY, tokens.accessToken);
    await SecureStore.setItemAsync(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY, tokens.refreshToken);
    
    if (tokens.expiresAt) {
      await SecureStore.setItemAsync('token_expires_at', tokens.expiresAt.toString());
    }
  }

  /**
   * Guardar usuario
   */
  private async saveUser(user: User): Promise<void> {
    await SecureStore.setItemAsync(APP_CONFIG.AUTH.USER_KEY, JSON.stringify(user));
  }

  /**
   * Obtener usuario guardado
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await SecureStore.getItemAsync(APP_CONFIG.AUTH.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      logger.error('Error al obtener usuario guardado:', error);
      return null;
    }
  }

  /**
   * Verificar si el token está por expirar
   */
  async isTokenExpiringSoon(): Promise<boolean> {
    try {
      const expiresAtStr = await SecureStore.getItemAsync('token_expires_at');
      if (!expiresAtStr) return false;

      const expiresAt = parseInt(expiresAtStr, 10);
      const timeUntilExpiry = expiresAt - Date.now();

      // Retornar true si expira en menos de 5 minutos
      return timeUntilExpiry < APP_CONFIG.AUTH.TOKEN_EXPIRY_BUFFER;
    } catch (error) {
      logger.error('Error al verificar expiración:', error);
      return false;
    }
  }

  /**
   * Limpiar datos de autenticación
   */
  async clearAuth(): Promise<void> {
    await SecureStore.deleteItemAsync(APP_CONFIG.AUTH.TOKEN_KEY);
    await SecureStore.deleteItemAsync(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(APP_CONFIG.AUTH.USER_KEY);
    await SecureStore.deleteItemAsync('token_expires_at');
  }
}

export const authService = new AuthService();
