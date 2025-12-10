import * as SecureStore from 'expo-secure-store';

const AUTH_USER_KEY = 'auth_user';
const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Servicio de autenticación que utiliza expo-secure-store
 * para almacenar datos sensibles de forma segura.
 * 
 * En iOS: Usa Keychain
 * En Android: Usa EncryptedSharedPreferences (API 23+)
 */

export const secureStorage = {
  /**
   * Guarda el token de autenticación de forma segura
   */
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  },

  /**
   * Obtiene el token de autenticación
   */
  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  },

  /**
   * Guarda los datos del usuario de forma segura
   */
  async saveUser(user: any): Promise<void> {
    await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  },

  /**
   * Obtiene los datos del usuario
   */
  async getUser(): Promise<any | null> {
    const userData = await SecureStore.getItemAsync(AUTH_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Elimina todos los datos de autenticación
   */
  async clearAuth(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  },

  /**
   * Verifica si existe una sesión activa
   */
  async hasActiveSession(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};
