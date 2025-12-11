/**
 * Servicio de usuario
 * Maneja operaciones relacionadas con el perfil del usuario
 */

import {
    ChangePasswordRequest,
    UpdateProfileRequest,
    UserProfile,
} from '@/types/api.types';
import { logger } from '@/utils/logger';

class UserService {
  /**
   * Obtener perfil del usuario
   */
  async getProfile(): Promise<UserProfile> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente
      // return await apiClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: '1',
        email: 'user@example.com',
        name: 'Usuario Demo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // FIN SIMULACIÓN
    } catch (error) {
      logger.error('Error al obtener perfil:', error);
      throw error;
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente
      // return await apiClient.put<UserProfile>(API_ENDPOINTS.USER.UPDATE_PROFILE, data);
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 500));
      logger.info('Perfil actualizado (simulación):', data);
      return {
        id: '1',
        email: 'user@example.com',
        name: data.name || 'Usuario Demo',
        avatar: data.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // FIN SIMULACIÓN
    } catch (error) {
      logger.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente
      // await apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 500));
      logger.info('Contraseña cambiada (simulación)');
      // FIN SIMULACIÓN
    } catch (error) {
      logger.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }

  /**
   * Eliminar cuenta
   */
  async deleteAccount(): Promise<void> {
    try {
      // MODO DESARROLLO: Simulación
      // En producción, descomentar la línea siguiente
      // await apiClient.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT);
      
      // SIMULACIÓN - Eliminar en producción
      await new Promise(resolve => setTimeout(resolve, 500));
      logger.info('Cuenta eliminada (simulación)');
      // FIN SIMULACIÓN
    } catch (error) {
      logger.error('Error al eliminar cuenta:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
