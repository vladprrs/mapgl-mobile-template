import { config } from '@/lib/config/env';

/**
 * Gated debug logger that never logs in production builds
 * Enabled by default in development, configurable via NEXT_PUBLIC_ENABLE_DEBUG_LOGS
 */
export function debugLog(...args: unknown[]): void {
  if (!config.app.debugLoggingEnabled) return;
  console.log(...args);
}

/**
 * Convenience helper specifically for click events to standardize payloads
 */
export function logClickEvent(eventName: string, payload?: unknown): void {
  if (!config.app.debugLoggingEnabled) return;
  if (typeof payload === 'undefined') {
    console.log(`[click] ${eventName}`);
  } else {
    console.log(`[click] ${eventName}:`, payload);
  }
}


