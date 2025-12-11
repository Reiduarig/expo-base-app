import { APP_CONFIG } from '@/config/constants';
import { authService } from '@/services/auth.service';
import { User } from '@/types/user.types';
import { logger } from '@/utils/logger';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProcessing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        
        // Verificar si el token está por expirar y renovarlo
        const isExpiring = await authService.isTokenExpiringSoon();
        if (isExpiring) {
          logger.info('Token próximo a expirar, renovando...');
          try {
            await authService.refreshToken();
            logger.info('Token renovado automáticamente');
          } catch (error) {
            logger.error('Error al renovar token automáticamente:', error);
            // Si falla la renovación, cerrar sesión
            await authService.clearAuth();
            setUser(null);
          }
        }
      }
    } catch (error) {
      logger.error('Error al cargar usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      
      // Validaciones críticas de seguridad
      if (!email || !password) {
        throw new Error(APP_CONFIG.ERRORS.INVALID_CREDENTIALS);
      }

      // Llamar al servicio de autenticación
      const { user } = await authService.login({ email, password });
      setUser(user);
      
      logger.info('Login exitoso desde contexto');
    } catch (error) {
      logger.error('Error en login desde contexto:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsProcessing(true);
      
      // Validaciones críticas de seguridad
      if (!email || !password || !name) {
        throw new Error('Datos incompletos');
      }

      // Llamar al servicio de autenticación
      const { user } = await authService.register({ email, password, name });
      setUser(user);
      
      logger.info('Registro exitoso desde contexto');
    } catch (error) {
      logger.error('Error en registro desde contexto:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      logger.info('Logout exitoso desde contexto');
    } catch (error) {
      logger.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isProcessing,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
