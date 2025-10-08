/**
 * Centralized logging utility
 * Only logs debug messages in development mode
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  debug(...args: any[]) {
    if (this.isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  }

  info(...args: any[]) {
    if (this.isDevelopment) {
      console.info('[INFO]', ...args);
    }
  }

  warn(...args: any[]) {
    console.warn('[WARN]', ...args);
  }

  error(...args: any[]) {
    console.error('[ERROR]', ...args);
  }
}

export const logger = new Logger();
