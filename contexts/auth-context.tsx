import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'auth_user';
const AUTH_TOKEN_KEY = 'auth_token';

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
      const storedUser = await SecureStore.getItemAsync(AUTH_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      
      // Simulación de llamada API - Reemplazar con tu API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Las validaciones ya se hicieron en el formulario
      // Aquí solo validaciones críticas de seguridad
      if (!email || !password) {
        throw new Error('Credenciales incompletas');
      }

      // Usuario de ejemplo - Reemplazar con respuesta de API
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      // Guardar token y usuario de forma segura
      const token = 'demo_token_' + Date.now(); // Reemplazar con token real de API
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsProcessing(true);
      
      // Simulación de llamada API - Reemplazar con tu API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Las validaciones ya se hicieron en el formulario
      // Aquí solo validaciones críticas de seguridad
      if (!email || !password || !name) {
        throw new Error('Datos incompletos');
      }

      // Usuario de ejemplo - Reemplazar con respuesta de API
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
      };

      // Guardar token y usuario de forma segura
      const token = 'demo_token_' + Date.now(); // Reemplazar con token real de API
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_USER_KEY);
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
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
