/**
 * Cliente HTTP centralizado para todas las peticiones a la API
 */

import { APP_CONFIG } from '@/config/constants';
import { ENV } from '@/config/env';
import { ApiError, ApiResponse } from '@/types/api.types';
import { logger } from '@/utils/logger';
import * as SecureStore from 'expo-secure-store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor() {
    this.baseURL = ENV.API_URL;
    this.defaultTimeout = ENV.API_TIMEOUT;
  }

  /**
   * Obtener token de autenticación
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(APP_CONFIG.AUTH.TOKEN_KEY);
    } catch (error) {
      logger.error('Error al obtener token:', error);
      return null;
    }
  }

  /**
   * Construir headers de la petición
   */
  private async buildHeaders(config?: RequestConfig): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config?.headers,
    };

    // Agregar token si se requiere autenticación
    if (config?.requiresAuth !== false) {
      const token = await this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Manejar timeout de peticiones
   */
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(APP_CONFIG.ERRORS.TIMEOUT));
      }, timeout);
    });
  }

  /**
   * Parsear respuesta
   */
  private async parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return await response.json();
    }
    
    const text = await response.text();
    return {
      success: response.ok,
      data: text as any,
    };
  }

  /**
   * Manejar errores de la API
   */
  private handleError(error: any, url: string): never {
    logger.error(`API Error en ${url}:`, error);

    if (error.message === APP_CONFIG.ERRORS.TIMEOUT) {
      throw {
        message: APP_CONFIG.ERRORS.TIMEOUT,
        code: 'TIMEOUT',
      } as ApiError;
    }

    if (!error.response) {
      throw {
        message: APP_CONFIG.ERRORS.NETWORK_ERROR,
        code: 'NETWORK_ERROR',
      } as ApiError;
    }

    const status = error.response?.status || 500;
    
    switch (status) {
      case 401:
        throw {
          message: APP_CONFIG.ERRORS.UNAUTHORIZED,
          code: 'UNAUTHORIZED',
          status,
        } as ApiError;
      case 403:
        throw {
          message: APP_CONFIG.ERRORS.FORBIDDEN,
          code: 'FORBIDDEN',
          status,
        } as ApiError;
      case 404:
        throw {
          message: APP_CONFIG.ERRORS.NOT_FOUND,
          code: 'NOT_FOUND',
          status,
        } as ApiError;
      case 500:
      case 502:
      case 503:
        throw {
          message: APP_CONFIG.ERRORS.SERVER_ERROR,
          code: 'SERVER_ERROR',
          status,
        } as ApiError;
      default:
        throw {
          message: error.message || APP_CONFIG.ERRORS.GENERIC,
          code: 'UNKNOWN',
          status,
        } as ApiError;
    }
  }

  /**
   * Realizar petición HTTP
   */
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const method = config.method || 'GET';
    const timeout = config.timeout || this.defaultTimeout;

    const startTime = Date.now();
    
    try {
      const headers = await this.buildHeaders(config);
      
      const fetchPromise = fetch(url, {
        method,
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      const response = await Promise.race([
        fetchPromise,
        this.createTimeoutPromise(timeout),
      ]);

      const duration = Date.now() - startTime;
      logger.api(method, endpoint, response.status, duration);

      if (!response.ok) {
        const errorData = await this.parseResponse(response);
        throw {
          response: {
            status: response.status,
            data: errorData,
          },
          message: errorData.message || errorData.error || APP_CONFIG.ERRORS.GENERIC,
        };
      }

      const data = await this.parseResponse<T>(response);
      
      // Si la respuesta tiene formato ApiResponse, devolver solo data
      if (data && typeof data === 'object' && 'data' in data) {
        return (data as ApiResponse<T>).data as T;
      }
      
      return data as T;
    } catch (error) {
      return this.handleError(error, endpoint);
    }
  }

  /**
   * Métodos convenientes
   */
  get<T = any>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  put<T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  patch<T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  delete<T = any>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
