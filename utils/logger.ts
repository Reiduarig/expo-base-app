/**
 * Sistema de logging seguro
 * En producción, los logs se deshabilitan o se envían a un servicio de logging
 */

import { ENV } from '@/config/env';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = ENV.IS_DEV;
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.isEnabled) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'error':
        console.error(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'info':
        console.info(prefix, message, ...args);
        break;
      case 'debug':
        console.debug(prefix, message, ...args);
        break;
      default:
        console.log(prefix, message, ...args);
    }
  }

  log(message: string, ...args: any[]): void {
    this.formatMessage('log', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.formatMessage('info', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.formatMessage('warn', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.formatMessage('error', message, ...args);
    
    // Aquí podrías enviar a un servicio como Sentry en producción
    if (ENV.IS_PROD) {
      // Sentry.captureException(new Error(message));
    }
  }

  debug(message: string, ...args: any[]): void {
    this.formatMessage('debug', message, ...args);
  }

  // Método para logging de API requests
  api(method: string, url: string, status?: number, duration?: number): void {
    if (!this.isEnabled) return;
    
    const statusEmoji = status && status >= 200 && status < 300 ? '✅' : '❌';
    const durationText = duration ? `${duration}ms` : '';
    
    this.info(`${statusEmoji} API ${method.toUpperCase()} ${url}`, {
      status,
      duration: durationText,
    });
  }
}

export const logger = new Logger();
