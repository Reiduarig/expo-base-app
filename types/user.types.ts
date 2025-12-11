/**
 * Tipos relacionados con usuarios
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProcessing: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number; // Timestamp de expiración
}
